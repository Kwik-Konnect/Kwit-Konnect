import { createServerSupabaseClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerSupabaseClient()
    const { id } = await params
    const { reaction } = await req.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: existingReaction } = await supabase
      .from("post_reactions")
      .select("id")
      .eq("post_id", id)
      .eq("user_id", user.id)
      .eq("reaction", reaction)
      .single()

    if (existingReaction) {
      return NextResponse.json({ error: "Already reacted" }, { status: 400 })
    }

    const { data: newReaction, error } = await supabase
      .from("post_reactions")
      .insert({
        post_id: id,
        user_id: user.id,
        reaction,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(newReaction)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

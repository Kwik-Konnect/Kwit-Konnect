import { createServerSupabaseClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerSupabaseClient()
    const { id } = await params
    const { content } = await req.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        post_id: id,
        author_id: user.id,
        content,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(comment)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

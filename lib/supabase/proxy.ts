import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Just pass through - auth is handled in components
  return NextResponse.next({
    request,
  })
}

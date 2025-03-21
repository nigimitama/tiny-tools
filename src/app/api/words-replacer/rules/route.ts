import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export const runtime = "edge"

const KEY = "words-replacer/rules"

export async function GET() {
  const cookieStore = await cookies()
  const savedRules: string = cookieStore.get(KEY)?.value || "[]"
  return new Response(savedRules)
}

export async function POST(request: NextRequest) {
  const rules = await request.json()
  const cookieStore = await cookies()
  cookieStore.set(KEY, JSON.stringify(rules))
  return new Response(null)
}

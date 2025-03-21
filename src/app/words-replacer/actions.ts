"use server"
import { cookies } from "next/headers"
import { Rule } from "./ClientComponents"

const KEY = "words-replacer/rules"

export async function saveRules(rules: Rule[]) {
  const cookieStore = await cookies()
  console.log({ message: "saved", rules })
  cookieStore.set(KEY, JSON.stringify(rules))
}

export async function loadRules() {
  const cookieStore = await cookies()
  const savedRules: Rule[] = JSON.parse(cookieStore.get(KEY)?.value || "[]")
  console.log({ message: "loaded", savedRules })
  return savedRules
}

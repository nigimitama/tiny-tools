// rulesはlocalStorageに保存しておき、次回アクセス時も同じ設定が使えるようにする
import { Rule } from "./ClientComponents"

const STORAGE_KEY = "words-replacer/rules"

export async function saveRules(rules: Rule[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rules))
  }
  // fetchと同じようにResponseオブジェクトを返す
  return new Response(null, { status: 200 })
}

export async function loadRules() {
  if (typeof window !== "undefined") {
    const savedRules = localStorage.getItem(STORAGE_KEY)
    if (savedRules) {
      return JSON.parse(savedRules) as Rule[]
    }
  }
  return []
}

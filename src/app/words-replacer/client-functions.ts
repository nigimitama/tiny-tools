// rulesはcookieに保存しておき、次回アクセス時も同じ設定が使えるようにする
import { Rule } from "./ClientComponents"

export async function saveRules(rules: Rule[]) {
  const res = await fetch("/api/words-replacer/rules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rules),
  })
  return res
}

export async function loadRules() {
  const res = await fetch("/api/words-replacer/rules", {
    method: "GET",
  })
  return (await res.json()) as Rule[]
}

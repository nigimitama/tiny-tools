"use client"
import { Field, Textarea } from "@fluentui/react-components"
import { diffLines, diffWordsWithSpace } from "diff"
import { useState } from "react"

const InputArea = ({
  newText,
  setNewText,
  oldText,
  setOldText,
}: {
  newText: string
  setNewText: React.Dispatch<React.SetStateAction<string>>
  oldText: string
  setOldText: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div style={{ display: "flex", gap: "1em" }}>
      <div style={{ flex: 1 }}>
        <Field key="oldText" label="Old Text" style={{ margin: "1em" }}>
          <Textarea
            defaultValue={oldText}
            onInput={(event: React.FormEvent<HTMLTextAreaElement>) => {
              const inputText = (event.target as HTMLTextAreaElement).value
              setOldText(inputText)
            }}
            style={{ minHeight: "10em" }}
            resize="vertical"
          />
        </Field>
      </div>
      <div style={{ flex: 1 }}>
        <Field key="newText" label="New Text" style={{ margin: "1em" }}>
          <Textarea
            defaultValue={newText}
            onInput={(event: React.FormEvent<HTMLTextAreaElement>) => {
              const inputText = (event.target as HTMLTextAreaElement).value
              setNewText(inputText)
            }}
            style={{ minHeight: "10em" }}
            resize="vertical"
          />
        </Field>
      </div>
    </div>
  )
}

const OutputArea = ({
  newText,
  oldText,
}: {
  newText: string
  oldText: string
}) => {
  const lineDiffs = diffLines(oldText, newText)

  const renderWordDiff = (oldText: string, newText: string) => {
    const words = diffWordsWithSpace(oldText, newText)
    return {
      old: words
        .filter((w) => !w.added)
        .map((w, i) => (
          <span
            key={`old-${i}`}
            style={{
              backgroundColor: w.removed ? "#d16471" : "transparent",
            }}
          >
            {w.value}
          </span>
        )),
      new: words
        .filter((w) => !w.removed)
        .map((w, i) => (
          <span
            key={`new-${i}`}
            style={{
              backgroundColor: w.added ? "#39994a" : "transparent",
            }}
          >
            {w.value}
          </span>
        )),
    }
  }

  const rows: React.ReactNode[] = []
  let i = 0
  while (i < lineDiffs.length) {
    const current = lineDiffs[i]
    const next = lineDiffs[i + 1]

    if (current?.removed && next?.added) {
      // 削除と追加のセット → 単語単位diff
      // .replace(/\n+$/, ""): 末尾の\nを削除
      const oldLines = current.value.replace(/\n+$/, "").split("\n")
      const newLines = next.value.replace(/\n+$/, "").split("\n")
      const max = Math.max(oldLines.length, newLines.length)

      for (let j = 0; j < max; j++) {
        const oldLine = oldLines[j] || ""
        const newLine = newLines[j] || ""
        const wordDiff = renderWordDiff(oldLine, newLine)

        rows.push(
          <div key={`pair-${i}-${j}`} style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f8514933",
                padding: "0.2em",
                borderRight: "1px solid #ccc",
              }}
            >
              <span style={{ userSelect: "none", color: "#999" }}>-</span>{" "}
              {wordDiff.old}
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#2ea04326",
                padding: "0.2em",
              }}
            >
              <span style={{ userSelect: "none", color: "#999" }}>+</span>{" "}
              {wordDiff.new}
            </div>
          </div>
        )
      }
      i += 2
    } else {
      const lines = current.value.split("\n")

      lines.forEach((line, j) => {
        if (!line) return

        const left = current.removed ? (
          <div
            key={`left-${i}-${j}`}
            style={{ backgroundColor: "#f8514933", padding: "0.2em" }}
          >
            <span style={{ userSelect: "none", color: "#999" }}>-</span> {line}
          </div>
        ) : !current.added ? (
          <div key={`left-${i}-${j}`} style={{ padding: "0.2em" }}>
            <span style={{ userSelect: "none", color: "#999" }}> </span> {line}
          </div>
        ) : (
          <div key={`left-${i}-${j}`} />
        )

        const right = current.added ? (
          <div
            key={`right-${i}-${j}`}
            style={{ backgroundColor: "#2ea04326", padding: "0.2em" }}
          >
            <span style={{ userSelect: "none", color: "#999" }}>+</span> {line}
          </div>
        ) : !current.removed ? (
          <div key={`right-${i}-${j}`} style={{ padding: "0.2em" }}>
            <span style={{ userSelect: "none", color: "#999" }}> </span> {line}
          </div>
        ) : (
          <div key={`right-${i}-${j}`} />
        )

        rows.push(
          <div key={`row-${i}-${j}`} style={{ display: "flex" }}>
            <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>{left}</div>
            <div style={{ flex: 1 }}>{right}</div>
          </div>
        )
      })
      i += 1
    }
  }

  return (
    <>
      <h3>Difference</h3>
      <div
        style={{
          fontFamily: "monospace",
          border: "1px solid #ccc",
          margin: "1em",
          borderRadius: "3px",
        }}
      >
        {rows}
      </div>
    </>
  )
}

export const DiffViewer = () => {
  const text1 = `This is the sample text 1.
It has multiple lines.
This line is the same.`

  const text2 = `This is the sample text 2.
It has several lines.
Some of them will be different.
This line is the same.`

  const [oldText, setOldText] = useState<string>(text1)
  const [newText, setNewText] = useState<string>(text2)

  return (
    <>
      <InputArea
        oldText={oldText}
        setOldText={setOldText}
        newText={newText}
        setNewText={setNewText}
      />
      <OutputArea oldText={oldText} newText={newText} />
    </>
  )
}

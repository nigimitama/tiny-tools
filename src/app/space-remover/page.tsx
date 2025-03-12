"use client"

import { useState } from "react"
import { Field, Textarea } from "@fluentui/react-components"

const removeSpaces = (text: string) => {
  const space =
    /[ \u00a0\u1680\u180e\u2000\u200a\u2028\u2029\u202f\u205f\u3000]/g
  return text.replace(space, "")
}

type InputProps = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

const InputArea = ({ text, setText }: InputProps) => {
  return (
    <Field key="output" label="Input" style={{ margin: "2em" }}>
      <Textarea
        defaultValue={text}
        onInput={(event: React.FormEvent<HTMLTextAreaElement>) => {
          const inputText = (event.target as HTMLTextAreaElement).value
          setText(inputText)
        }}
        style={{ minHeight: "10em" }}
        resize="vertical"
      />
    </Field>
  )
}

type OutputProps = {
  text: string
}

const OutputArea = ({ text }: OutputProps) => {
  return (
    <Field key="output" label="Result" style={{ margin: "2em" }}>
      <Textarea
        value={removeSpaces(text)}
        style={{ minHeight: "10em" }}
        resize="vertical"
      />
    </Field>
  )
}

const SpaceRemover = () => {
  const sampleText = `sample:
  智 に 働 け ば 角 が 立 つ
  情 に 棹 さ せ ば 流 さ れ る
  意地　を通せば　窮屈だ　
  とかくに、　人の世は住みにくい`
  const [text, setText] = useState(sampleText)

  return (
    <>
      <header>
        <h2 style={{ margin: 0 }}>Space Remover</h2>
      </header>
      <main>
        <InputArea text={text} setText={setText} />
        <OutputArea text={text} />
      </main>
    </>
  )
}

export default SpaceRemover

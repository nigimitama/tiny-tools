import Layout from "../components/layout"
import { useEffect, useState } from "react"
import { Button, Checkbox, Field, Input, Textarea } from "@fluentui/react-components"
import { AddRegular, ArrowRightFilled, BinRecycleRegular } from "@fluentui/react-icons"

type InputProps = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

const InputArea = ({ text, setText }: InputProps) => {
  return (
    <Field key="output" label="Input">
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

type Rule = {
  pattern: string
  replaceValue: string
  regex: boolean
}
type ReplaceRulesProps = { rules: Rule[]; setRules: React.Dispatch<React.SetStateAction<Rule[]>> }
const ReplaceRules = ({ rules, setRules }: ReplaceRulesProps) => {
  return (
    <div style={{ margin: "1em 0" }}>
      <span>Replace Rules</span>
      <div style={{ margin: "1em" }}>
        {rules.map((rule, index) => {
          return (
            <div key={index}>
              <span>Rule {index + 1}：</span>
              <Input
                placeholder="pattern"
                value={rule.pattern}
                onInput={(event: React.FormEvent<HTMLInputElement>) => {
                  const inputText = (event.target as HTMLInputElement).value
                  const newRule = { ...rules[index], pattern: inputText }
                  setRules([...rules.slice(0, index), newRule, ...rules.slice(index + 1, rules.length)])
                }}
              />
              <ArrowRightFilled />
              <Input
                placeholder="replace value"
                value={rule.replaceValue}
                onInput={(event: React.FormEvent<HTMLInputElement>) => {
                  const inputText = (event.target as HTMLInputElement).value
                  const newRule = { ...rules[index], replaceValue: inputText }
                  setRules([...rules.slice(0, index), newRule, ...rules.slice(index + 1, rules.length)])
                }}
              />
              <Checkbox
                label={"regex"}
                checked={rule.regex}
                onChange={() => {
                  const newRule = { ...rules[index], regex: !rule.regex }
                  setRules([...rules.slice(0, index), newRule, ...rules.slice(index + 1, rules.length)])
                }}
              />
              <Button
                appearance="subtle"
                icon={<BinRecycleRegular />}
                onClick={() => {
                  setRules([...rules.slice(0, index), ...rules.slice(index + 1, rules.length)])
                }}
              />
            </div>
          )
        })}
      </div>
      <Button
        icon={<AddRegular />}
        onClick={() => {
          setRules([...rules, { pattern: "", replaceValue: "", regex: false }])
        }}
      >
        Add a Rule
      </Button>
    </div>
  )
}

type OutputProps = {
  text: string
  rules: Rule[]
}

const OutputArea = ({ text, rules }: OutputProps) => {
  const format = (text: string) => {
    let newText = text
    rules.forEach((rule) => {
      if (rule.regex) {
        const regex = new RegExp(rule.pattern, "g")
        newText = newText.replace(regex, rule.replaceValue)
      } else {
        // TSにreplaceAllがまだ実装されていないのでsplitしてjoinする
        newText = newText.split(rule.pattern).join(rule.replaceValue)
      }
    })
    return newText
  }
  return (
    <Field key="output" label="Result">
      <Textarea value={format(text)} style={{ minHeight: "10em" }} resize="vertical" />
    </Field>
  )
}

export const WordsReplacer = () => {
  const sampleText = `This is a sample text.
$$
x = \\left( x_1, x_2 \\right)
$$
`
  const sampleRules = [
    { pattern: "a", replaceValue: "AAA", regex: false },
    { pattern: "\\left", replaceValue: "", regex: false },
    { pattern: "\\right", replaceValue: "", regex: false },
  ]
  const [text, setText] = useState<string>(sampleText)
  const [rules, setRules] = useState<Rule[]>(sampleRules)

  return (
    <Layout>
      <>
        <header>
          <h2 style={{ margin: 0 }}>Words Replacer</h2>
        </header>
        <main style={{ margin: "2em" }}>
          <InputArea text={text} setText={setText} />
          <ReplaceRules rules={rules} setRules={setRules} />
          <OutputArea text={text} rules={rules} />
        </main>
      </>
    </Layout>
  )
}

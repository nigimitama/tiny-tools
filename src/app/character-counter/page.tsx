"use client"

import { useState } from "react"
import {
  Field,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components"

const useStyles = makeStyles({
  codeFont: {
    fontFamily: `'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace`,
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: tokens.spacingVerticalM,
    margin: "2em",
  },
  statCard: {
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    textAlign: "center",
  },
  statNumber: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    display: "block",
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
  },
  detailsContainer: {
    margin: "2em",
    padding: "1em",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: tokens.fontSizeBase200,
  },
})

const CharacterCounter = () => {
  const styles = useStyles()
  const [input, setInput] = useState("")

  const getStats = (text: string) => {
    // 基本統計
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text.split(/\r\n|\r|\n/).length
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0
    
    // バイト数計算
    const bytesUTF8 = new TextEncoder().encode(text).length
    const bytesUTF16 = text.length * 2
    
    // 文字種別カウント
    const letters = (text.match(/[a-zA-Z]/g) || []).length
    const digits = (text.match(/\d/g) || []).length
    const punctuation = (text.match(/[.,;:!?'"()-]/g) || []).length
    const spaces = (text.match(/\s/g) || []).length
    const uppercase = (text.match(/[A-Z]/g) || []).length
    const lowercase = (text.match(/[a-z]/g) || []).length
    
    // 日本語文字
    const hiragana = (text.match(/[\u3040-\u309F]/g) || []).length
    const katakana = (text.match(/[\u30A0-\u30FF]/g) || []).length
    const kanji = (text.match(/[\u4E00-\u9FAF]/g) || []).length
    
    // 特殊文字
    const symbols = (text.match(/[^\w\s]/g) || []).length
    const emojis = (text.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length
    
    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
      bytesUTF8,
      bytesUTF16,
      letters,
      digits,
      punctuation,
      spaces,
      uppercase,
      lowercase,
      hiragana,
      katakana,
      kanji,
      symbols,
      emojis,
    }
  }

  const stats = getStats(input)

  return (
    <>
      <h2 style={{ margin: 0 }}>Character Counter</h2>
      
      <Field label="Input Text" style={{ margin: "2em" }}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to analyze character count and statistics"
          style={{ minHeight: "12em" }}
          className={styles.codeFont}
          resize="vertical"
        />
      </Field>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.characters.toLocaleString()}</span>
          <div className={styles.statLabel}>Characters</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.charactersNoSpaces.toLocaleString()}</span>
          <div className={styles.statLabel}>Characters (no spaces)</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.words.toLocaleString()}</span>
          <div className={styles.statLabel}>Words</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.lines.toLocaleString()}</span>
          <div className={styles.statLabel}>Lines</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.paragraphs.toLocaleString()}</span>
          <div className={styles.statLabel}>Paragraphs</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.bytesUTF8.toLocaleString()}</span>
          <div className={styles.statLabel}>Bytes (UTF-8)</div>
        </div>
      </div>

      {input && (
        <div className={styles.detailsContainer}>
          <h3>Detailed Statistics</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span>Letters:</span>
              <span>{stats.letters.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Digits:</span>
              <span>{stats.digits.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Spaces:</span>
              <span>{stats.spaces.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Punctuation:</span>
              <span>{stats.punctuation.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Uppercase:</span>
              <span>{stats.uppercase.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Lowercase:</span>
              <span>{stats.lowercase.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Hiragana:</span>
              <span>{stats.hiragana.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Katakana:</span>
              <span>{stats.katakana.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Kanji:</span>
              <span>{stats.kanji.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Symbols:</span>
              <span>{stats.symbols.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Emojis:</span>
              <span>{stats.emojis.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span>Bytes (UTF-16):</span>
              <span>{stats.bytesUTF16.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ margin: "2em", padding: "1em", backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
        <h3>About Character Counting</h3>
        <p>This tool provides comprehensive text analysis including:</p>
        <ul>
          <li><strong>Characters:</strong> Total character count including spaces</li>
          <li><strong>Words:</strong> Count of words separated by whitespace</li>
          <li><strong>Lines:</strong> Count of line breaks</li>
          <li><strong>Bytes:</strong> Storage size in UTF-8 and UTF-16 encoding</li>
          <li><strong>Character Types:</strong> Letters, digits, punctuation, and special characters</li>
          <li><strong>Japanese Support:</strong> Hiragana, Katakana, and Kanji counting</li>
        </ul>
      </div>
    </>
  )
}

export default CharacterCounter
"use client"

import {
  makeStyles,
  typographyStyles,
  tokens,
} from "@fluentui/react-components"
import Link from "next/link"

const useStyles = makeStyles({
  title: typographyStyles.title2,
  text: typographyStyles.body1,
})

const Title = () => {
  const styles = useStyles()
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.title}>Tiny Tools</div>
      <p className={styles.text}>Small applications that might help you</p>
    </div>
  )
}

const Index = () => {
  const sectionStyles = {
    margin: "40px",
  }
  const linkStyles = {
    color: tokens.colorBrandForegroundLink,
  }
  return (
    <>
      <section style={sectionStyles}>
        <h3>Encoding / Transforming</h3>
        <div>
          <Link href="/base64-image-encoder" style={linkStyles}>
            Base64 Image Encoder
          </Link>
        </div>
        <div>
          <Link href="/amazon-url-shortener" style={linkStyles}>
            Amazon URL Shortener
          </Link>
        </div>
        <div>
          <Link href="/space-remover" style={linkStyles}>
            Space Remover
          </Link>
        </div>
        <div>
          <Link href="/words-replacer" style={linkStyles}>
            Words Replacer
          </Link>
        </div>
      </section>

      <section style={sectionStyles}>
        <h3>PDF</h3>
        <div>
          <Link href="/images-to-pdf" style={linkStyles}>
            Images to PDF
          </Link>
        </div>
      </section>
    </>
  )
}

const Root = () => {
  return (
    <>
      <Title />
      <Index />
    </>
  )
}

export default Root

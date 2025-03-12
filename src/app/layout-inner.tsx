"use client"
// layout.tsxのmetadataはuse clientと共存できないのでファイルを分けている

import { FluentProvider, webDarkTheme } from "@fluentui/react-components"
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components"
import { mediaQuery, useMediaQuery } from "./media-query"
import {
  CodeTextEditFilled,
  DocumentPdfRegular,
  ImageBorderRegular,
} from "@fluentui/react-icons"
import Link from "next/link"

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground,
  },
  horizontalMenu: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    // overflowX: "scroll",
  },
  verticalMenu: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    minHeight: "100vh",
    minWidth: "300px",
    paddingTop: "1em",
    // overflowY: "scroll",
  },
  a: {
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
  },
  fullHeight: {
    minHeight: "100vh",
  },
})

const Header = () => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.a}>
        <h2 style={{ padding: "14px", margin: "0px" }}>Tiny Tools</h2>
      </Link>
    </header>
  )
}

type RouteSetting = {
  title: string
  path: string
  icon: JSX.Element | undefined
}

const routeSettings: RouteSetting[] = [
  {
    title: "Base64 Imabe Encoder",
    path: "/base64-image-encoder",
    icon: <ImageBorderRegular />,
  },
  {
    title: "Amazon URL Shortener",
    path: "/amazon-url-shortener",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Space Remover",
    path: "/space-remover",
    icon: <CodeTextEditFilled />,
  },

  {
    title: "Words Replacer",
    path: "/words-replacer",
    icon: <CodeTextEditFilled />,
  },
  {
    title: "Images To PDF",
    path: "/images-to-pdf",
    icon: <DocumentPdfRegular />,
  },
]

const MenuItems = () => {
  const classes = useStyles()
  const menuContents = routeSettings

  return (
    <>
      {menuContents.map((content) => (
        <Link key={content.path} href={content.path} className={classes.a}>
          <Tab key={content.path} value={content.path} icon={content.icon}>
            {content.title}
          </Tab>
        </Link>
      ))}
    </>
  )
}

const relativePath = (longPath: string) => {
  const baseName = "/tiny-tools/"
  return longPath.replace(baseName, "/")
}

const HorizontalMenu = () => {
  const styles = useStyles()

  return (
    <TabList
      className={styles.horizontalMenu}
      defaultSelectedValue={relativePath(location.pathname)}
      size="medium"
    >
      <MenuItems />
    </TabList>
  )
}

const VerticalMenu = () => {
  const styles = useStyles()

  return (
    <TabList
      className={styles.verticalMenu}
      defaultSelectedValue={relativePath(location.pathname)}
      size="medium"
      vertical
    >
      <MenuItems />
    </TabList>
  )
}

export default function InnerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isSp = useMediaQuery(mediaQuery.sp)
  const styles = useStyles()

  return (
    <FluentProvider theme={webDarkTheme} style={{ minHeight: "100vh" }}>
      <Header />
      <div
        style={isSp ? {} : { display: "flex" }}
        className={styles.fullHeight}
      >
        <div
          style={{ flexBasis: "300px", minHeight: "0vh" }}
          className={styles.fullHeight}
        >
          {isSp ? <HorizontalMenu /> : <VerticalMenu />}
        </div>
        <div style={{ flex: 1, margin: "32px" }} className={styles.fullHeight}>
          {children}
        </div>
      </div>
    </FluentProvider>
  )
}

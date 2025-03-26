"use client"
// layout.tsxのmetadataはuse clientと共存できないのでファイルを分けている

import { FluentProvider, webDarkTheme } from "@fluentui/react-components"
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components"
import { mediaQuery, useMediaQuery } from "./media-query"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { routeSettings } from "./route-settings"

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

const MenuItems = () => {
  const classes = useStyles()

  const elements = []
  for (const [name, settings] of routeSettings) {
    const links = settings.map((e) => (
      <Link key={e.path} href={e.path} className={classes.a}>
        <Tab key={e.path} value={e.path} icon={e.icon}>
          {e.title}
        </Tab>
      </Link>
    ))
    elements.push(
      <div style={{ marginBottom: "1em" }}>
        <h4 style={{ margin: "4px 8px" }}>{name}</h4>
        {links}
      </div>
    )
  }

  return <>{elements}</>
}

const HorizontalMenu = () => {
  const styles = useStyles()
  const currentPath = usePathname()

  return (
    <TabList
      className={styles.horizontalMenu}
      defaultSelectedValue={currentPath}
      size="medium"
    >
      <MenuItems />
    </TabList>
  )
}

const VerticalMenu = () => {
  const styles = useStyles()
  const currentPath = usePathname()

  return (
    <TabList
      className={styles.verticalMenu}
      defaultSelectedValue={currentPath}
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

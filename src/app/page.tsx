"use client"

import {
  makeStyles,
  typographyStyles,
  tokens,
  Tab,
} from "@fluentui/react-components"
import Link from "next/link"
import { routeSettings } from "./route-settings"

const useStyles = makeStyles({
  title: typographyStyles.title2,
  text: typographyStyles.body1,
  a: {
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
  },
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
  const classes = useStyles()

  const sections = []
  for (const [name, settings] of routeSettings) {
    const links = settings.map((e) => (
      <Link key={e.path} href={e.path} className={classes.a}>
        <Tab
          key={e.path}
          value={e.path}
          icon={e.icon}
          style={{ padding: "8px 10px" }}
        >
          {e.title}
        </Tab>
      </Link>
    ))

    sections.push(
      <div style={{ marginBottom: "40px" }}>
        <h4 style={{ margin: "4px 8px" }}>{name}</h4>
        {links}
      </div>
    )
  }

  return <>{sections}</>
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

import { makeStyles, tokens, Tab, TabList } from '@fluentui/react-components'
import { mediaQuery, useMediaQuery } from './media-query'
import { CodeTextEditFilled, ImageBorderRegular } from '@fluentui/react-icons'
import { Link } from "react-router-dom";
import { menuItems } from '../routes/routes';


const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorBrandBackground,
  },
  horizontalMenu: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
    minHeight: "0vh",
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
    minHeight: "100vh"
  }
})


const Header = () => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.a}>
        <h2 style={{ padding: "14px", margin: "0px" }}>
          Tiny Tools
        </h2>
      </Link>
    </header>
  )
}


const MenuItems = () => {
  const classes = useStyles()
  const menuContents = menuItems

  return (
    <>
      {menuContents.map((content) => (
        <Link key={content.path} to={content.path} className={classes.a}>
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


type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const isSp = useMediaQuery(mediaQuery.sp)
  const styles = useStyles()

  return (
    <>
      <Header />
      <div
        style={isSp ? {} : { display: "flex" }}
        className={styles.fullHeight}
      >
        <div style={{ flexBasis: "300px" }} className={styles.fullHeight}>
          {isSp ? <HorizontalMenu /> : <VerticalMenu />}
        </div>
        <div style={{ flex: 1, margin: "32px" }} className={styles.fullHeight}>
          {children}
        </div>
      </div>
    </>
  )
}
export default Layout

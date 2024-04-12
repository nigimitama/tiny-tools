import { makeStyles, tokens } from '@fluentui/react-components'

const useStyles = makeStyles({
  a: {
    color: tokens.colorNeutralForeground1,
    textDecorationLine: "none",
  }
})

type LinkProps = {
  href: string,
  children: JSX.Element
}

const Link = ({ href, children }: LinkProps) => {
  const styles = useStyles()
  return (
    <a href={href} className={styles.a}>
      {children}
    </a>
  )
}

export default Link
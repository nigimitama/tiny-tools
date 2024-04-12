import Layout from "../components/layout";
import { Link, makeStyles, typographyStyles } from '@fluentui/react-components';


const useStyles = makeStyles({
  title: typographyStyles.title2,
  text: typographyStyles.body1,
})


const Title = () => {
  const styles = useStyles()
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.title}>Tiny Tools</div>
      <p className={styles.text}>Simple tools that may be useful</p>
    </div>
  )
}

const Index = () => {
  return (
    <>
      <h3>Encoding / Transforming</h3>
      <div>
        <Link href="base64-image-encoder">Base64 Image Encoder</Link>
      </div>
      <div>
        <Link href="space-remover">Space Remover</Link>
      </div>
    </>
  )
}


const Root = () => {
  return (
    <Layout>
      <>
        <Title />
        <Index />
      </>
    </Layout>
  )
}


export default Root;

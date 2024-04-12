import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import Layout from "../components/layout";


const ErrorMessage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Oops!</h1>
        <h3>{error.status} - {error.statusText}</h3>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    )
  } else {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    )
  }
}


const ErrorPage = () => {
  return (
    <Layout>
      <ErrorMessage />
    </Layout>
  )
}

export default ErrorPage

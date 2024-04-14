import ReactDOM from 'react-dom/client'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './styles.css'
import { routes } from './routes/routes'

const router = createBrowserRouter(routes, { basename: "/" })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FluentProvider theme={webDarkTheme} style={{ minHeight: "100vh" }}>
    <RouterProvider router={router} />
  </FluentProvider>
)

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Sidebar from "../components/sidebar"
import * as styles from "./layout.module.css"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  //  const classes = `global-wrapper grid`
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  return (
    <div className={styles.grid} data-is-root-path={isRootPath}>
      <div className={styles.sidebar}>
        {" "}
        <Header
          menuLinks={data.site.siteMetadata.menuLinks}
          siteTitle={data.site.siteMetadata?.title || `Title`}
        />
        <footer>
       socials
      </footer>
      </div>
      <div className={styles.main}>
        <main>{children}</main>


      <footer>
        © {new Date().getFullYear()}, Built with ❤️
      </footer>
      </div>

    </div>
  )
}

export default Layout

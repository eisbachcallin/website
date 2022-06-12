import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import * as styles from "./layout.module.css"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
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
        {" "}
        <Header
          menuLinks={data.site.siteMetadata.menuLinks}
          siteTitle={data.site.siteMetadata?.title || `Title`}
        />
      <div className={styles.main}>
        <main>{children}</main>
      </div>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout

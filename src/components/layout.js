import * as React from "react"

import * as styles from "./layout.module.css"

import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

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
    <div className={styles.layout} data-is-root-path={isRootPath}>
      {" "}
      <Header menuLinks={data.site.siteMetadata.menuLinks} />
      <div className={styles.main}>
        <main>{children}</main>
      </div>
      <footer>Eisbach Callin ©{new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout

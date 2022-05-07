import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import  Sidebar from "../components/sidebar"
import * as styles from './layout.module.css'


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
  <div className={styles.item1}>     <Header className="global-header" menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata?.title || `Title`} /></div>
  <div className={styles.item2}>
  <main>{children}</main></div>


      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

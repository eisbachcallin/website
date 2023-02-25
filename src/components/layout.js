import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"
import HeaderNext from "./next/header"

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
    <div data-is-root-path={isRootPath} className="bg-black">
      {" "}
      <HeaderNext menuLinks={data.site.siteMetadata.menuLinks} />
      <main className="flex items-center justify-between p-4 py-8 lg:p-8">
        {children}
      </main>
      <footer className="flex justify-end p-4 lg:px-8 lg:py-4 text-white">Eisbach Callin ©{new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
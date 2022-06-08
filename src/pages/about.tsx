import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Bio from "../components/bio"
import Seo from "../components/seo"

const about = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About | Eisbach Callin" />
      <Bio />
    </Layout>
  )
}

export default about

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

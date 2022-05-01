import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"

const contact = ({ data, location}) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
    <div>contact</div>
    </Layout>
  )
}

export default contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

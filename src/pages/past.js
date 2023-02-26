import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CardTile from "../components/card-tile"

const seo = "Past Events | Eisbach Callin"

const ebcPast = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={seo} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-4 lg:gap-2">
        {posts.map(post => {
          return (
            <CardTile post={post} key={post.fields.slug}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default ebcPast

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/past/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          cover {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`

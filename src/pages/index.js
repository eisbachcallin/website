import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import CardTile from "../components/card-tile"

const seo = "Eisbach Callin | Underground Rave since 2010"

const ebcHome = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={seo} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8">
        {posts.map(post => {
          return (
            <CardTile post={post} key={post.fields.slug}/>
          )
        })}
      </div>
    </Layout>
  )
}

export default ebcHome

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/upcoming/" } }
      sort: { frontmatter: { date: ASC } }
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
              gatsbyImageData(layout: CONSTRAINED, height: 666)
            }
          }
        }
      }
    }
  }
`

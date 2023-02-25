import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

const seo = "Eisbach Callin | Underground Rave since 2010"

const ebcHome = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={seo} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-8">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <Link to={post.fields.slug} key={post.fields.slug} itemProp="url"
                  className="text-white">
              <article
                className="relative"
                itemScope
                itemType="http://schema.org/Article"
              >
                <GatsbyImage
                  className="aspect-din w-full object-fill transition ease-in duration-150"
                  image={post.frontmatter.cover.childImageSharp.gatsbyImageData}
                  alt={post.frontmatter.description}
                />
                <div
                  className="aspect-din w-full opacity-0 hover:opacity-100 absolute top-0 left-0 bg-white/0 p-4 backdrop-blur-lg">
                  <h2 className="text-pink-500 drop-shadow">
                    {title}
                  </h2>
                  <p itemProp="description">
                    {post.frontmatter.description || post.excerpt}
                  </p>
                  <h3>{post.frontmatter.date}</h3>
                </div>
              </article>
            </Link>
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

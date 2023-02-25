import * as React from "react"
import { Link, graphql } from "gatsby"
import * as styles from "./index.module.css"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Eisbach Callin | Underground Rave since 2010" />
      <div className={styles.postList}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <Link to={post.fields.slug} key={post.fields.slug} itemProp="url">
              <article
                className={styles.postListItem}
                itemScope
                itemType="http://schema.org/Article"
              >
                <h2>
                  <span itemProp="headline">{title}</span>
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
                <h3>{post.frontmatter.date}</h3>
                <GatsbyImage
                  image={post.frontmatter.cover.childImageSharp.gatsbyImageData}
                />
              </article>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

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

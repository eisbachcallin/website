import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "./layout"
import Seo from "./seo"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="grid grid-cols-7 gap-4 lg:gap-8"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="grid col-span-7 md:col-span-3 lg:col-span-2 h-full">
          <GatsbyImage
            className="md:sticky md:top-20 aspect-din object-fill transition ease-in duration-150"
            image={post.frontmatter.cover.childImageSharp.gatsbyImageData}
            alt={post.frontmatter.description}
          />
        </div>
        <section
          className="grid col-span-7 md:col-span-4 lg:col-span-5 prose prose-invert prose-a:text-pink-500 lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY [| Doors:] h:mm")
        description
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

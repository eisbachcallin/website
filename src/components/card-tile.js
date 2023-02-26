import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const CardTile = ({ post }) => {
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
          className="transition ease-in-out duration-300 aspect-din w-full opacity-0 hover:opacity-100 absolute top-0 left-0 bg-white/0 p-4 backdrop-blur-lg">
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
}

export default CardTile
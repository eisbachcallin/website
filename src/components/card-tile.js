import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as cn from "classnames"

const bgStyle = "bg-black"
const invertStyle = "bg-pink-500"
const textStyle = "text-pink-500"

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
          className="flex flex-col justify-between w-100 transition ease-in-out duration-300 aspect-din w-full opacity-0 hover:opacity-100 absolute top-0 left-0 bg-white/0 p-4 backdrop-blur-lg">
          <div className="space-y-2">
            <div className={cn(bgStyle, "p-1 text-white w-[fit-content]")}>
              <h2 className="text-3xl leading-none uppercase">
                {title}
              </h2>
            </div>
            <div className={cn(invertStyle, "p-1 text-white w-[fit-content]")}>
              <h3 className="text-base leading-tight uppercase">{post.frontmatter.date}</h3>
            </div>
          </div>
          <div className="space-y-1">
            <div className={cn(bgStyle, "p-1 text-white w-[fit-content]")}>
              <p itemProp="description" className="uppercase">
                Sunny Red
              </p>
            </div>
            <div className={cn(bgStyle, "p-1 text-white w-[fit-content]")}>
              <p itemProp="description" className="uppercase ]">
                <span className={textStyle}> @ </span>
                Feierwerk Hansastr. 39
                <span className={textStyle}> /</span> Munich
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default CardTile
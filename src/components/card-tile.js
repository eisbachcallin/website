import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as cn from "classnames"

const bgStyle = "bg-black"
const textHighlight = "text-pink-500"

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
            <h2 className="text-xl uppercase">
              <span className={"p-1 bg-black"}>{title}</span>
            </h2>
            <h3 className="text-base leading-tight uppercase">
              <span className={"p-1 bg-pink-500"}>{post.frontmatter.date}</span>
            </h3>
          </div>
          <div className="space-y-2">
            <p itemProp="description" className="text-base leading-tight uppercase">
              <span className={"p-1 bg-black"}>Sunny Red</span>
            </p>
            <p itemProp="description" className="uppercase leading-tight">
                <span className={"p-1 bg-black"}>
                <span className={textHighlight}> @ </span>
                Feierwerk Hansastr. 39
                <span className={textHighlight}> /</span> Munich
                </span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default CardTile
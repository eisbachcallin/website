import * as React from "react"

import * as styles from './header.module.css'

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle, menuLinks }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        id: "header",
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        top: 0,
        left: 0,
        width: `250px`,
      }}
    >      
    <StaticImage
    className="logo"
    layout="fixed"
    formats={["auto", "webp", "avif"]}
    src="../images/logo.png"
    width={50}
    height={50}
    quality={95}
    alt="Eisbach Callin Logo"
  />
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div>
          <nav>
            <ul style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
              {menuLinks.map(link => (
                <li
                  key={link.name}
                  style={{
                    listStyleType: `none`,
                    padding: `1rem`,
                  }}
                >
                  <Link to={link.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Eisbach Callin`,
}

export default Header

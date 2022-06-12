import * as React from "react"

import * as styles from "./header.module.css"

import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "../images/logo.svg"

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <div>
      {" "}
      <Link to="/">
        <img width="100px" src={Logo} />
      </Link>
      <p>{siteTitle}</p>
      <div>
        <ul className={styles.nav}>
          {menuLinks.map(link => (
            <li key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <p>Don't act like an idiot, dance like one!</p>
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

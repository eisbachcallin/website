import * as React from "react"

import * as styles from "./header.module.css"

import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "../images/logo.svg"

const scrollmessage = "Don't act like a clown, dance like one 🤡🥳"

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <Link to="/">
      <div className="logo">
        <img width="240px" alt="Eisbach Callin" src={Logo} />
        <h1 className="siteTitle">{siteTitle}</h1>
      </div>
    </Link>
    <div>
      <div className={styles.nav}>
        {menuLinks.map(link => (
          <div className={styles.navlinks} key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </div>
        ))}
      </div>
      <marquee className={styles.nav} behaviour="scroll">
        {scrollmessage}
      </marquee>
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

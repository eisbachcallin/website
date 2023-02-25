import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "../../images/logo.svg"

const scrollmessage = "Don't act like a clown, dance like one 🤡🥳"

const HeaderNext = ({ siteTitle, menuLinks }) => (
  <header>
    <Link to="/">
      <div className="logo">
        <img width="240px" alt="Eisbach Callin" src={Logo} />
        <h1 className="siteTitle">{siteTitle}</h1>
      </div>
    </Link>
    <div>
      <div className="bg-red-50">
        {menuLinks.map(link => (
          <div className="font-bold text-2xl text-red-900" key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </div>
        ))}
      </div>
      <marquee className="font-thin text-2xl text-red-900" behaviour="scroll">
        {scrollmessage}
      </marquee>
    </div>
  </header>
)

HeaderNext.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderNext.defaultProps = {
  siteTitle: `Eisbach Callin`,
}

export default HeaderNext

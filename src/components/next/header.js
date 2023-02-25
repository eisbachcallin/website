import Logo from "../../images/logo.svg"
import { Link } from "gatsby"
import * as React from "react"
import PropTypes from "prop-types"
import Header from "../header"

const marqueeMessage = "Don't act like a clown, dance like one 🤡🥳"

const HeaderNext = ({ siteTitle, menuLinks }) => (
    <header>
      <nav className="flex items-center justify-between p-4 lg:px-8 lg:py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{siteTitle}</span>
            <img className="h-8 w-auto" src={Logo} alt={siteTitle} />
          </Link>
        </div>
        <div className="flex gap-x-8 md:gap-x-12">
          {menuLinks.map(link => (
            <div className="text-sm font-regular leading-6 text-white hover:text-pink-500 uppercase " key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </div>
          ))}
        </div>
      </nav>
      <div className="flex">
        <marquee className="text-sm text-white py-2 border-y border-white" behaviour="scroll">
          <span className="sr-only">{marqueeMessage}</span>
          {marqueeMessage}
        </marquee>
        <marquee className="hidden md:block text-sm text-white py-2 border-y border-white" behaviour="scroll">
          {marqueeMessage}
        </marquee>
        <marquee className="hidden lg:block text-sm text-white py-2 border-y border-white" behaviour="scroll">
          {marqueeMessage}
        </marquee>
        <marquee className="hidden lg:block text-sm text-white py-2 border-y border-white" behaviour="scroll">
          {marqueeMessage}
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

export default HeaderNext
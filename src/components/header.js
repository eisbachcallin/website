import Logo from "../images/logo.svg"
import { Link } from "gatsby"
import * as React from "react"
import PropTypes from "prop-types"


const marqueeMessage = "Don't act like a clown, dance like one 🤡🥳"

const HeaderNext = ({ siteTitle, menuLinks }) => (
    <header id={"header"}>
      <nav id={"header-nav"} className="fixed z-10 flex w-screen items-center justify-between p-4 lg:px-8 lg:py-4 backdrop-blur-lg bg-black/20 border-b border-black" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{siteTitle}</span>
            <img className="h-8 w-auto" src={Logo} alt={siteTitle} />
          </Link>
        </div>
        <div className="flex gap-x-8 md:gap-x-12">
          {menuLinks.map(link => (
            <div className="text-sm font-regular leading-6 text-white hover:text-pink-500 uppercase" key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </div>
          ))}
        </div>
      </nav>
      <div id={"header-marquee"} className="flex pt-20">
        <marquee className="text-sm text-white py-2 border-y border-gray-900" behaviour="scroll">
          <span className="sr-only">{marqueeMessage}</span>
          {marqueeMessage}
        </marquee>
        <marquee className="hidden md:block text-sm text-white py-2 border-y border-gray-900" behaviour="scroll">
          {marqueeMessage}
        </marquee>
        <marquee className="hidden lg:block text-sm text-white py-2 border-y border-gray-900" behaviour="scroll">
          {marqueeMessage}
        </marquee>
        <marquee className="hidden lg:block text-sm text-white py-2 border-y border-gray-900" behaviour="scroll">
          {marqueeMessage}
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
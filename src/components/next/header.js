import Logo from "../../images/logo.svg"
import { Link } from "gatsby"
import * as React from "react"
import PropTypes from "prop-types"
import Header from "../header"

const HeaderNext = ({ siteTitle, menuLinks }) => (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{siteTitle}</span>
            <img className="h-8 w-auto" src={Logo} alt={siteTitle} />
          </Link>
        </div>
        <div className="flex gap-x-8 md:gap-x-12">
          {menuLinks.map(link => (
            <div className="text-sm md:text-base font-semibold leading-6 text-white" key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </div>
          ))}
        </div>
      </nav>
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Eisbach Callin`,
}

export default HeaderNext
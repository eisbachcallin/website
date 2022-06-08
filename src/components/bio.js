/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Logo from "../images/logo.svg"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <h2>Eisbach Callin - Don't act like an idiot, dance like one 🥳</h2>
      <p>
        Eisbach Callin is a underground dance party at home in Munich, Germany
        since 2010. Eisbach Callin is only possible through the dedication and
        love of all of our supporters. Thanks for your support & love over the
        years 🤗.
      </p>
      <h3>Artists</h3>
      <h4>Miso</h4>
      <p>
        Munich-born DJ and producer Miso discovered his love for drum n' bass in
        London's nightlife. Inspired by the hard rhythms and screaming basslines
        of the city, he is dedicated to a mix of everything the genre has to
        offer. Whether vocal-based, break-heavy or just groovy, nothing is safe
        from his three decks and is promptly served with plenty of bass.
      </p>
      <h4>Noise Colors</h4>
      <p>
        Noise Colors are two producers from Munich who have dedicated themselves
        to drum & bass and dubstep. As studio musicians, however, survival is
        not easy in times of major labels worth billions - as long as the first
        No. 1 hit is still missing, they therefore earn their living as DJs. So
        that one of them doesn't stand around twiddling thumbs while the other
        celebrates with the crowd, they DJ in pairs with three decks. And they
        do it at a speed that sometimes makes them dizzy themselves.
      </p>
      <h4>Turdbaby</h4>
      <p>
        Turdbaby takes you on a colorful journey through all varieties of bass
        music, be it soulful garage, gritty dubstep, uptempo kuduro, brostep, or
        almighty jungle; simply an eclectic mix of everything that can lead to
        the fringes of breakcore and dark dub - anything goes, as long as the
        rave is in ruins afterwards!
      </p>
      <h4>Weiki</h4>
      <p>
        Sweet, full of vitamins and somehow mysterious: The live sets of Munich
        DJ Weiki are as exotic and intoxicating as the fruit. It's no secret;
        just take one part each of Techno, Tech House and Minimal Techno, mix it
        with a pinch of humor and self-irony and the result is a dish that makes
        you dance until dawn: Weiki.
      </p>
      <h4>Visionär</h4>
      <p>
        Munich-based visualist Visionär casts a colorful universe on the wall, a
        flowing journey through music using a mix of inputs. Whether street
        scenes, distorted beyond recognition in an ecstatic rush of color or
        shining pale behind a filter; whether Soviet cartoons, Hungarian Magarin
        advertisements, or Murnau's Nosferatu: with an attitude between love of
        detail and chutzpah, everything is shredded, reassembled, clothed and
        sent onto the stage. Basically, whatever is at hand can be blasted
        through the digital ether and into the audience's optic nerves. So even
        the audience itself, a half-empty beer bottle, yesterday's newspaper or
        just the way to the bakery can morph into a flashing blazing inferno of
        shapes and colors.
      </p>
    </div>
  )
}

export default Bio

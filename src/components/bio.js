/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
        since 2010.
      </p>
      <p>
        All of this is only possible through the dedication and love of all of
        our supporters.{" "}
      </p>
      <p>Hugs and kisses for your support over the years 🤗😚</p>
      <h3>Links & Socials</h3>
      <ul>
        <li>
        Email:{" "}
          <a>eisbach[at]gmail.com </a>| don't be shy, write us!
        </li>
        <li>Instagram:{" "}
          <a href="https://www.instagram.com/eisbachcallin/?hl=de">
            @eisbachcallin
          </a> | Follow to get news on upcoming events
        </li>
        <li>Mixcloud:{" "}
          <a href="https://www.mixcloud.com/eisbachcallin/">
          eisbachcallin
          </a> | most of our recordings are here
        </li>
        <iframe
          width="100%"
          height="60"
          src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Feisbachcallin%2F"
          frameborder="0"
        ></iframe>
      </ul>
      <h3>Artists</h3>
      <h4>Miso</h4>
      <p>
        Munich-born DJ and producer Miso discovered his love for drum n' bass in
        London's nightlife. Inspired by the hard rhythms and screaming basslines
        of the city, he is dedicated to a mix of everything the genre has to
        offer. Whether vocal-based, break-heavy or just groovy, nothing is safe
        from his three decks and is promptly served with plenty of bass.
      </p>
      <p>
        <a href="https://blendits.bandcamp.com/album/voodoo-princess-loopholes">
          Miso | Bandcamp
        </a>
      </p>
      <p>
        <a href="https://www.beatport.com/artist/miso/10741">
          Miso | Beatport
        </a>
      </p>
      <p>
        <a href="https://soundcloud.com/misoelectronica">
          Miso | Soundcloud
        </a>
      </p>
      <h4>Noise Colors</h4>
      <p>
        Two passionate musicians and producers from Munich, Germany, have joined
        forces to create a fresh Drum & Bass and Dubstep project: "Noise
        Colors". Their live trademark - two Mixers with three turntables - has
        proven itself on numerous occasions. Supporting artists like "Mind
        Vortex" and playing regularly at plenty of local venues such as "The
        Drum & Bass Issue", "Isar Bass", "Clandestino Rave", "Neokeller" and
        "Eisbach Callin'", they build up their reputation as one of Munich's
        freshest electronic acts.
      </p>
      <p>
        <a href="https://soundcloud.com/noise-colors">
          Noise Colors | Soundcloud
        </a>
      </p>
      <h4>Turdbaby</h4>
      <p>
        Turdbaby takes you on a colorful journey through all varieties of bass
        music, be it soulful garage, gritty dubstep, uptempo kuduro, brostep, or
        almighty jungle; simply an eclectic mix of everything that can lead to
        the fringes of breakcore and dark dub - anything goes, as long as the
        rave is in ruins afterwards!
      </p>
      <p>
        <a href="https://www.mixcloud.com/turdbaby/">
          Turdbaby | Mixcloud
        </a>
      </p>
      <p>
        <a href="https://www.mixcloud.com/dnbmuc_podcast/dnbmuc-podcast029-turdbaby-eisbach-callin/">
          DNB Muc Podcast 29 | Mixcloud
        </a>
      </p>
      <h4>Weiky</h4>
      <p>
        Sweet, full of vitamins and somehow mysterious: The live sets of Munich
        DJ Weiky are as exotic and intoxicating as the fruit. It's no secret;
        just take one part each of Techno, Tech House and Minimal Techno, mix it
        with a pinch of humor and self-irony and the result is a dish that makes
        you dance until dawn: Weiky.
      </p>
      <p>
        <a href="https://www.mixcloud.com/Weiky/">
          Weiky | Mixcloud
        </a>
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

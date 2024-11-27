interface ResidentLink {
  url: string
  platform: string
}

export interface Resident {
  name: string
  description: string
  avatar: string
  links?: ResidentLink[]
}

const residents: Resident[] = [
  {
    name: 'Miso',
    avatar: '/artists/miso.jpg',
    description:
      "Munich-born DJ and producer Miso discovered his love for drum n' bass in London's nightlife. Inspired by the hard rhythms and screaming basslines of the city, he is dedicated to a mix of everything the genre has to offer. Whether vocal-based, break-heavy or just groovy, nothing is safe from his three decks and is promptly served with plenty of bass.",
    links: [
      {
        url: 'https://blendits.bandcamp.com/album/voodoo-princess-loopholes',
        platform: 'Bandcamp',
      },
      {
        url: 'https://www.beatport.com/artist/miso/10741',
        platform: 'Beatport',
      },
      {
        url: 'https://soundcloud.com/misoelectronica',
        platform: 'Soundcloud',
      },
    ],
  },
  {
    name: 'Dubz aka Turdbaby',
    avatar: '/artists/turdbaby.jpg',
    description:
      'Turdbaby takes you on a colorful journey through all varieties of bass music, be it soulful garage, gritty dubstep, uptempo kuduro, brostep, or almighty jungle; simply an eclectic mix of everything that can lead to the fringes of breakcore and dark dub - anything goes, as long as the rave is in ruins afterwards!',
    links: [
      {
        url: 'https://www.mixcloud.com/turdbaby/',
        platform: 'Mixcloud',
      },
    ],
  },
  {
    name: 'Noise Colors',
    avatar: '/artists/noisecolors.jpg',
    description:
      "Two passionate musicians and producers from Munich, Germany, have joined forces to create a fresh Drum & Bass and Dubstep project: 'Noise Colors'. Their live trademark - two Mixers with three turntables - has proven itself on numerous occasions. Supporting artists like 'Mind Vortex' and playing regularly at plenty of local venues such as 'The Drum & Bass Issue', 'Isar Bass', 'Clandestino Rave', 'Neokeller' and 'Eisbach Callin', they build up their reputation as one of Munich's freshest electronic acts.",
    links: [
      {
        url: 'https://soundcloud.com/noise-colors',
        platform: 'Soundcloud',
      },
    ],
  },
  {
    name: 'MC Treasure Irie',
    avatar: '/artists/treasureirie.jpg',
    description:
      'MC TREASURE IRIE is a DJ, lead singer, and MC. He exclusively sings his own songs and lyrics, which revolve around social criticism, politricks, and life’s controversies. MC TREASURE IRIE originally comes from Ecuador and can now look back on a 20-year stage career. The word acrobat started with a hip-hop band in his hometown of Memmingen. After various reggae bands and sound projects in dub, hip-hop & drum’n’bass, MC TREASURE IRIE has been active on the mic for the Dandelion Soundsystem for over 10 years, as well as with Eisbach Callin’, Siren Sisters, at Rootsbase/Fusion Festival, and the Siko Munich. He writes his lyrics in English, patois slang, as well as in German.',
    links: [
      {
        url: 'https://m.facebook.com/people/MC-Treasure-Irie/100030951506983/',
        platform: 'Soundcloud',
      },
    ],
  },
  {
    name: 'Weiky',
    avatar: '/artists/weiky.jpg',
    description:
      'Sweet, full of vitamins and somehow mysterious: The live sets of Munich DJ Weiky are as exotic and intoxicating as the fruit. It’s no secret; just take one part each of Techno, Tech House and Minimal Techno, mix it with a pinch of humor and self-irony and the result is a dish that makes you dance until dawn: Weiky.',
    links: [
      {
        url: 'https://www.mixcloud.com/Weiky/',
        platform: 'Mixcloud',
      },
    ],
  },
  {
    name: 'Visionaer',
    avatar: '/artists/visionaer.png',
    description:
      'Munich-based visualist Visionär casts a colorful universe on the wall, a flowing journey through music using a mix of inputs. Whether street scenes, distorted beyond recognition in an ecstatic rush of color or shining pale behind a filter; whether Soviet cartoons, Hungarian Magarin advertisements, or Murnau’s Nosferatu: with an attitude between love of detail and chutzpah, everything is shredded, reassembled, clothed and sent onto the stage. Basically, whatever is at hand can be blasted through the digital ether and into the audience’s optic nerves. So even the audience itself, a half-empty beer bottle, yesterday’s newspaper or just the way to the bakery can morph into a flashing blazing inferno of shapes and colors.',
  },
]

export default residents

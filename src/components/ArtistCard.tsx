import Link from 'next/link'
import BeatportIcon from '@/assets/icons/BeatportIcon'
import InstagramIcon from '@/assets/icons/InstagramIcon'
import MixcloudIcon from '@/assets/icons/MixcloudIcon'
import SoundcloudIcon from '@/assets/icons/SoundcloudIcon'
import Image from 'next/image'

type Icon =
  | typeof SoundcloudIcon
  | typeof BeatportIcon
  | typeof MixcloudIcon
  | typeof InstagramIcon

interface Link {
  url: string
  platform: string
  Icon: Icon
}

interface Artist {
  name: string
  description: string
  avatar: string
  links: Link[]
}

interface ArtistCardProps {
  artist: Artist
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <article className='mb-16 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
      <div className='flex min-w-[8rem] flex-col items-start space-y-4'>
        <Image
          width={64}
          height={64}
          src={artist.avatar}
          alt={`${artist.name} avatar`}
          className='h-16 w-16 rounded-none border border-black'
        />
        <div className='flex flex-col space-y-2'>
          {artist.links.map((link) => (
            <Link
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center space-x-2 py-1'
              key={link.url}
            >
              <link.Icon className='h-4 w-4 fill-black group-hover:fill-pink-500' />
              <span className='text-base leading-none group-hover:text-pink-500'>
                {link.platform}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>{artist.name}</h3>
        <p>{artist.description}</p>
      </div>
    </article>
  )
}

export default ArtistCard

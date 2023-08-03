import { Artist } from '@/config/artists'
import Image from 'next/image'
import Link from 'next/link'

interface ResidentCardProps {
  artist: Artist
}

const ResidentCard = ({ artist }: ResidentCardProps) => {
  return (
    <div className='grid grid-cols-1 gap-4 font-sans sm:grid-cols-2 '>
      <div className='relative aspect-din w-full border border-black'>
        <Image
          width={800}
          height={800}
          src={artist.avatar}
          alt={artist.name}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='mb-2 space-y-2'>
        <h2 className='text-lg font-semibold'>{artist.name}</h2>
        <p className='text-base'>{artist.description}</p>
        <div className='flex flex-col space-y-2'>
          {artist.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target='_blank'
              rel='noreferrer'
              className='flex justify-start text-black hover:text-pink-500'
            >
              <p>{link.platform} ↗</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResidentCard

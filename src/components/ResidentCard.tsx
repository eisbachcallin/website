import { Resident } from '@/config/residents'
import Image from 'next/image'
import Link from 'next/link'

interface ResidentCardProps {
  residents: Resident
}

const ResidentCard = ({ residents }: ResidentCardProps) => {
  return (
    <div id={residents.name} className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <div className='relative aspect-din w-full border border-black sm:col-span-1'>
        <Image
          width={800}
          height={800}
          src={residents.avatar}
          alt={residents.name}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='mb-2 space-y-2 sm:col-span-2 sm:max-w-[60ch]'>
        <h2 className='font-mono text-lg font-semibold uppercase'>
          {residents.name}
        </h2>
        <p className='font-sans  text-base '>{residents.description}</p>
        <div className='flex flex-col space-y-2'>
          {residents.links.map((link, index) => (
            <div
              key={index}
              className='group flex items-center font-mono uppercase'
            >
              <div className='pr-1'>{link.platform}</div>
              <Link
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='font-sans text-pink-500 group-hover:text-black'
              >
                {' '}
                ↗
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResidentCard

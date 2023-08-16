import { Resident } from '@/config/residents'
import Image from 'next/image'
import Link from 'next/link'

interface ResidentCardProps {
  residents: Resident
}

const ResidentCard = ({ residents }: ResidentCardProps) => {
  return (
    <div id={residents.name} className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      <div className='relative border border-default'>
        {' '}
        <Image
          width={640}
          height={640}
          sizes='(min-width: 1280px) 23.26vw, (min-width: 1040px) calc(16.36vw - 13px), (min-width: 640px) calc(33.42vw - 19px), calc(100vw - 18px)'
          src={residents.avatar}
          alt={residents.name}
          className='aspect-din h-full w-full object-cover'
        />
      </div>

      <div className='mb-2 space-y-2 text-default sm:col-span-2 sm:max-w-[60ch]'>
        <h2 className='font-mono text-lg font-semibold uppercase'>
          {residents.name}
        </h2>
        <p className='font-sans text-base'>{residents.description}</p>
        <div className='flex flex-col space-y-2'>
          {residents.links &&
            residents.links.map((link, index) => (
              <div
                key={index}
                className='group flex items-center font-mono uppercase'
              >
                <div className='pr-1'>{link.platform}</div>
                <Link
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-sans text-accent group-hover:text-default'
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

import React from 'react'
import Link from 'next/link'

interface LocationProps {
  venueName: string
  address: string
  city: string
  mapUrl: string
}

const RenderLocation: React.FC<LocationProps> = ({
  venueName,
  address,
  city,
  mapUrl,
}) => {
  return (
    <div className='flex flex-col space-y-1 font-mono uppercase '>
      <div className='group flex space-x-1'>
        <div>{venueName}</div>
        <div>
          <Link
            href={mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='font-sans text-accent group-hover:text-default'
          >
            {' '}
            ↗
          </Link>
        </div>
      </div>
      <div>
        <span className='text-accent'>@ </span>
        {address} <span className='text-accent'> / </span>
        {city}
      </div>
    </div>
  )
}

export default RenderLocation

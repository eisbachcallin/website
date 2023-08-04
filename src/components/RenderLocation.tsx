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
            className='font-sans text-pink-500 group-hover:text-black'
          >
            {' '}
            ↗
          </Link>
        </div>
      </div>
      <div>
        <span className='text-pink-500'>@ </span>
        {address} <span className='text-pink-500'> / </span>
        {city}
      </div>
    </div>
  )
}

export default RenderLocation

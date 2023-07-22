import React from 'react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Event } from 'contentlayer/generated'

interface PostHeroProps {
  post: Event
}

const EventHero: React.FC<PostHeroProps> = ({ post }) => {
  const { mdxMeta, cover, date } = post

  return (
    <div className='mb-8 space-y-8'>
      <div className='mx-auto grid grid-cols-12 gap-4'>
        <div className='col-span-12 flex flex-wrap items-baseline gap-x-4'>
          <time
            dateTime={date}
            className='shrink-0 text-xs leading-loose text-gray-500'
          >
            {format(parseISO(date), 'LLLL d, yyyy')}
          </time>
          <span className='text-xs text-pink-500'>/</span>
        </div>

        <h1 className='col-span-12 text-3xl font-semibold text-gray-950 dark:text-white md:col-span-7 md:col-start-1'>
          {mdxMeta.title}
        </h1>
      </div>
      <Image
        priority
        width={860}
        height={860}
        src={cover}
        alt={mdxMeta.description}
        className='aspect-din w-full rounded object-cover'
      />
      <p className='text-xl text-gray-700 dark:text-gray-200'>
        {mdxMeta.description}
      </p>
    </div>
  )
}

export default EventHero

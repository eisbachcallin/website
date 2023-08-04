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
    <div className='grid gap-y-8'>
      <div className='flex flex-col gap-y-2 pb-2 font-sans text-3xl font-semibold'>
        <h1 className='text-gray-950 dark:text-white '>{mdxMeta.title}</h1>
        <div className='flex flex-wrap items-baseline gap-x-4'>
          <time dateTime={date} className='bg-pink-500 p-[0.05rem] text-white'>
            {format(parseISO(date), 'dd-MM-yyyy')}
          </time>
        </div>
      </div>
      <Image
        priority
        width={860}
        height={860}
        src={cover}
        alt={mdxMeta.title}
        className='aspect-din w-full border border-black object-cover'
      />
    </div>
  )
}

export default EventHero

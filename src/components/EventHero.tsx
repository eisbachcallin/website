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
    <div className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-1'>
      <Image
        priority
        sizes='(min-width: 1280px) 19.42vw, (min-width: 640px) 50vw, calc(100vw - 18px)'
        width={1230}
        height={1724}
        src={cover}
        alt={mdxMeta.title}
        className='aspect-din w-full border border-default object-cover'
      />
      <div className='flex flex-col justify-start gap-y-2 pb-2 font-sans'>
        <h1 className='text-2xl text-default sm:text-3xl '>{mdxMeta.title}</h1>
        <div className='flex flex-wrap items-baseline gap-x-4'>
          <time dateTime={date} className='text-2xl text-accent sm:text-3xl'>
            {format(parseISO(date), 'dd-MM-yyyy')}
          </time>
        </div>
      </div>
    </div>
  )
}

export default EventHero

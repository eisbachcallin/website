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
      <div className='flex flex-col gap-y-2 pb-2 font-semibold'>
        <h1 className='font-sans text-2xl text-default sm:text-3xl'>
          {mdxMeta.title}
        </h1>
        <div className='flex flex-wrap items-baseline gap-x-4'>
          <time
            dateTime={date}
            className='bg-accent p-[0.05rem] font-mono text-2xl text-onaccent sm:text-3xl'
          >
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
        className='aspect-din w-full border border-default object-cover'
      />
    </div>
  )
}

export default EventHero

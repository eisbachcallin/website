import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { Event } from 'contentlayer/generated'

interface CardPostProps {
  eventPost: Event
}

export default function EventCard({ eventPost }: CardPostProps) {
  return (
    <article className='flex max-w-xl flex-col items-start justify-between gap-y-4'>
      <div className='flex items-center gap-x-4 text-xs'>
        <time
          dateTime={eventPost.date}
          className='shrink-0 text-xs leading-loose text-gray-500'
        >
          {format(parseISO(eventPost.date), 'LLLL d, yyyy')}
        </time>
        <span className='text-xs text-pink-500'>/</span>
      </div>
      <div className='group relative gap-y-1'>
        <h3 className='text-2xl font-semibold text-gray-900 group-hover:text-gray-600'>
          <Link href={eventPost.slugAsParams}>
            <span className='absolute inset-0' />
            {eventPost.mdxMeta.title}
          </Link>
        </h3>
        <p className='mt-5 text-sm leading-normal text-gray-600'>
          {eventPost.mdxMeta.description}
        </p>
      </div>
    </article>
  )
}

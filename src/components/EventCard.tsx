import clsx from 'clsx'
import { Event } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

interface CardPostProps {
  eventPost: Event
  className?: string
}

export default function EventCard({ eventPost, className }: CardPostProps) {
  return (
    <article
      className={clsx(
        className,
        'relative aspect-din w-full border border-default'
      )}
    >
      <Link href={eventPost.slugAsParams}>
        <Image
          alt={eventPost.mdxMeta.title}
          sizes='(min-width: 1280px) 19.42vw, (min-width: 640px) 50vw, calc(100vw - 18px)'
          width={1230}
          height={1724}
          src={eventPost.cover}
          className='h-full w-full object-cover'
        />
      </Link>
    </article>
  )
}

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
          width={800}
          height={800}
          loading='lazy'
          src={eventPost.cover}
          className='h-full w-full object-cover'
        />
      </Link>
    </article>
  )
}

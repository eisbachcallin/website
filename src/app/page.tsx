import Image from 'next/image'

import { allEvents } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import EventCard from './components/EventCard'

export default function Home() {
  const examplePosts = allEvents.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className='mx-auto my-4 max-w-5xl'>
      {examplePosts.map((post, _id) => (
        <EventCard key={_id} eventPost={post} />
      ))}
    </div>
  )
}

import Image from 'next/image'
import { allEvents } from 'contentlayer/generated'
import { compareDesc, addDays, isAfter, isBefore } from 'date-fns'
import EventCard from './components/EventCard'

export default function Home() {
  const latentDay = addDays(new Date(), 2)

  const sortedEvents = allEvents.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const futureEvents = sortedEvents.filter((event) =>
    isAfter(new Date(event.date), latentDay)
  )
  const pastEvents = sortedEvents.filter((event) =>
    isBefore(new Date(event.date), latentDay)
  )

  return (
    <div className='mx-auto my-4 max-w-5xl'>
      <h1>don’t act like a clown, dance like one</h1>
      {futureEvents.length > 0 ? (
        <>
          <h2>Future Events</h2>
          {futureEvents.map((post, _id) => (
            <EventCard key={_id} eventPost={post} />
          ))}
        </>
      ) : null}

      <h2>Past Events</h2>
      {pastEvents.map((post, _id) => (
        <EventCard key={_id} eventPost={post} />
      ))}
    </div>
  )
}

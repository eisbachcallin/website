import Image from 'next/image'
import { allEvents, Event } from 'contentlayer/generated'
import { compareDesc, addDays, isAfter, isBefore } from 'date-fns'
import EventCard from './components/EventCard'

export default function Home() {
  const latentDay = addDays(new Date(), 2)

  let futureEvents: Event[] = []
  let pastEvents: Event[] = []

  ;(allEvents as Event[])
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((event) => {
      if (isAfter(new Date(event.date), latentDay)) {
        futureEvents.push(event)
      } else {
        pastEvents.push(event)
      }
    })

  return (
    <div className='mx-auto my-4 max-w-5xl'>
      <h1>don’t act like a clown, dance like one</h1>
      {futureEvents.length > 0 ? (
        <>
          <h2>Future Events</h2>
          {futureEvents.map((event) => (
            <EventCard key={event._id} eventPost={event} />
          ))}
        </>
      ) : null}

      <h2>Past Events</h2>
      {pastEvents.map((event) => (
        <EventCard key={event._id} eventPost={event} />
      ))}
    </div>
  )
}

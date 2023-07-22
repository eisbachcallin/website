import { allEvents, Event } from 'contentlayer/generated'
import { compareDesc, isAfter, isBefore, addDays } from 'date-fns'
import EventCard from '../components/EventCard'
import Link from 'next/link'

export default function NextEventsPage() {
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

  if (futureEvents.length === 0) {
    return (
      <div className='mx-auto my-4 max-w-5xl'>
        <h1>No Future Events</h1>
        <p>There are currently no upcoming events. Check our past events:</p>

        {pastEvents.slice(0, 3).map((event) => (
          <EventCard key={event._id} eventPost={event} />
        ))}

        <a href='/past'>See all previous events</a>
      </div>
    )
  }

  return (
    <div className='mx-auto my-4 max-w-5xl'>
      <h1>Future Events</h1>
      {futureEvents.map((event) => (
        <EventCard key={event._id} eventPost={event} />
      ))}
    </div>
  )
}

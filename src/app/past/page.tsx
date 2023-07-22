import { allEvents, Event } from 'contentlayer/generated'
import { compareDesc, isBefore, addDays } from 'date-fns'
import EventCard from '../components/EventCard'

export default function PastEventsPage() {
  const latentDay = addDays(new Date(), 2)

  let pastEvents: Event[] = []

  ;(allEvents as Event[])
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((event) => {
      if (isBefore(new Date(event.date), latentDay)) {
        pastEvents.push(event)
      }
    })

  return (
    <div className='mx-auto my-4 max-w-5xl'>
      <h1>Past Events</h1>
      {pastEvents.map((event) => (
        <EventCard key={event._id} eventPost={event} />
      ))}
    </div>
  )
}

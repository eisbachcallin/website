import clsx from 'clsx'
import EventCard from '@/components/EventCard'
import { Event } from 'contentlayer/generated'

interface EventSectionProps {
  events: Event[]
  label: string
}

const EventSection = ({ events, label }: EventSectionProps) => {
  const gridClasses = clsx('grid w-full gap-4', {
    'xl:grid-cols-2': events.length < 2,
    'sm:grid-cols-2 xl:grid-cols-3': events.length > 2,
  })

  return (
    <section className='space-y-2'>
      <h2 className='text-sm font-light uppercase leading-none'>{label}</h2>
      {events.length > 0 ? (
        <div className={clsx(gridClasses, 'sm:grid-cols-2')}>
          {events.map((event) => (
            <EventCard key={event._id} eventPost={event} />
          ))}
        </div>
      ) : (
        <h2>No events found.</h2>
      )}
    </section>
  )
}

export default EventSection

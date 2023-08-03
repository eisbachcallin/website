import EventCard from '@/components/EventCard'
import { Event } from 'contentlayer/generated'

interface EventSectionProps {
  events: Event[]
  label: string
}

const EventSection = ({ events, label }: EventSectionProps) => {
  return (
    <section className='flex flex-col gap-y-2 p-2 xl:grid xl:grid-cols-6'>
      <h2 className='text-sm font-light uppercase leading-none xl:col-span-1'>
        {label}
      </h2>
      {events.length > 0 ? (
        <div
          className={
            'grid w-full gap-2 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-4'
          }
        >
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

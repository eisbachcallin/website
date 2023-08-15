import EventCard from '@/components/EventCard'
import { Event } from 'contentlayer/generated'

interface EventSectionProps {
  events: Event[]
  label: string
}

const EventSection = ({ events, label }: EventSectionProps) => {
  return (
    <section className='flex h-auto flex-col gap-y-2 p-2'>
      <div className='flex'>
        <h2 className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
          {label}
        </h2>
      </div>

      {events.length > 0 ? (
        <div
          className={'grid gap-2 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-4'}
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

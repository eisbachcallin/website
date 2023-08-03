import EventSection from '@/components/EventSection'
import SplitContainer from '@/components/layout/SplitContainer'
import { useDate } from '@/config/useDate'

export default function NextEventsPage() {
  const { futureEvents, pastEvents } = useDate()

  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <h1 className='font-sans text-2xl sm:text-3xl xl:text-4xl'>
          don’t act like a clown, dance like one
        </h1>
      }
      rightSide={
        <>
          <EventSection events={futureEvents} label='next ↓ ↓ ↓' />
          {futureEvents.length < 2 && (
            <>
              <hr className='border-black' />
              <EventSection
                events={pastEvents.slice(0, 3)}
                label='recent ↓ ↓ ↓'
              />
            </>
          )}
        </>
      }
    />
  )
}

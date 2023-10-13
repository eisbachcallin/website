import EventSection from '@/components/EventSection'
import SplitContainer from '@/components/layout/SplitContainer'
import { useDate } from '@/config/useDate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All past events',
  description:
    'Relive Eisbach Callin’s nights of unforgettable rhythms and the legacy of dancefloor devastation like no other.',
}

export default function Past() {
  const { pastEvents } = useDate()

  return (
    <SplitContainer
      stickyLeft
      narrow
      leftSide={
        <h1 className='font-sans text-2xl sm:text-3xl'>
          don’t act like a clown, dance like one
        </h1>
      }
      rightSide={
        <>
          <EventSection events={pastEvents} label='past events' />
        </>
      }
    />
  )
}

import EventSection from '@/components/EventSection'
import SplitContainer from '@/components/layout/SplitContainer'
import { useDate } from '@/config/useDate'

export default function Home() {
  const { futureEvents, pastEvents } = useDate()

  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <h1 className='font-sans text-2xl sm:text-3xl xl:max-w-[30ch] xl:text-4xl'>
          don’t act like a clown, dance like one
        </h1>
      }
      rightSide={
        <div className='xl:max-w-1/2 xl:grid-col-1 mx-auto max-w-max space-y-8 xl:max-w-none xl:py-16'>
          <EventSection events={futureEvents} label='next ↓ ↓ ↓' />
          <EventSection events={pastEvents} label='past ↓ ↓ ↓' />
        </div>
      }
    />
  )
}

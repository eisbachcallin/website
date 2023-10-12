import { allEvents, Event } from 'contentlayer/generated'
import { compareDesc, addDays, isBefore } from 'date-fns'

export function useDate() {
  const cutOffDate = addDays(new Date(), -2)

  let futureEvents: Event[] = []
  let pastEvents: Event[] = []

  ;(allEvents as Event[])
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((event) => {
      if (isBefore(new Date(event.date), cutOffDate)) {
        pastEvents.push(event)
      } else {
        futureEvents.push(event)
      }
    })

  return { futureEvents, pastEvents }
}

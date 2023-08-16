import { allEvents, Event } from 'contentlayer/generated'
import { compareDesc, addDays, isAfter } from 'date-fns'

export function useDate() {
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

  return { futureEvents, pastEvents }
}

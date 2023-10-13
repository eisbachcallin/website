import { allEvents, Event } from 'contentlayer/generated'
import { compareAsc, addDays, isBefore, compareDesc } from 'date-fns'

export function useDate() {
  const cutOffDate = addDays(new Date(), -2)
  let futureEvents: Event[] = []
  let pastEvents: Event[] = []

  allEvents.forEach((event) => {
    if (isBefore(new Date(event.date), cutOffDate)) {
      pastEvents.push(event)
    } else {
      futureEvents.push(event)
    }
  })

  pastEvents.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  futureEvents.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))

  return { futureEvents, pastEvents }
}

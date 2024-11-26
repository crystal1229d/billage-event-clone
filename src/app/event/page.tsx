import { getEvents } from '@/services/event'
import { Event, EventsListResponse } from '@/types/event'
import EventItem from '@/components/event/EventItem'
import styles from './page.module.css'

export default async function EventsPage() {
  const eventsResponse: EventsListResponse = await getEvents()
  const events = eventsResponse.data.list

  return (
    <div className={styles['product-wrap']}>
      <div className={styles['product-list']}>
        {events &&
          events.map((event: Event) => (
            <EventItem key={event.event_idx} event={event} />
          ))}
      </div>
    </div>
  )
}

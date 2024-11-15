import { getEvents } from '@/service/event'
import { Event } from '@/types'
import Card from '@/common/Card'
import styles from './page.module.css'

export default async function EventsPage() {
  const { data: events } = await getEvents()

  return (
    <div className={styles['product-wrap']}>
      <div className={styles['product-list']}>
        {events &&
          events.list.map((event: Event) => (
            <Card key={event.event_idx} event={event} />
          ))}
      </div>
    </div>
  )
}

'use client'

import styles from './page.module.css';
import { Event } from '@/types';
import Card from '@/common/Card';
import useFetchData from '@/hooks';


function EventsPage() {
  const { data: events, loading, error } = useFetchData<{ list: Event[] }>('/eventApi/event?size=10&page=0&visibility=true');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles['product-wrap']}>
      <div className={styles['product-list']}>
        {events &&
          events.list.map((event) => <Card key={event.event_idx} event={event} />)}
      </div>
    </div>
  )
}

export default EventsPage

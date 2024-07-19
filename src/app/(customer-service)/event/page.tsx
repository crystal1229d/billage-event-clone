'use client'

import React, { useEffect, useState } from 'react'

import styles from './page.module.css';
import { Event } from '@/types';
import Card from '@/common/Card';


function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/eventApi/event?size=10&page=0&visibility=true');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.data.list);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={styles['product-wrap']}>
      <div className={styles['product-list']}>
        {events &&
          events.map((event) => <Card key={event.event_idx} event={event} />)}
      </div>
    </div>
  )
}

export default EventsPage

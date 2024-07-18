'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Event {
  id: string
  name: string
}

const EventsPage: React.FC = () => {
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
        setEvents(data.events);
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
    <div>
      <h1>Events List</h1>
      <ul>
        {events &&
          events.map((event) => (
            <li key={event.id}>
              <Link href={`/event/${event.id}`}>
                <span>{event.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default EventsPage

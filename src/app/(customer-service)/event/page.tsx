'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

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
        const response = await axios.get('/api/events', {
          params: {
            size: 10, // 원하는 이벤트 개수
            page: 1, // 원하는 페이지 번호
          },
        })
        setEvents(response.data.events)
      } catch (err) {
        setError('Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

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

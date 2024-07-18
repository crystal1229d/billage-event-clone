import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const events = [
  { id: '1', name: 'Event 1', description: 'Details about Event 1' },
  { id: '2', name: 'Event 2', description: 'Details about Event 2' },
  { id: '3', name: 'Event 3', description: 'Details about Event 3' },
]

const EventDetailPage = () => {
  const router = useRouter()
  const { eventId } = router.query
  const event = events.find((e) => e.id === eventId)

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <Link href="/event/events">
        <span>Back to events list</span>
      </Link>
    </div>
  )
}

export default EventDetailPage

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import styles from './page.module.css';
import { Event } from '@/types';

interface PageProps {
  params: { 
    eventId: number 
  }
}

function EventDetailPage({ params: { eventId  }}: PageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/eventApi/event/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        setEvent(data.data);
      } catch (err) {
        setError('Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <div className={styles['product-wrap']}>
      <Image src={`https://s3.ap-northeast-2.amazonaws.com/image.village/${event.pc_img}`} alt={event.title} width={844} height={2374} style={{ verticalAlign: 'bottom' }} />
    </div>
  );
}

export default EventDetailPage

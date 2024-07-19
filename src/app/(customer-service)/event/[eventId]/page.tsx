'use client'

import Image from 'next/image';

import styles from './page.module.css';
import { Event } from '@/types';
import useFetchData from '@/hooks';
import { BASE_IMAGE_URL } from '@/constants';

interface PageProps {
  params: { 
    eventId: number 
  }
}

function EventDetailPage({ params: { eventId  }}: PageProps) {
  const { data: event, loading, error } = useFetchData<Event>(`/eventApi/event/${eventId}`);

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
      <Image src={`${BASE_IMAGE_URL}/${event.pc_img}`} alt={event.title} width={844} height={2374} style={{ verticalAlign: 'bottom' }} />
    </div>
  );
}

export default EventDetailPage

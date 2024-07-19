'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

import styles from './page.module.css';
import { formatDate } from '@/util';
import { Event } from '@/types';

const isOngoing = (start: number, end: number) => {
  const now = new Date().getTime();
  return now >= start && now <= end;
};

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
          events.map((event) => {
            const { event_idx: idx, start_date, end_date, pc_thumbnail_img, title } = event 
            const ongoing = isOngoing(start_date, end_date);

            return (
              <div key={idx} className={styles.product}>
                <Link href={`/event/${idx}`} style={{ backgroundImage: `url(${`https://s3.ap-northeast-2.amazonaws.com/image.village/${pc_thumbnail_img}`})` }} />
                <div className={styles['product-content']}>
                  <h3 title={event.title}>
                    <span className={`${styles.badge} ${ongoing ? styles.blue : styles.red}`}>
                      {ongoing ? '진행중' : '종료'}
                    </span>
                    <br />
                    {title}
                  </h3>
                  <p>
                    <span>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </span>
                    <span>{`${formatDate(start_date)} ~ ${formatDate(end_date)}`}</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default EventsPage

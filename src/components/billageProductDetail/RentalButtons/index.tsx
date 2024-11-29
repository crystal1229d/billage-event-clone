'use client'

import { GooglePlayStoreUrl } from '@/constants'
import { Fragment, useState } from 'react'
import styles from './RentalButtons.module.css'
import RentalCalendar from '../RentalCalendar'

export default function RentalButtons() {
  const today = new Date()
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({ from: today, to: today })
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false)
  const handleDateChange = (range: { from: Date; to: Date }) => {
    setSelectedRange(range)
  }

  return (
    <div className={styles['rental-wrapper']}>
      <button
        className={styles['btn-calendar']}
        onClick={() => setIsCalendarVisible(true)}
      >
        대여 캘린더
      </button>
      <button
        className={styles['btn-rent']}
        onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
      >
        대여하기
      </button>

      {isCalendarVisible && (
        <RentalCalendar
          onDateChange={handleDateChange}
          onClose={() => setIsCalendarVisible(false)}
        />
      )}
    </div>
  )
}

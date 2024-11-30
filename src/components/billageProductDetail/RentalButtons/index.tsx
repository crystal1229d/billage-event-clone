'use client'

import { useState } from 'react'
import { GooglePlayStoreUrl } from '@/constants'
import RentalCalendar from '../RentalCalendar'
import styles from './RentalButtons.module.css'
import BaseButton from '@/components/common/BaseButton'

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
      <BaseButton
        type="bordered"
        className={styles['rental-button']}
        onClick={() => setIsCalendarVisible(true)}
      >
        대여 캘린더
      </BaseButton>
      <BaseButton
        className={styles['rental-button']}
        type="filled"
        onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
      >
        대여하기
      </BaseButton>

      {isCalendarVisible && (
        <RentalCalendar
          onDateChange={handleDateChange}
          onClose={() => setIsCalendarVisible(false)}
        />
      )}
    </div>
  )
}

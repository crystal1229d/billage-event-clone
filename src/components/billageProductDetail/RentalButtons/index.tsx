'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { GooglePlayStoreUrl } from '@/constants'
import { useState } from 'react'
import { ko } from 'date-fns/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './RentalButtons.module.css'

export default function RentalButtons() {
  const today = new Date()
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({ from: today, to: today })
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  return (
    <div className={styles['rental-wrapper']}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button className={styles['btn-calendar']}>대여 캘린더</button>
        </PopoverTrigger>
        <PopoverContent className={styles['calendar-content']} align="start">
          <div className={styles['calendar-header']}>
            <span className={styles['calendar-title']}>대여 캘린더</span>
            <button
              className={styles['close-button']}
              aria-label="Close"
              onClick={() => setIsPopoverOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={(range) => setSelectedRange(range)}
            disabled={(date) => date <= new Date()}
            locale={ko}
            initialFocus
            className={styles['calendar']}
          />
          <div className={styles['calendar-footer']}>
            <button
              className={styles['btn-rent-small']}
              onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
            >
              선택한 기간으로 대여하기
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <button
        className={styles['btn-rent']}
        onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
      >
        대여하기
      </button>
    </div>
  )
}

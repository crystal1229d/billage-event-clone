'use client'

import Calendar from 'react-calendar'
import { GooglePlayStoreUrl } from '@/constants'
import { Value, Range } from 'react-calendar/dist/esm/shared/types.js'
import CloseButton from '@/common/CloseButton'
import styles from './RentalCalendar.module.css'

interface Props {
  onDateChange: (range: { from: Date; to: Date }) => void
  onClose: () => void
}

export default function RentalCalendar({ onDateChange, onClose }: Props) {
  const dateChangeHandler = (
    value: Value | Range<Value>,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (Array.isArray(value) && value[0] && value[1]) {
      onDateChange({ from: value[0] as Date, to: value[1] as Date })
    }
  }

  const formatCalendarDay = (
    locale: string | undefined,
    date: Date,
  ): string => {
    const day = date.getDate()
    return day < 10 ? `0${day}` : `${day}`
  }

  return (
    <div className={styles['background']}>
      <div className={styles['calendar-wrapper']}>
        <div className={styles['calendar-header']}>
          <span className={styles['calendar-title']}>대여 캘린더</span>
          <CloseButton onClick={onClose} />
        </div>

        <Calendar
          onChange={dateChangeHandler}
          formatDay={formatCalendarDay}
          className={styles['react-calendar']}
          locale="ko"
          selectRange={true}
          minDate={new Date()}
          showNeighboringMonth={true}
          minDetail="year"
        />

        <div className={styles['calendar-footer']}>
          <button
            className={styles['btn-rent-small']}
            onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
          >
            선택한 기간으로 대여하기
          </button>
        </div>
      </div>
    </div>
  )
}

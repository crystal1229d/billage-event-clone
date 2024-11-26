'use client'

import { GooglePlayStoreUrl } from '@/constants'
import styles from './RentalButtons.module.css'

export default function RentalButtons() {
  return (
    <div className={styles['rental-wrapper']}>
      <button className={styles['btn-calendar']}>대여 캘린더</button>
      <button
        className={styles['btn-rent']}
        onClick={() => window.open(GooglePlayStoreUrl, '_blank')}
      >
        대여하기
      </button>
    </div>
  )
}

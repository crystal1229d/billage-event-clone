'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import GooglePlayButton from '@/components/common/GooglePlayButton'
import AppStoreButton from '@/components/common/AppStoreButton'
import styles from './AboutBanner.module.css'

export default function AboutBanner() {
  const pathname = usePathname()

  if (pathname !== '/') return null

  return (
    <div className={`${styles['page1']}`}>
      <div className={`${styles['info1 sb']}`}>
        <div>
          <h1>
            지역기반
            <br />
            대여 플랫폼 빌리쥐
          </h1>
          <div className={`${styles['info1 btn-box']}`}>
            <GooglePlayButton />
            <AppStoreButton />
          </div>
        </div>
        <div className={`${styles['info1-img']}`}>
          <Image
            src="/assets/images/img_content_visual.webp"
            alt="빌리쥐 소개"
            width={408}
            height={381}
          />
        </div>
      </div>
    </div>
  )
}

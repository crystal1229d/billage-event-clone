'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import { BANNERS } from '@/data'
import styles from './UpperBanner.module.css'

export default function UpperBanner() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  return (
    <div className={`${styles['upper-banner']}`}>
      <div className={styles.infoList}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          loop={true}
          onSwiper={setSwiper}
          navigation={{
            prevEl: `.${styles['swiper-button-prev']}`,
            nextEl: `.${styles['swiper-button-next']}`,
          }}
        >
          {BANNERS.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className={styles.banner}>
                <div>
                  <Image
                    src={banner.imageSrc}
                    alt={banner.alt}
                    width={570}
                    height={456}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2>{banner.title}</h2>
                  <h3>{banner.description}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {swiper && (
          <div className={`${styles['swiper-buttons']}`}>
            <div className={`${styles.direction}`}>
              <button onClick={() => swiper?.slidePrev()}>
                <Image
                  src="/assets/images/icon-left.png"
                  alt="left arrow"
                  width={40}
                  height={40}
                  loading="lazy"
                />
              </button>
              <button onClick={() => swiper?.slideNext()}>
                <Image
                  src="/assets/images/icon-right.png"
                  alt="right arrow"
                  width={40}
                  height={40}
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

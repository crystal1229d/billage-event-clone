'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import Image from 'next/image'
import styles from './UpperBanner.module.css'
import { useState } from 'react'

export default function UpperBanner() {
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  return (
    <div className={`${styles['upper-banner']}`}>
      <div className={styles.infoList}>
        {/* Swiper */}
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
          <SwiperSlide>
            <div className={styles.banner}>
              <div>
                <Image
                  src="/assets/images/about-list-1.png"
                  alt="banner 1"
                  width={570}
                  height={456}
                />
              </div>
              <div>
                <h2>구매 전에 경험하자!</h2>
                <h3>사지 말고 빌려 쓰세요, 사기 전에 빌려 쓰세요.</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.banner}>
              <div>
                <Image
                  src="/assets/images/about-list-2.png"
                  alt="banner 2"
                  width={570}
                  height={456}
                />
              </div>
              <div>
                <h2>잠깐, 필요한 물건 중고거래 대신 빌려 쓰자!</h2>
                <h3>번거로운 중고거래 대신 쉽게 빌려서 사용해 보세요.</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.banner}>
              <div>
                <Image
                  src="/assets/images/about-list-3.png"
                  alt="banner 3"
                  width={570}
                  height={456}
                />
              </div>
              <div>
                <h2>안 쓰는 물건 빌려주고 용돈 벌자!</h2>
                <h3>공간만 차지하는 내 물건들 렌탈료 받고 빌려줘 보세요.</h3>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Swiper Buttons */}
        <div className={`${styles['swiper-buttons']}`}>
          <div className={`${styles.direction}`}>
            <button onClick={handlePrev}>
              <Image
                src="/assets/images/icon-left.png"
                alt="left arrow"
                width={40}
                height={40}
              />
            </button>
            <button onClick={handleNext}>
              <Image
                src="/assets/images/icon-right.png"
                alt="right arrow"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

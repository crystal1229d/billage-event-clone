'use client'

import { useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { RentalProductDetail } from '@/types/rental-product'
import styles from './ProductImages.module.css'

interface Props {
  images: RentalProductDetail['images']
}

export default function ProductImages({ images }: Props) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  return (
    <div className={styles['wrapper']}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        loop={true}
        onSwiper={setSwiper}
        pagination={{
          dynamicBullets: true,
          clickable: false,
        }}
      >
        {images.map(({ imageUrl, imageSeq }) => (
          <SwiperSlide key={imageSeq} style={{ width: '844px' }}>
            <div
              className={styles['slide-img']}
              style={{
                backgroundImage: `url(${`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}image/${imageUrl}`})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

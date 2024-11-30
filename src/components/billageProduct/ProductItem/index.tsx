'use client'

import { formatNumber } from '@/utils'
import { useRouter } from 'next/navigation'
import { RentalProduct } from '@/types/rental-product'
import NextImage from '@/common/NextImage'
import Icon from '@/common/Icon'
import styles from './ProductItem.module.css'

interface Props {
  product: RentalProduct
}

export default function ProductItem({ product }: Props) {
  const router = useRouter()
  const {
    rentalSeq,
    title,
    dailyRentalFee,
    likeCnt,
    viewCnt,
    imageUrl,
    towns,
  } = product

  const handleProductClick = () => {
    router.push(`/billageProduct/${rentalSeq}`)
  }

  return (
    <li className={styles.card}>
      <div
        className={styles['link']}
        onClick={handleProductClick}
        style={{
          backgroundImage: `url(${`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}image/${imageUrl}`})`,
        }}
      />
      <div className={styles['card-content']}>
        <h3>{title}</h3>
        <div className={styles.fee}>
          <NextImage
            src="/assets/images/chips_1day.webp"
            alt="일일대여료아이콘"
            width={45}
            height={17}
          />
          <span>{formatNumber(dailyRentalFee)}원</span>
        </div>
        <div className={styles['location-wrapper']}>
          <Icon name="mapPin" />
          <div className={styles['location-list']}>
            {towns && towns.length > 0 && (
              <span title={JSON.stringify(towns)}>{towns.join(', ')}</span>
            )}
          </div>
        </div>
        <div className={styles['count-wrapper']}>
          <div className={styles.like}>
            <Icon name="heart" />
            <span>{formatNumber(likeCnt)}</span>
          </div>
          <div className={styles.view}>
            <Icon name="eye" />
            <span>{formatNumber(viewCnt)}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

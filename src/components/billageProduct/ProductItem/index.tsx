'use client'

import { formatNumber } from '@/utils'
import { useRouter } from 'next/navigation'
import { RentalProduct } from '@/types/rental-product'
import NextImage from '@/common/NextImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faHeart,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
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
          <FontAwesomeIcon
            icon={faLocationDot}
            width="1em"
            height="1em"
            color="#777"
          />
          <div className={styles['location-list']}>
            {towns && towns.length > 0 && (
              <span title={JSON.stringify(towns)}>{towns.join(', ')}</span>
            )}
          </div>
        </div>
        <div className={styles['count-wrapper']}>
          <div className={styles.like}>
            <FontAwesomeIcon
              width="1em"
              height="1em"
              color="#777"
              icon={faHeart}
            />
            <span>{formatNumber(likeCnt)}</span>
          </div>
          <div className={styles.view}>
            <FontAwesomeIcon
              width="1em"
              height="1em"
              color="#777"
              icon={faEye}
            />
            <span>{formatNumber(viewCnt)}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

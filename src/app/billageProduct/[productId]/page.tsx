import Image from 'next/image'
import { formatNumber } from '@/utils'
import { getRentalProductDetail } from '@/services/rental-product'
import { RentalProductDetailResponse } from '@/types/rental-product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTag } from '@fortawesome/free-solid-svg-icons'

import ProductImages from '@/components/billageProductDetail/ProductImages'
import StarGrade from '@/components/billageProductDetail/StarGrade'
import RentalButtons from '@/components/billageProductDetail/RentalButtons'
import OtherProductsList from '@/components/billageProductDetail/OtherProductsList'

import styles from './page.module.css'
import UserInfo from '@/components/billageProductDetail/UserInfo'

interface Props {
  params: {
    productId: string
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = params
  const productsResponse: RentalProductDetailResponse =
    await getRentalProductDetail(+productId)
  const product = productsResponse.data

  const {
    rentalSeq,
    title,
    content,
    images,
    userNickName,
    userProfileImage,
    userStarPoint,
    grade,
    activityScore,
    maxScore,
    dailyFee,
    categoryInfo,
    towns,
  } = product

  const formattedContent = content.replace(/\n/g, '<br />')

  return (
    <div className={styles['product-detail-page']}>
      <div className={styles['product-page']}>
        <ProductImages images={images} />

        <div className={styles['product-info-wrapper']}>
          <div className={styles['user-info-wrapper']}>
            <UserInfo
              nickname={userNickName}
              profileImg={userProfileImage}
              score={activityScore}
              maxScore={maxScore}
              grade={grade}
            />
            <StarGrade point={userStarPoint} />
          </div>

          <div className={styles['product-name']}>{title}</div>

          <div className={styles['fee-wrapper']}>
            <Image
              src="/assets/images/chips_1day.webp"
              alt="일일대여료아이콘"
              width={45}
              height={17}
              loading="lazy"
            />
            <span>{formatNumber(dailyFee)}원</span>
          </div>

          <div className={styles['category-wrapper']}>
            <FontAwesomeIcon
              icon={faTag}
              width="1em"
              height="1em"
              color="#777"
            />
            {categoryInfo &&
              categoryInfo.length > 0 &&
              categoryInfo.map(({ categoryIdx, categoryName }, index) => (
                <span key={categoryIdx}>
                  {categoryName}
                  {index < categoryInfo.length - 1 && ', '}
                </span>
              ))}
          </div>

          <div>
            <p dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>

          <div className={styles['location-wrapper']}>
            <FontAwesomeIcon
              icon={faLocationDot}
              width="1em"
              height="1em"
              color="#777"
            />
            <div className={styles['location-list']}>
              {towns &&
                towns.length > 0 &&
                towns.map(({ townSeq, townName }, index) => (
                  <span key={townSeq}>
                    {townName}
                    {index < towns.length - 1 && ', '}
                  </span>
                ))}
            </div>
          </div>

          <RentalButtons />
        </div>
      </div>
      <OtherProductsList nickname={userNickName} rentalSeq={rentalSeq} />
    </div>
  )
}

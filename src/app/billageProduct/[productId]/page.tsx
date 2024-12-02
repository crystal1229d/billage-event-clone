import { formatNumber } from '@/utils'
import {
  getOtherRentalProducts,
  getRentalProductDetail,
} from '@/services/rental-product'
import {
  OtherRentalProductsListResponse,
  RentalProductDetailResponse,
} from '@/types/rental-product'
import NextImage from '@/common/NextImage'
import Icon from '@/common/Icon'

import ProductImages from '@/components/billageProductDetail/ProductImages'
import UserInfo from '@/components/billageProductDetail/UserInfo'
import StarGrade from '@/components/billageProductDetail/StarGrade'
import OtherProductsList from '@/components/billageProductDetail/OtherProductsList'
import RentalButtons from '@/components/billageProductDetail/RentalButtons'

import styles from './page.module.css'

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

  const otherProductsResponse: OtherRentalProductsListResponse =
    await getOtherRentalProducts(+rentalSeq)
  const otherProducts = otherProductsResponse.data.etcRentals

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
            <NextImage
              src="/assets/images/chips_1day.webp"
              alt="일일대여료아이콘"
              width={45}
              height={17}
            />
            <span>{formatNumber(dailyFee)}원</span>
          </div>

          <div className={styles['category-wrapper']}>
            <Icon name="tag" />
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
            <Icon name="mapPin" />
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
      <OtherProductsList
        initialProducts={otherProducts}
        nickname={userNickName}
        rentalSeq={rentalSeq}
      />
    </div>
  )
}

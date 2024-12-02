import { Metadata } from 'next'
import { formatNumber } from '@/utils'
import {
  OtherRentalProductsListResponse,
  RentalProductDetailResponse,
} from '@/types/rental-product'
import {
  getOtherRentalProducts,
  getRentalProductDetail,
} from '@/services/rental-product'
import NextImage from '@/common/NextImage'

import ProductImages from '@/components/billageProductDetail/ProductImages'
import UserProfileSection from '@/components/billageProductDetail/UserProfileSection'
import CategorySection from '@/components/billageProductDetail/CategorySection'
import LocationSection from '@/components/billageProductDetail/LocationSection'
import RentalButtons from '@/components/billageProductDetail/RentalButtons'
import OtherProductsSection from '@/components/billageProductDetail/OtherProductsSection'

import styles from './page.module.css'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = params

  const productsResponse: RentalProductDetailResponse =
    await getRentalProductDetail(+productId)
  const product = productsResponse.data

  return {
    title: `👀 저렴하게 ${product.title} 사용해보려면?`,
    description: `빌리쥐에서 하루 ${formatNumber(product.dailyFee)}원에 ${product.title}을(를) 대여하세요!`,
    openGraph: {
      title: `${product.title}`,
      description: `빌리쥐에서 하루 ${formatNumber(product.dailyFee)}원에 ${product.title}을(를) 대여하세요!`,
      images:
        product.images.length > 0 ? product.images[0].imageUrl : undefined,
    },
  }
}

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
          <UserProfileSection
            nickname={userNickName}
            profileImg={userProfileImage}
            score={activityScore}
            maxScore={maxScore}
            grade={grade}
            starPoint={userStarPoint}
          />

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

          <CategorySection categories={categoryInfo} />

          <div>
            <p dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>

          <LocationSection towns={towns} />

          <RentalButtons />
        </div>
      </div>
      <OtherProductsSection
        initialProducts={otherProducts}
        nickname={userNickName}
        rentalSeq={rentalSeq}
      />
    </div>
  )
}

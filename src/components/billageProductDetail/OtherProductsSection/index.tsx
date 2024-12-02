/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState } from 'react'
import { RentalProductDetail, OtherRentalProduct } from '@/types/rental-product'
import { getOtherRentalProducts } from '@/services/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'
import NoItem from '@/common/NoItem'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import styles from './OtherProductsList.module.css'

interface Props {
  nickname: RentalProductDetail['userNickName']
  rentalSeq: RentalProductDetail['rentalSeq']
  initialProducts: OtherRentalProduct[]
}

export default function OtherProductsSection({
  nickname,
  rentalSeq,
  initialProducts,
}: Props) {
  const [otherProducts, setOtherProducts] =
    useState<OtherRentalProduct[]>(initialProducts)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchOtherProducts = async (currentPage: number) => {
    setLoading(true)
    try {
      const response = await getOtherRentalProducts(rentalSeq, currentPage)
      if (response.data.etcRentals.length === 0) {
        setHasMore(false)
      } else {
        setOtherProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.etcRentals,
        ])
      }
    } catch (error) {
      console.error('Failed to fetch other rental products:', error)
    }
    setLoading(false)
  }

  return (
    <div className={styles['other-wrapper']}>
      <h2>{nickname} 님의 다른 대여 상품도 있어요.</h2>

      <InfiniteScroll
        loadMore={fetchOtherProducts}
        hasMore={hasMore}
        loading={loading}
        initialPage={1}
      >
        {!otherProducts || otherProducts.length === 0 ? (
          <NoItem message="등록된 대여물품이 없습니다." />
        ) : (
          <ul className={styles['products-list']}>
            {otherProducts.map((product) => (
              <ProductItem key={product.rentalSeq} product={product} />
            ))}
          </ul>
        )}
      </InfiniteScroll>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { RentalProductDetail, OtherRentalProduct } from '@/types/rental-product'
import styles from './OtherProductsList.module.css'
import { getOtherRentalProducts } from '@/services/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'

interface Props {
  nickname: RentalProductDetail['userNickName']
  userIdx: RentalProductDetail['userIdx']
}

export default function OtherProductsList({ nickname, userIdx }: Props) {
  const [otherProducts, setOtherProducts] = useState<OtherRentalProduct[]>([])

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const response = await getOtherRentalProducts(userIdx)
        setOtherProducts(response.data.etcRentals)
      } catch (error) {
        console.error('Failed to fetch other rental products:', error)
      }
    }

    fetchOtherProducts()
  }, [userIdx])

  return (
    <div className={styles['other-wrapper']}>
      <h2>{nickname} 님의 다른 대여 상품도 있어요.</h2>

      {!otherProducts || otherProducts.length === 0 ? (
        <div className={styles['no-items']}>
          <span>등록된 대여물품이 없습니다.</span>
        </div>
      ) : (
        <ul className={styles['products-list']}>
          {otherProducts.map((product) => (
            <ProductItem key={product.rentalSeq} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}

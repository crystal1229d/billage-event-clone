/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { throttle } from 'lodash'
import { RentalProductDetail, OtherRentalProduct } from '@/types/rental-product'
import { getOtherRentalProducts } from '@/services/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'
import NoItem from '@/common/NoItem'
import styles from './OtherProductsList.module.css'

interface Props {
  nickname: RentalProductDetail['userNickName']
  rentalSeq: RentalProductDetail['rentalSeq']
  initialProducts: OtherRentalProduct[]
}

export default function OtherProductsList({
  nickname,
  rentalSeq,
  initialProducts,
}: Props) {
  const [otherProducts, setOtherProducts] =
    useState<OtherRentalProduct[]>(initialProducts)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

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
        setPage(currentPage)
      }
    } catch (error) {
      console.error('Failed to fetch other rental products:', error)
    }
    setLoading(false)
  }

  const loadMore = async () => {
    if (loading || !hasMore) return
    const newPage = page + 1
    await fetchOtherProducts(newPage)
  }

  const throttledLoadMore = useCallback(throttle(loadMore, 1000), [
    page,
    loading,
    hasMore,
  ])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && !loading && hasMore) {
        throttledLoadMore()
      }
    },
    [hasMore, loading, throttledLoadMore],
  )

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '20px',
    })

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.unobserve(loadMoreRef.current)
      }
    }
  }, [handleObserver])

  return (
    <div className={styles['other-wrapper']}>
      <h2>{nickname} 님의 다른 대여 상품도 있어요.</h2>

      {!otherProducts || otherProducts.length === 0 ? (
        <NoItem message="등록된 대여물품이 없습니다." />
      ) : (
        <ul className={styles['products-list']}>
          {otherProducts.map((product) => (
            <ProductItem key={product.rentalSeq} product={product} />
          ))}
        </ul>
      )}
      {hasMore && (
        <div
          ref={loadMoreRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {loading && otherProducts.length > 0 && <p>Loading more...</p>}
    </div>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { throttle } from 'lodash'
import { RentalProductDetail, OtherRentalProduct } from '@/types/rental-product'
import styles from './OtherProductsList.module.css'
import { getOtherRentalProducts } from '@/services/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'

interface Props {
  nickname: RentalProductDetail['userNickName']
  rentalSeq: RentalProductDetail['rentalSeq']
}

// @TODO: 상세페이지에서 최초 상품데이터 로드해와서 뿌려주기
export default function OtherProductsList({ nickname, rentalSeq }: Props) {
  const [otherProducts, setOtherProducts] = useState<OtherRentalProduct[]>([])
  const [page, setPage] = useState<number>(0)
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

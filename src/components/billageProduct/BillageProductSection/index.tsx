'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { throttle, debounce } from 'lodash'
import { City, ProductCategory, RentalProduct } from '@/types/rental-product'
import ControlPanner from '../ControlPanner/ControlPanner'
import ProductItem from '../ProductItem'
import { getRentalProducts } from '@/services/rental-product'
import NoItem from '@/common/NoItem'
import styles from './BillageProductSection.module.css'

interface Props {
  products: RentalProduct[]
  cities: City[]
  categories: ProductCategory[]
}

export default function BillageProductSection({
  products,
  cities,
  categories,
}: Props) {
  const [filteredProducts, setFilteredProducts] =
    useState<RentalProduct[]>(products)
  const [currentKeyword, setCurrentKeyword] = useState<string>('')
  const [selectedTown, setSelectedTown] = useState<string>('0')
  const [selectedCity, setSelectedCity] = useState<string>('0')
  const [selectedCategory, setSelectedCategory] = useState<string>('0')

  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleFilterChange = useCallback(
    debounce(
      async (town: string, city: string, category: string, keyword: string) => {
        setSelectedTown(town)
        setSelectedCity(city)
        setSelectedCategory(category)
        setCurrentKeyword(keyword)

        setPage(0)
        setFilteredProducts([])
        setLoading(true)
        setHasMore(true)

        try {
          const response = await getRentalProducts({
            towns:
              city === '0' && town === '0'
                ? null
                : city !== '0' && town === '0'
                  ? '0'
                  : town,
            page: 0,
            categories: category && +category !== 0 ? parseInt(category) : null,
            keyword,
          })
          setFilteredProducts(response.data.rentals)
          setHasMore(response.data.rentals.length > 0)
        } catch (error) {
          console.error('Error fetching filtered products:', error)
        }

        setLoading(false)
      },
      400,
    ),
    [],
  )

  const loadMore = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const newPage = page + 1

    try {
      const response = await getRentalProducts({
        towns:
          selectedCity === '0' && selectedTown === '0'
            ? null
            : selectedCity !== '0' && selectedTown === '0'
              ? '0'
              : selectedTown,
        page: newPage,
        categories:
          selectedCategory && +selectedCategory !== 0
            ? parseInt(selectedCategory)
            : null,
        keyword: currentKeyword,
      })

      if (response.data.rentals.length === 0) {
        setHasMore(false)
      } else {
        setFilteredProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.rentals,
        ])
        setPage(newPage)
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
    }
    setLoading(false)
  }

  const throttledLoadMore = useCallback(throttle(loadMore, 1000), [
    page,
    loading,
    hasMore,
  ])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        throttledLoadMore()
      }
    },
    [throttledLoadMore],
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
    <section className={styles['product-page']}>
      <ControlPanner
        cities={cities}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {loading && filteredProducts.length === 0 ? (
        <div className={styles['loading']}>
          <p>Loading...</p>
        </div>
      ) : !filteredProducts || filteredProducts.length === 0 ? (
        <NoItem
          message={
            currentKeyword ? (
              <>
                <span className={styles['keyword']}>{currentKeyword}</span>
                (으)로 검색된 대여물품이 없어요!
              </>
            ) : (
              '등록된 대여물품이 없습니다.'
            )
          }
        />
      ) : (
        <ul className={styles['product-list']}>
          {filteredProducts.map((product) => (
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
      {loading && filteredProducts.length > 0 && <p>Loading more...</p>}
    </section>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { City, ProductCategory, RentalProduct } from '@/types/rental-product'
import { getRentalProducts } from '@/services/rental-product'
import ControlPanner from '../ControlPanner/ControlPanner'
import ProductItem from '../ProductItem'
import NoItem from '@/common/NoItem'
import InfiniteScroll from '@/common/InfiniteScroll'
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
  const [selectedCity, setSelectedCity] = useState<string>('0')
  const [selectedTown, setSelectedTown] = useState<string>('0')
  const [selectedCategory, setSelectedCategory] = useState<string>('0')
  const [currentKeyword, setCurrentKeyword] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleFilterChange = useCallback(
    async (town: string, city: string, category: string, keyword: string) => {
      setSelectedCity(city)
      setSelectedTown(town)
      setSelectedCategory(category)
      setCurrentKeyword(keyword)

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
    [],
  )

  const loadMore = async (page: number) => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const response = await getRentalProducts({
        towns:
          selectedCity === '0' && selectedTown === '0'
            ? null
            : selectedCity !== '0' && selectedTown === '0'
              ? '0'
              : selectedTown,
        page: page,
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
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
    }
    setLoading(false)
  }

  return (
    <section className={styles['product-page']}>
      <ControlPanner
        cities={cities}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loading={loading}>
        {filteredProducts.length === 0 ? (
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
      </InfiniteScroll>
    </section>
  )
}

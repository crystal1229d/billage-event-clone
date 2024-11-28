'use client'

import { useState, useEffect } from 'react'
import { City, ProductCategory, RentalProduct } from '@/types/rental-product'
import ControlPanner from '../ControlPanner/ControlPanner'
import ProductItem from '../ProductItem'
import { getRentalProducts } from '@/services/rental-product'
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

  const handleFilterChange = async (
    selectedTown: string,
    selectedCity: string,
    selectedCategory: string,
    keyword: string,
  ) => {
    setCurrentKeyword(keyword)
    try {
      const response = await getRentalProducts({
        towns:
          selectedCity === '0' && selectedTown === '0'
            ? null
            : selectedCity !== '0' && selectedTown === '0'
              ? '0'
              : selectedTown,
        page: 0,
        categories:
          selectedCategory && +selectedCategory !== 0
            ? parseInt(selectedCategory)
            : null,
        keyword,
      })
      setFilteredProducts(response.data.rentals)
    } catch (error) {
      console.error('Error fetching filtered products:', error)
    }
  }

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  return (
    <section className={styles['product-page']}>
      <ControlPanner
        cities={cities}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {!filteredProducts || filteredProducts.length === 0 ? (
        <div className={styles['no-items']}>
          <span>
            {currentKeyword ? (
              <>
                <span className={styles['keyword']}>{currentKeyword}</span>
                (으)로 검색된 대여물품이 없어요!
              </>
            ) : (
              '등록된 대여물품이 없습니다.'
            )}
          </span>
        </div>
      ) : (
        <ul className={styles['product-list']}>
          {filteredProducts.map((product) => (
            <ProductItem key={product.rentalSeq} product={product} />
          ))}
        </ul>
      )}
    </section>
  )
}

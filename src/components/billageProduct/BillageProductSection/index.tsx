'use client'

import { useEffect, useState } from 'react'
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

  const handleFilterChange = async (
    selectedTown: string | null,
    selectedCategory: string | null,
  ) => {
    try {
      const response = await getRentalProducts({
        towns: selectedTown ? selectedTown : null,
        categories: selectedCategory ? parseInt(selectedCategory) : undefined,
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
          <span>등록된 대여물품이 없습니다.</span>
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

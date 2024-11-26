import ControlPanner from '@/components/billageProduct/ControlPanner/ControlPanner'
import {
  CitiesListResponse,
  ProductCategoriesResponse,
  RentalProductsListResponse,
} from '@/types/rental-product'
import {
  getCategories,
  getCities,
  getRentalProducts,
} from '@/services/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'
import styles from './page.module.css'

export default async function BillageProductPage() {
  const productsResponse: RentalProductsListResponse = await getRentalProducts()
  const products = productsResponse.data.rentals

  const citiesResponse: CitiesListResponse = await getCities()
  const cities = citiesResponse.data.list

  const categoriesResponse: ProductCategoriesResponse = await getCategories()
  const categories = categoriesResponse.data.categoryList

  return (
    <section className={styles['product-page']}>
      <ControlPanner cities={cities} categories={categories} />

      {(!products || products.length === 0) && (
        <div className={styles['no-items']}>
          <span>등록된 대여물품이 없습니다.</span>
        </div>
      )}

      <ul className={styles['product-list']}>
        {products.map((product) => (
          <ProductItem key={product.rentalSeq} product={product} />
        ))}
      </ul>
    </section>
  )
}

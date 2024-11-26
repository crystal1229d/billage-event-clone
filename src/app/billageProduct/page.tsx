import ControlPanner from '@/components/billageProduct/ControlPanner/ControlPanner'
import { RentalProductsListResponse } from '@/types/rental-product'
import { getRentalProducts } from '@/service/rental-product'
import ProductItem from '@/components/billageProduct/ProductItem'
import styles from './page.module.css'

export default async function BillageProductPage() {
  const productsResponse: RentalProductsListResponse = await getRentalProducts()
  const products = productsResponse.data.rentals

  return (
    <section className={styles['product-page']}>
      <ControlPanner />

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

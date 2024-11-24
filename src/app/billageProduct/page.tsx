import ControlPanner from '@/components/billageProduct/ControlPanner'
import styles from './page.module.css'

export default function BillageProductPage() {
  return (
    <section className={styles['product-page']}>
      <ControlPanner />

      <div className={styles['no-items']}>
        <span>등록된 대여물품이 없습니다.</span>
      </div>
    </section>
  )
}

import { Skeleton } from '@/components/ui/skeleton'
import styles from './ProductsSkeleton.module.css'

export default function ProductsSkeleton() {
  return (
    <div className={styles['skeletons-list']}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles['skeleton']}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ))}
    </div>
  )
}

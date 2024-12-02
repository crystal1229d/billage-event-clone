import { RentalProductDetail } from '@/types/rental-product'
import Icon from '@/common/Icon'
import styles from './CategorySection.module.css'

interface Props {
  categories: RentalProductDetail['categoryInfo']
}

export default function CategorySection({ categories }: Props) {
  return (
    <div className={styles['category-wrapper']}>
      <Icon name="tag" />
      {categories &&
        categories.length > 0 &&
        categories.map(({ categoryIdx, categoryName }, index) => (
          <span key={categoryIdx}>
            {categoryName}
            {index < categories.length - 1 && ', '}
          </span>
        ))}
    </div>
  )
}

import { MAX_STARS } from '@/constants'
import { RentalProductDetail } from '@/types/rental-product'
import Icon from '@/common/Icon'
import styles from './StarGrade.module.css'

interface StarGradeProps {
  point: RentalProductDetail['userStarPoint']
}

export default function StarGrade({ point }: StarGradeProps) {
  return (
    <div className={styles['stars-wrapper']}>
      {[...Array(MAX_STARS)].map((_, index) => (
        <div key={index}>
          <Icon
            name="star"
            className={
              index < Math.ceil(point)
                ? styles['star-filled']
                : styles['star-empty']
            }
          />
        </div>
      ))}
      <span>({point})</span>
    </div>
  )
}

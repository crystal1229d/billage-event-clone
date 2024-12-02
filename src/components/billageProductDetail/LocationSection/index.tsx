import { RentalProductDetail } from '@/types/rental-product'
import Icon from '@/common/Icon'
import styles from './LocationSection.module.css'

interface Props {
  towns: RentalProductDetail['towns']
}

export default function LocationSection({ towns }: Props) {
  return (
    <div className={styles['location-wrapper']}>
      <Icon name="mapPin" />
      <div className={styles['location-list']}>
        {towns &&
          towns.length > 0 &&
          towns.map(({ townSeq, townName }, index) => (
            <span key={townSeq}>
              {townName}
              {index < towns.length - 1 && ', '}
            </span>
          ))}
      </div>
    </div>
  )
}

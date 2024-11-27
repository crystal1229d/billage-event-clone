import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { MAX_STARS } from '@/constants'
import styles from './StarGrade.module.css'

interface StarGradeProps {
  point: number
}

export default function StarGrade({ point }: StarGradeProps) {
  return (
    <div className={styles['stars-wrapper']}>
      {[...Array(MAX_STARS)].map((_, index) => (
        <div key={index}>
          <FontAwesomeIcon
            icon={faStar}
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

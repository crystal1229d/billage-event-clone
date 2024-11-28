import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import styles from './UserInfo.module.css'
import { CSSProperties } from 'react'
import { RentalProductDetail } from '@/types/rental-product'

interface Props {
  nickname: RentalProductDetail['userNickName']
  profileImg: RentalProductDetail['userProfileImage']
  score: RentalProductDetail['activityScore']
  maxScore: RentalProductDetail['maxScore']
  grade: RentalProductDetail['grade']
}

export default function UserInfo({
  nickname,
  profileImg,
  score,
  maxScore,
  grade,
}: Props) {
  const scorePointStyle: CSSProperties = {
    // 반시계방향
    //   background: `conic-gradient(
    //   rgb(255, 255, 255) 0%,
    //   rgb(255, 255, 255) ${(score / maxScore) * 100}%,,
    //   rgb(85, 185, 191) ${(score / maxScore) * 100}%,,
    //   rgb(252, 209, 56) 100%
    // )`,

    // 시계방향
    background: `conic-gradient(
      rgb(252, 209, 56) 0%,
      rgb(85, 185, 191) ${(score / maxScore) * 100}%,
      rgb(255, 255, 255) ${(score / maxScore) * 100}%,
      rgb(255, 255, 255) 100%
    )`,
  }

  const scorePercentage = (score / maxScore) * 100
  const rotationDegrees = scorePercentage * 3.6

  return (
    <div className={styles['user-info']}>
      <div className={styles['score-wrapper']}>
        <div className={styles['score-point']} style={scorePointStyle}>
          <div
            className={styles['score-indicator']}
            style={{ transform: `rotate(${rotationDegrees}deg)` }}
          />
        </div>

        <Image
          src={
            profileImg
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}image/${profileImg}`
              : '/assets/images/defaultprofile.webp'
          }
          alt="profile"
          width={50}
          height={50}
          loading="lazy"
        />
      </div>
      <div>
        <div className={styles['grade-name']}>
          <FontAwesomeIcon
            icon={faLocationDot}
            width="1em"
            height="1em"
            color="#ff3855"
          />
          <span>{grade}</span>
        </div>
        <div className={styles['nickname']}>{nickname}</div>
      </div>
    </div>
  )
}

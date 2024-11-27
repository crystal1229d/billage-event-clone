import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import styles from './UserInfo.module.css'
import { CSSProperties } from 'react'

interface Props {
  nickname: string
  profileImg: string
  score: number
}

export default function UserInfo({ nickname, profileImg, score }: Props) {
  const scorePointStyle: CSSProperties = {
    // 반시계방향
    //   background: `conic-gradient(
    //   rgb(255, 255, 255) 0%,
    //   rgb(255, 255, 255) ${100 - score}%,
    //   rgb(85, 185, 191) ${100 - score}%,
    //   rgb(252, 209, 56) 100%
    // )`,

    // 시계방향
    background: `conic-gradient(
    rgb(252, 209, 56) 0%,
    rgb(85, 185, 191) ${score}%,
    rgb(255, 255, 255) ${score}%,
    rgb(255, 255, 255) 100%
  )`,
  }

  return (
    <div className={styles['user-info']}>
      <div className={styles['score-wrapper']}>
        <div className={styles['score-point']} style={scorePointStyle} />
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
          <span>도톨씨앗</span>
        </div>
        <div className={styles['nickname']}>{nickname}</div>
      </div>
    </div>
  )
}

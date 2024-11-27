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
  // 1. 백분율로 변환 (0 ~ 100)
  const percentage = Math.min(100, Math.max(0, score))

  // 2. 원형?링? 형태(conic-gradient)
  const scorePointStyle: CSSProperties = {
    background: `conic-gradient(
      #55b9bf ${percentage}%,
      #fff ${percentage}%
    )`,
  }

  return (
    <div className={styles['user-info']}>
      <div className={styles['score-wrapper']} style={scorePointStyle}>
        <Image
          src={
            profileImg
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}image/${profileImg}`
              : '/assets/images/logo.png'
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

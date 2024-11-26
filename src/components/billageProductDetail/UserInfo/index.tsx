import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import styles from './UserInfo.module.css'

interface Props {
  nickname: string
  profileImg: string
  score: number
}

export default function UserInfo({ nickname, profileImg, score }: Props) {
  return (
    <div className={styles['user-info']}>
      <div className={styles['score-wrapper']}>
        <div className={styles['score-point']}></div>
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

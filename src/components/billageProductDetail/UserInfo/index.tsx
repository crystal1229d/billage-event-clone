import styles from './UserInfo.module.css'

interface Props {
  userNickName: string
  userProfileImage: string
  userStarPoint: number
  activityScore: number
}

export default function UserInfo({
  userNickName,
  userProfileImage,
  userStarPoint,
  activityScore,
}: Props) {
  return (
    <div className={styles['user-info-wrapper']}>
      <div className={styles['user-info']}>{userNickName}</div>
      <div className={styles['stars-wrapper']}>별점</div>
    </div>
  )
}

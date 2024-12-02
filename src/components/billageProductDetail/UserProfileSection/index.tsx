import { RentalProductDetail } from '@/types/rental-product'
import StarGrade from '../StarGrade'
import UserInfo from '../UserInfo'

import styles from './UserProfile.module.css'

interface Props {
  nickname: RentalProductDetail['userNickName']
  profileImg: RentalProductDetail['userProfileImage']
  score: RentalProductDetail['activityScore']
  maxScore: RentalProductDetail['maxScore']
  grade: RentalProductDetail['grade']
  starPoint: RentalProductDetail['userStarPoint']
}

export default function UserProfileSection({
  nickname,
  profileImg,
  score,
  maxScore,
  grade,
  starPoint,
}: Props) {
  return (
    <div className={styles['user-info-wrapper']}>
      <UserInfo
        nickname={nickname}
        profileImg={profileImg}
        score={score}
        maxScore={maxScore}
        grade={grade}
      />
      <StarGrade point={starPoint} />
    </div>
  )
}

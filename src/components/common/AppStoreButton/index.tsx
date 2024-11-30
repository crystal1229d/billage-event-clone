'use client'

import { AppStoreUrl } from '@/constants'
import BaseButton from '@/common/BaseButton'
import NextImage from '@/common/NextImage'

export default function AppStoreButton() {
  const handleClick = () => {
    window.open(AppStoreUrl, '_blank')
  }

  return (
    <BaseButton onClick={handleClick}>
      <NextImage
        src={`/assets/images/iosBtn.png`}
        width={158}
        height={50}
        alt="AppStore"
      />
    </BaseButton>
  )
}

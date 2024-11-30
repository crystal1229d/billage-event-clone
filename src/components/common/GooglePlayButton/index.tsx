'use client'

import { GooglePlayStoreUrl } from '@/constants'
import BaseButton from '@/common/BaseButton'
import NextImage from '@/common/NextImage'

export default function GooglePlayButton() {
  const handleClick = () => {
    window.open(GooglePlayStoreUrl, '_blank')
  }

  return (
    <BaseButton onClick={handleClick}>
      <NextImage
        src={`/assets/images/googlePlayBtn.png`}
        width={162}
        height={50}
        alt="GooglePlay"
      />
    </BaseButton>
  )
}

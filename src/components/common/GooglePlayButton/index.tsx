'use client'

import { GooglePlayStoreUrl } from '@/constants'
import NextImage from '@/common/NextImage'

export default function GooglePlayButton() {
  const handleClick = () => {
    window.open(GooglePlayStoreUrl, '_blank')
  }

  return (
    <button onClick={handleClick}>
      <NextImage
        src={`/assets/images/googlePlayBtn.png`}
        width={162}
        height={50}
        alt="GooglePlay"
      />
    </button>
  )
}

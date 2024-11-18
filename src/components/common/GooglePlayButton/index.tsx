'use client'

import { GooglePlayStoreUrl } from '@/constants'
import Image from 'next/image'

export default function GooglePlayButton() {
  const handleClick = () => {
    window.open(GooglePlayStoreUrl, '_blank')
  }

  return (
    <button onClick={handleClick}>
      <Image
        src={`/assets/images/googlePlayBtn.png`}
        width={162}
        height={50}
        alt="GooglePlay"
      />
    </button>
  )
}

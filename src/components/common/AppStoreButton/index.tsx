'use client'

import { AppStoreUrl } from '@/constants'
import NextImage from '@/common/NextImage'

export default function AppStoreButton() {
  const handleClick = () => {
    window.open(AppStoreUrl, '_blank')
  }

  return (
    <button onClick={handleClick}>
      <NextImage
        src={`/assets/images/iosBtn.png`}
        width={158}
        height={50}
        alt="AppStore"
      />
    </button>
  )
}

'use client'

import { AppStoreUrl } from '@/data'
import Image from 'next/image'

export default function AppStoreButton() {
  const handleClick = () => {
    window.open(AppStoreUrl, '_blank')
  }

  return (
    <button onClick={handleClick}>
      <Image
        src={`/assets/images/iosBtn.png`}
        width={158}
        height={50}
        alt="AppStore"
      />
    </button>
  )
}

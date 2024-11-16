'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './Logo.module.css'

interface Props {
  with_name?: boolean
  linked?: boolean
  to?: string
}

export default function Logo({
  with_name = true,
  linked = false,
  to = '/',
}: Props) {
  const router = useRouter()

  const handleClick = () => router.push(to)

  const logoContent = (
    <div
      className={with_name ? styles.logo_with_name : styles.logo}
      onClick={linked ? handleClick : undefined}
      style={{ cursor: linked ? 'pointer' : 'default' }}
    >
      {with_name ? (
        <Image
          src="/assets/images/logo_with_name.webp"
          alt="bbillage logo"
          width={131}
          height={35}
          loading="lazy"
        />
      ) : (
        <Image
          src="/assets/images/logo.png"
          alt="bbillage logo"
          width={131}
          height={35}
          loading="lazy"
        />
      )}
    </div>
  )

  return logoContent
}

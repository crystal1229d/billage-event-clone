'use client'

import Link from 'next/link'
import NextImage from '@/common/NextImage'
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
  const logoContent = (
    <div className={with_name ? styles.logo_with_name : styles.logo}>
      <NextImage
        src={
          with_name
            ? '/assets/images/logo_with_name.webp'
            : '/assets/images/logo.png'
        }
        alt="bbillage logo"
        width={131}
        height={35}
      />
    </div>
  )

  return linked ? (
    <Link href={to} className={styles.link}>
      {logoContent}
    </Link>
  ) : (
    logoContent
  )
}

'use client'

import { usePathname } from 'next/navigation'
import { NAVIGATION } from '@/constants'
import styles from './SideNavbar.module.css'
import Link from 'next/link'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export default function SideNavbar({ isVisible, onClose }: Props) {
  const location = usePathname()
  const currentPath = NAVIGATION.find(
    (nav) => location === nav.link || location === `${nav.link}/`,
  )

  return (
    <nav
      className={`mobile ${styles['side-navbar']} ${isVisible && styles['on']}`}
    >
      <ul className={styles['side-navbar-content']}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            className={currentPath?.label === label ? styles.active : undefined}
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

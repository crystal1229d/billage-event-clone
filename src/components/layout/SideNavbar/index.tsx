'use client'

import { usePathname, useRouter } from 'next/navigation'
import { NAVIGATION } from '@/data'
import styles from './SideNavbar.module.css'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export default function SideNavbar({ isVisible, onClose }: Props) {
  const location = usePathname()
  const router = useRouter()
  const currentPath = NAVIGATION.find(
    (nav) => location === nav.link || location === `${nav.link}/`,
  )

  const handleClick = (link: string) => {
    onClose()
    router.push(link)
  }

  return (
    <nav
      className={`mobile ${styles['side-navbar']} ${isVisible && styles['on']}`}
    >
      <ul className={styles['side-navbar-content']}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            onClick={() => handleClick(link)}
            className={currentPath?.label === label ? styles.active : undefined}
          >
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { NAVIGATION } from '@/constants'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = usePathname()
  const router = useRouter()
  const currentPath = NAVIGATION.find(
    (nav) => location === nav.link || location === `${nav.link}/`,
  )
  const [selectedNav, setSelectedNav] = useState(
    currentPath ? currentPath.label : '/',
  )

  useEffect(() => {
    const updatedPath = NAVIGATION.find(
      (nav) => location === nav.link || location === `${nav.link}/`,
    )
    setSelectedNav(updatedPath ? updatedPath.label : '/')
  }, [location])

  const handleClick = (label: string, link: string) => {
    setSelectedNav(label)
    router.push(link)
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            onClick={() => handleClick(label, link)}
            className={selectedNav === label ? styles.active : undefined}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  )
}

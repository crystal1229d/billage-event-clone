'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAVIGATION } from '@/constants'
import styles from './Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  const location = usePathname()
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

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            className={selectedNav === label ? styles.active : undefined}
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

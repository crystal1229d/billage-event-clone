'use client'

import Link from 'next/link'
import styles from './Navbar.module.css'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAVIGATION } from '@/constants'

export default function Navbar() {
  const location = usePathname()

  const [selectedNav, setSelectedNav] = useState('/event')

  useEffect(() => {
    const currentPath = NAVIGATION.find((nav) => nav.link === location)
    if (currentPath) {
      setSelectedNav(currentPath.label)
    }
  }, [location])

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            onClick={() => setSelectedNav(label)}
            className={selectedNav === label ? styles.active : undefined}
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

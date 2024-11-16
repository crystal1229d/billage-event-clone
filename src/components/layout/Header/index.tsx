'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/layout/Navbar'
import Logo from '@/common/Logo'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <Logo linked={true} />
        <div className={`${styles.navbar} ${menuOpen ? styles.open : ''}`}>
          <Navbar />
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

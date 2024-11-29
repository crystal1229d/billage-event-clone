'use client'

import { useState } from 'react'
import Logo from '@/common/Logo'
import Navbar from '@/layout/Navbar'
import HambugerMenu from './HamburgerMenuButton'
import CloseButton from '@/common/CloseButton'
import SideNavbar from '@/layout/SideNavbar'
import styles from './Header.module.css'

export default function Header() {
  const [isSideNavShown, setSideNavShown] = useState(false)

  const toggleMenu = () => {
    setSideNavShown((prev) => !prev)
  }

  const closeSideNav = () => {
    setSideNavShown(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <Logo linked={true} />
        <Navbar />
        <div className={styles['navbar-button']} onClick={toggleMenu}>
          {!isSideNavShown ? <HambugerMenu /> : <CloseButton />}
        </div>
        <SideNavbar isVisible={isSideNavShown} onClose={closeSideNav} />
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link';
import Navbar from '@/layout/Navbar';

import styles from './Header.module.css';
import Logo from '@/common/Logo';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <Link href="/">
          <Logo />
        </Link>
        <Navbar />
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`${styles['mobile-menu']} ${menuOpen ? styles.open : ''}`}>
        <Navbar />
      </div>
    </header>
  );
};

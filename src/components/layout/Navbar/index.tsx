import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li>
                    <Link href="/about">
                    서비스 소개
                    </Link>
                </li>
                <li>
                    <Link href="/lend">
                    빌려드려요
                    </Link>
                </li>
                <li>
                    <Link href="/borrow">
                    빌려주세요
                    </Link>
                </li>
                <li>
                    <Link href="/event">
                    EVENT
                    </Link>
                </li>
                <li>
                    <Link href="/faq">
                    FAQ
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
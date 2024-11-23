import type { Metadata } from 'next'
import '@/styles/global.css'
import { inter } from '@/app/fonts'

import Header from '@/layout/Header'
import AboutBanner from '@/components/layout/AboutBanner'
import UpperBanner from '@/layout/UpperBanner'
import BottomBanner from '@/layout/BottomBanner'
import Footer from '@/layout/Footer'
import styles from '@/app/layout.module.css'

export const metadata: Metadata = {
  title: '빌리쥐',
  description: '지역 기반 대여 플랫폼 빌리쥐',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <main className={styles['layout-main']}>
          <AboutBanner />
          <UpperBanner />
          <div className={styles['layout-wrap']}>{children}</div>
        </main>
        <BottomBanner />
        <Footer />
      </body>
    </html>
  )
}

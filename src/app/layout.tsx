import '@/styles/global.css'
import { inter } from '@/app/fonts'

import Header from '@/layout/Header'
import AboutBanner from '@/components/layout/AboutBanner'
import UpperBanner from '@/layout/UpperBanner'
import BottomBanner from '@/layout/BottomBanner'
import Footer from '@/layout/Footer'
import styles from '@/app/layout.module.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr">
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

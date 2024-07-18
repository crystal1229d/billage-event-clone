import '@/styles/global.css'
import { inter } from '@/app/fonts'
import styles from '@/app/layout.module.css'

import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import BottomBanner from '@/layout/BottomBanner'
import UpperBanner from '@/layout/UpperBanner'

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
          <UpperBanner />
          <div className={styles['layout-wrap']}>{children}</div>
        </main>
        <BottomBanner />
        <Footer />
      </body>
    </html>
  )
}

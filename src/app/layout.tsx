import "@/styles/global.css";
import { inter } from '@/app/fonts';
import styles from "@/app/layout.module.css";

import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import BottomBanner from '@/layout/BottomBanner';
import UpperBanner from '@/layout/UpperBanner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Header />
        <UpperBanner />
        <main className={styles.layout_main}>{children}</main>
        <BottomBanner />
        <Footer />
      </body>
    </html>
  );
}

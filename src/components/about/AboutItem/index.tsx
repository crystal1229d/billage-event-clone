import { AboutGuide } from '@/types'
import Image from 'next/image'
import styles from './AboutItem.module.css'

interface Props {
  about: AboutGuide
  index: number
}

export default function AboutItem({ about, index }: Props) {
  const isEven = index % 2 === 0 // 짝수

  return (
    <div
      className={`${styles['about-item-wrapper']} ${isEven ? styles['even'] : styles['odd']}`}
    >
      <div key="content" className={styles['content-area']}>
        <Image
          src={about.icon}
          alt={about.iconAlt}
          width={56}
          height={48}
          loading="lazy"
        />
        <h1 dangerouslySetInnerHTML={{ __html: about.title }} />
        <h2 dangerouslySetInnerHTML={{ __html: about.description }} />
      </div>
      <div key="image" className={styles['image-area']}>
        <Image
          src={about.image}
          alt={about.imageAlt}
          width={408}
          height={408}
          loading="lazy"
        />
      </div>
    </div>
  )
}

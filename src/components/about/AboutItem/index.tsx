import { cn } from '@/lib/utils'
import { AboutGuide } from '@/types'
import NextImage from '@/common/NextImage'
import styles from './AboutItem.module.css'

interface Props {
  about: AboutGuide
  index: number
}

export default function AboutItem({ about, index }: Props) {
  const isEven = index % 2 === 0

  return (
    <div
      className={cn(styles['about-item-wrapper'], {
        [styles['even']]: isEven,
        [styles['odd']]: !isEven,
      })}
    >
      <div className={styles['content-area']}>
        <NextImage
          src={about.icon}
          alt={about.iconAlt}
          width={56}
          height={48}
        />
        <h1 dangerouslySetInnerHTML={{ __html: about.title }} />
        <h2 dangerouslySetInnerHTML={{ __html: about.description }} />
      </div>

      <div className={styles['image-area']}>
        <NextImage
          src={about.image}
          alt={about.imageAlt}
          width={408}
          height={408}
        />
      </div>
    </div>
  )
}

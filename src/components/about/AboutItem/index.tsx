import { AboutGuide } from '@/types'
import Image from 'next/image'

interface Props {
  about: AboutGuide
}

export default function AboutItem({ about }: Props) {
  return (
    <div>
      <div key={about.title} style={{ textAlign: 'right' }}>
        <Image
          src={about.icon}
          alt={about.iconAlt}
          width={56}
          height={48}
          loading="lazy"
        />
        <h1>{about.title}</h1>
        <h2>{about.description}</h2>
      </div>
      <div>
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

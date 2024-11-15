import Image from 'next/image'
import { getEventById } from '@/service/event'
import styles from './page.module.css'

interface Props {
  params: {
    eventId: string
  }
}

export default async function EventDetailPage({ params: { eventId } }: Props) {
  const { data: event } = await getEventById(eventId)

  return (
    <div className={styles['product-wrap']}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${event.pc_img}`}
        alt={event.title}
        width={844}
        height={2374}
        style={{ verticalAlign: 'bottom' }}
      />
    </div>
  )
}

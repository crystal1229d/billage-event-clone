import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './NoItem.module.css'

interface Props {
  message?: string | ReactNode
  filled?: boolean
  className?: string
}

export default function NoItem({ message, filled = true, className }: Props) {
  return (
    <div
      className={cn(
        styles['no-item'],
        filled ? styles['filled'] : styles['bordered'],
        className,
      )}
    >
      {typeof message === 'string' ? <span>{message}</span> : message}
    </div>
  )
}

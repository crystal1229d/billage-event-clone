'use client'

import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './BaseButton.module.css'

interface BaseButtonProps {
  onClick?: () => void
  className?: string
  children: ReactNode
  ariaLabel?: string
  type?: 'bordered' | 'filled'
}

export default function BaseButton({
  onClick,
  className,
  children,
  ariaLabel,
  type,
}: BaseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        styles.base,
        type === 'bordered' && styles.bordered,
        type === 'filled' && styles.filled,
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

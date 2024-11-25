'use client'

import { useState } from 'react'
import {
  Select as SelectBox,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectComponentProps {
  name: string
  placeholder: string
  options: SelectOption[]
  className?: string
}

export default function Select({
  name,
  placeholder,
  options,
}: SelectComponentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SelectBox name={name} onOpenChange={(open) => setIsOpen(open)}>
      <SelectTrigger className={styles['select-wrapper']} isOpen={isOpen}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectBox>
  )
}

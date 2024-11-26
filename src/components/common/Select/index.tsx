'use client'

import {
  Select as SelectBox,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './Select.module.css'

export interface SelectComponentProps<T> {
  name: string
  placeholder: string
  options: T[]
  onOpenChange?: (open: boolean) => void
  isLoading?: boolean
  className?: string
  getOptionLabel: (option: T) => string | number
  getOptionValue: (option: T) => string | number
}

export default function Select<T>({
  name,
  placeholder,
  options,
  isLoading = false,
  getOptionLabel,
  getOptionValue,
}: SelectComponentProps<T>) {
  return (
    <SelectBox name={name}>
      <SelectTrigger className={styles['select-wrapper']} isLoading={isLoading}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.length > 0 &&
          options.map((option) => {
            const value = getOptionValue(option)
            return value ? (
              <SelectItem key={value} value={value + ''}>
                {getOptionLabel(option)}
              </SelectItem>
            ) : null
          })}
      </SelectContent>
    </SelectBox>
  )
}

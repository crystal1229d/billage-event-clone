'use client'

import {
  Select as SelectBox,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import styles from './Select.module.css'
import { useState, useEffect } from 'react'

export interface SelectComponentProps<T> {
  name: string
  placeholder: string
  options: T[]
  disabled?: boolean
  className?: string
  getOptionLabel: (option: T) => string | number
  getOptionValue: (option: T) => string | number
  onValueChange?: (value: string) => void
}

export default function Select<T>({
  name,
  placeholder,
  options,
  disabled = false,
  getOptionLabel,
  getOptionValue,
  onValueChange,
}: SelectComponentProps<T>) {
  const [selectedValue, setSelectedValue] = useState<string>('0')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedValue('0')
  }, [options])

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <SelectBox
      name={name}
      value={selectedValue}
      onValueChange={handleValueChange}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger
        className={styles['select-wrapper']}
        disabled={disabled}
        isOpen={isOpen}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key="0" value="0">
          {placeholder}
        </SelectItem>
        {options &&
          options.length > 0 &&
          options.map((option) => {
            const optionValue = getOptionValue(option)
            return optionValue ? (
              <SelectItem key={optionValue} value={optionValue + ''}>
                {getOptionLabel(option)}
              </SelectItem>
            ) : null
          })}
      </SelectContent>
    </SelectBox>
  )
}

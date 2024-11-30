import React from 'react'
import { cn } from '@/lib/utils'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faTag,
  faXmark,
  faHeart,
  faEye,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import styles from './Icon.module.css'

const ICONS = {
  mapPin: faLocationDot,
  tag: faTag,
  x: faXmark,
  heart: faHeart,
  eye: faEye,
  star: faStar,
}

type IconName = keyof typeof ICONS

interface Props extends Omit<FontAwesomeIconProps, 'icon'> {
  name: IconName
  className?: string
}

export default function Icon({ name, className, ...props }: Props) {
  const icon = ICONS[name]

  if (!icon) {
    console.error(
      `Icon “${name}” does not exist in ICONS dictionary at "src/components/common/Icon/index.tsx"`,
    )
    return null
  }

  return <FontAwesomeIcon icon={icon} className={cn(className)} {...props} />
}

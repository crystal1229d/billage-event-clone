'use client'

import { ComponentProps, useState } from 'react'
import Image from 'next/image'
import cn from 'clsx'

const NextImage = ({
  src,
  alt,
  className,
  loading,
  priority,
  ...rest
}: ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : loading || 'lazy'}
      priority={priority}
      className={cn(
        className,
        'duration-200 ease-in-out',
        isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0',
      )}
      onLoad={() => setLoading(false)}
    />
  )
}

export default NextImage

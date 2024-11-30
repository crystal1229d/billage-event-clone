import { cn } from '@/lib/utils'
import BaseButton from '@/common/BaseButton'
import Icon from '@/common/Icon'

interface Props {
  className?: string
  onClick?: () => void
}

export default function CloseButton({ className, onClick }: Props) {
  return (
    <BaseButton
      onClick={onClick ? onClick : undefined}
      className={cn('text-2xl', className)}
      ariaLabel="Close"
    >
      <Icon name="x" />
    </BaseButton>
  )
}

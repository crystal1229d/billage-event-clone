import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import BaseButton from '@/common/BaseButton'

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
      <FontAwesomeIcon icon={faXmark} />
    </BaseButton>
  )
}

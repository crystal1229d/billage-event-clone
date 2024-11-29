import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  onClick?: () => void
}

export default function CloseButton({ className, onClick }: Props) {
  return (
    <button
      aria-label="Close"
      onClick={onClick ? onClick : undefined}
      className={cn('text-black cursor-pointer text-[1.5rem]', className)}
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  )
}

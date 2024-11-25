import FaqSection from '@/components/faq/FaqSection'
import { FAQ_GUIDES } from '@/constants'

export default function FaqPage() {
  return <FaqSection faqList={FAQ_GUIDES} />
}

import { FAQGuide } from '@/types'
import styles from './CategoryList.module.css'

interface Props {
  faqGuides: FAQGuide[]
  activeCategory: string
  onClickCategory: () => void
}

export default function CategoryList({
  faqGuides,
  activeCategory,
  onClickCategory,
}: Props) {
  return (
    <ul className={styles['category-wrapper']}>
      {faqGuides.map((guide: FAQGuide) => (
        <li key={guide.category}>
          <button className={styles['active-category']}>
            {guide.category}
          </button>
        </li>
      ))}
    </ul>
  )
}

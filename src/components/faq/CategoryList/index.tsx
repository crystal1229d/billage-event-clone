import { FAQGuide } from '@/types'
import styles from './CategoryList.module.css'

interface Props {
  faqGuides: FAQGuide[]
  activeCategory: string
  onClickCategory: (category: FAQGuide['category']) => void
}

export default function CategoryList({
  faqGuides,
  activeCategory,
  onClickCategory,
}: Props) {
  return (
    <ul className={styles['category-wrapper']}>
      {faqGuides.map((guide: FAQGuide) => (
        <li
          key={guide.category}
          className={`${activeCategory === guide.category ? styles['active'] : ''}`}
        >
          <button onClick={() => onClickCategory(guide.category)}>
            {guide.category}
          </button>
        </li>
      ))}
    </ul>
  )
}

'use client'

import { useState } from 'react'
import CategoryList from '../CategoryList'
import QuestionList from '../QuestionList'
import { FAQGuide } from '@/types'
import styles from './FaqSection.module.css'

interface Props {
  faqList: FAQGuide[]
}

export default function FaqSection({ faqList }: Props) {
  const [activeCategory, setActiveCategory] = useState<FAQGuide['category']>(
    faqList[0].category,
  )

  const handleCategoryClick = (category: FAQGuide['category']) => {
    setActiveCategory(category)
  }

  const activeQuestions = faqList.find(
    (guide) => guide.category === activeCategory,
  )?.questions

  return (
    <section className={styles['faq-page']}>
      <CategoryList
        faqGuides={faqList}
        activeCategory={activeCategory}
        onClickCategory={handleCategoryClick}
      />

      <QuestionList questions={activeQuestions} />
    </section>
  )
}

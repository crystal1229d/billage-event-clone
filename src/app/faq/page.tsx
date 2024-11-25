'use client'

import { FAQ_GUIDES } from '@/constants'
import styles from './page.module.css'
import CategoryList from '@/components/faq/CategoryList'
import { FAQGuide } from '@/types'
import QuestionList from '@/components/faq/QuestionList'
import { useState } from 'react'

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_GUIDES[0].category)

  const handleCategoryClick = (category: FAQGuide['category']) => {
    setActiveCategory(category)
  }
  const activeQuestions = FAQ_GUIDES.find(
    (guide) => guide.category === activeCategory,
  )?.questions

  return (
    <section className={styles['faq-page']}>
      <CategoryList
        faqGuides={FAQ_GUIDES}
        activeCategory={activeCategory}
        onClickCategory={handleCategoryClick}
      />

      <QuestionList questions={activeQuestions} />
    </section>
  )
}

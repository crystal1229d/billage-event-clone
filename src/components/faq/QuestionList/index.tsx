import { FAQGuide, QnA } from '@/types'
import styles from './QuestionList.module.css'

interface Props {
  questions?: FAQGuide['questions']
}

export default function QuestionList({ questions }: Props) {
  if (!questions || questions.length === 0) {
    return (
      <div className={styles['no-items']}>
        <span>질문이 없습니다.</span>
      </div>
    )
  }
  return (
    <div className={styles['qna-wrapper']}>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className={styles['question-item']}>
            <h3>Q. {question.question}</h3>
            <p dangerouslySetInnerHTML={{ __html: question.answer }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

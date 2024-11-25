import { FAQGuide } from '@/types'
import styles from './QuestionList.module.css'

interface Props {
  questions: FAQGuide['questions']
}

export default function QuestionList({ questions }: Props) {
  return (
    <div className={styles['qna-wrapper']}>
      <ul>
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <li key={index} className={styles['question-item']}>
              <h3>{question.question}</h3>
              <p dangerouslySetInnerHTML={{ __html: question.answer }} />
            </li>
          ))
        ) : (
          <li className={styles['no-questions']}>질문이 없습니다.</li>
        )}
      </ul>
    </div>
  )
}

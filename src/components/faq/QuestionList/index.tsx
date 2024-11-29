import { FAQGuide } from '@/types'
import NextImage from '@/common/NextImage'
import NoItem from '@/common/NoItem'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import styles from './QuestionList.module.css'

interface Props {
  questions?: FAQGuide['questions']
}

export default function QuestionList({ questions }: Props) {
  if (!questions || questions.length === 0) {
    return <NoItem filled={false} />
  }
  return (
    <div className={styles['qnalist-wrapper']}>
      <Accordion type="single" collapsible>
        {questions.map((question, index) => (
          <AccordionItem
            value={question.question}
            key={index}
            className={styles['qna-wrapper']}
          >
            <AccordionTrigger className={styles['question']}>
              <NextImage
                src="/assets/images/question.webp"
                alt="질문"
                width={41}
                height={48}
              />
              <span>{question.question}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className={styles['answer']}>
                <p dangerouslySetInnerHTML={{ __html: question.answer }} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

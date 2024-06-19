'use client'

import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { useState } from 'react'
import useQuestions from './use-questions'
import QuestionList from './question-list'
import QuestionFilter from './question-filter'

const Questions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const { questions, fetchQuestions, hasMore } = useQuestions(
    selectedCategory,
    selectedStatus,
  )

  const lastElementRef = useInfiniteScroll(fetchQuestions, hasMore)

  return (
    <div>
      <QuestionFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <QuestionList questions={questions} lastElementRef={lastElementRef} />
    </div>
  )
}

export default Questions

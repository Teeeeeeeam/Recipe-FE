import { useState, useCallback, useEffect } from 'react'
import { getQuestions } from '@/api/admin-apis'
import { QuestionInfo } from '@/types/admin'
import { debounce } from 'lodash'

const useQuestions = (
  selectedCategory: string | null,
  selectedStatus: string | null,
) => {
  const [questions, setQuestions] = useState<QuestionInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [lastId, setLastId] = useState<number | null>(null)

  const fetchQuestions = useCallback(
    debounce(async () => {
      if (!hasMore) return
      const questionCategory =
        selectedCategory === '일반'
          ? 'GENERAL_INQUIRY'
          : selectedCategory === '계정'
            ? 'ACCOUNT_INQUIRY'
            : null
      const questionStatus =
        selectedStatus === '미완료'
          ? 'PENDING'
          : selectedStatus === '완료'
            ? 'COMPLETED'
            : null
      try {
        const res = await getQuestions(lastId, questionCategory, questionStatus)
        const newQuestions = res.questions
        setQuestions((prev) =>
          lastId ? [...prev, ...newQuestions] : newQuestions,
        )
        setHasMore(res.nextPage)
        setLastId(newQuestions[newQuestions.length - 1].id)
      } catch (err) {
        console.log(err)
      }
    }, 300),
    [hasMore, lastId, selectedCategory, selectedStatus],
  )

  useEffect(() => {
    setQuestions([])
    setLastId(null)
    setHasMore(true)
    fetchQuestions()
  }, [selectedCategory, selectedStatus])

  return { questions, fetchQuestions, hasMore }
}

export default useQuestions

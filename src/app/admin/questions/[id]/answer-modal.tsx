'use client'
import { postAnswer } from '@/api/admin-apis'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AnswerModalProps {
  id: string | string[]
  onClose: () => void
}

const AnswerModal = ({ id, onClose }: AnswerModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const router = useRouter()
  const handleAnswerClick = async () => {
    if (!title.length || !content.length) {
      alert('제목과 답변 모두 입력해주세요.')
      return
    }
    if (confirm('답변을 등록하시겠습니까?')) {
      const res = await postAnswer(Number(id), title, content)
      alert('답변이 등록되었습니다.')
      router.push('/admin/questions')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 max-w-[960px] rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">답변하기</h2>
        <input
          className="w-full border p-2 rounded-lg mb-4"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
        <textarea
          className="w-full border p-2 rounded-lg mb-4"
          rows={6}
          onChange={(e) => setContent(e.target.value)}
          placeholder="답변을 입력하세요"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-150 text-white rounded hover:bg-green-100"
            onClick={handleAnswerClick}
          >
            답변하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnswerModal

'use client'
import { useRouter } from 'next/navigation'

export default function NoResult() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-gray-800">
        검색 결과가 없습니다.
      </h2>
      <p className="mt-4 text-lg text-gray-600">다른 검색어를 사용해 보세요.</p>
      <div className="mt-6 space-x-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          이전으로 돌아가기
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

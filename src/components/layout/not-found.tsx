'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">페이지를 찾을 수 없습니다.</p>
      <div className="flex mt-6 space-x-4">
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

'use client'

import { postNotice } from '@/api/admin-apis'
import ImageUploader from '@/components/common/image-uploader'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const WriteNotice = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState('')

  const router = useRouter()

  const handleFileChange = (file: File | null, imgFile: string) => {
    setFile(file)
    setImgFile(imgFile)
  }
  const handlePostNoticeSubmit = async () => {
    if (confirm('공지사항을 등록하시겠습니까?')) {
      await postNotice(title, content, file ?? null)
      alert('공지사항이 등록되었습니다.')
      router.push('/admin/notice')
    }
  }

  return (
    <form
      className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto mt-10"
      onSubmit={(e) => {
        e.preventDefault()
        handlePostNoticeSubmit()
      }}
    >
      <h2 className="text-2xl font-bold mb-6">공지사항 등록</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full p-2 border bg-gray-100 rounded-md"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="mt-4 w-full min-h-[300px] p-2 bg-gray-100 border rounded-md focus:outline-none focus:border-none focus:ring-[1.5px] focus:ring-green-100"
      />
      <ImageUploader onFileChange={handleFileChange} />
      <div className="flex mt-6 justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-100 text-white rounded-md hover:bg-blue-50 transition"
        >
          공지사항 등록
        </button>
      </div>
    </form>
  )
}

export default WriteNotice

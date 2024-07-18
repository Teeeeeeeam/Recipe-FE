'use client'

import { getNoticeDetail, updateNotice } from '@/api/admin-apis'
import ImageUploader from '@/components/common/image-uploader'
import { useParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const ModifyNotice = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState('')
  const imgRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const params = useParams()
  const noticeId = params.id

  const fetchGetNoticeDetail = async () => {
    const res = await getNoticeDetail(Number(noticeId))
    setTitle(res.noticeTitle)
    setContent(res.noticeContent)
    setImgFile(res.imgUrl)
  }
  useEffect(() => {
    fetchGetNoticeDetail()
  }, [])

  const handleFileChange = (file: File | null, imgFile: string) => {
    setFile(file)
    setImgFile(imgFile)
  }

  const handleUpdateNoticeSubmit = async () => {
    const id = Number(noticeId)
    if (confirm('공지사항을 수정하시겠습니까?')) {
      const res = await updateNotice(title, content, id, file ?? null)
      alert('공지사항이 수정되었습니다.')
      router.push('/admin/notice')
    }
  }

  return (
    <form className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">공지사항 수정</h2>
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
      <ImageUploader initialImgFile={imgFile} onFileChange={handleFileChange} />
      <div className="flex mt-4 justify-center w-full">
        <button
          type="button"
          className="px-6 py-2 bg-blue-100 text-white rounded-md hover:bg-blue-50 transition"
          onClick={handleUpdateNoticeSubmit}
        >
          공지사항 수정
        </button>
      </div>
    </form>
  )
}

export default ModifyNotice

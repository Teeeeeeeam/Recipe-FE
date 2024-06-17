'use client'

import { postNotice } from '@/api/admin-apis'
import RecipeFormInput from '@/components/common/recipe-form-input'
import { useAppSelector } from '@/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const WriteNotice = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [imgFile, setImgFile] = useState('')
  const imgRef = useRef<HTMLInputElement>(null)

  const userInfo = useAppSelector((state) => state.userInfo)

  const router = useRouter()
  const previewImg = () => {
    if (imgRef.current && imgRef.current.files) {
      const selectedFile = imgRef.current.files[0]
      setFile(selectedFile)
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImgFile(reader.result)
          }
        }
      }
    }
  }

  const handlePostNoticeSubmit = async () => {
    const id = Number(userInfo.id)
    if (confirm('공지사항을 등록하시겠습니까?')) {
      const res = await postNotice(title, content, id, file ?? null)
      alert('공지사항이 등록되었습니다.')
      router.push('/admin/notice')
    }
  }

  return (
    <form
      className="text-white"
      onSubmit={(e) => {
        e.preventDefault()
        handlePostNoticeSubmit()
      }}
    >
      <RecipeFormInput
        value={title}
        onChange={setTitle}
        placeholder="제목을 입력하세요"
        width="w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="mt-4 w-full min-h-[500px] p-2 bg-green-100"
      />
      <div className="mt-4 space-y-2">
        <div className="w-[100px] py-1 text-center bg-navy-100 rounded-full text-white">
          이미지 선택
        </div>
        <div className=" flex items-center justify-center w-full h-[160px] bcookStep">
          <div className="relative p-2">
            <Image
              src={imgFile ? imgFile : `/svg/img-box.svg`}
              alt="preview-img"
              width={0}
              height={0}
              className="w-[140px] h-[140px]"
              priority
            />
            <Image
              src={`/svg/close.svg`}
              alt="close"
              width={0}
              height={0}
              className="absolute w-[30px] h-[30px] top-0 right-0 transition-transform hover:scale-110 cursor-pointer"
              onClick={() => {
                setFile(null)
                setImgFile('')
              }}
            />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={imgRef}
          onChange={previewImg}
          className="w-full"
        />
      </div>
      <div className="flex mt-4 justify-center w-full">
        <button type="submit" className="px-4 py-2 bg-green-100 rounded-md">
          공지사항 등록
        </button>
      </div>
    </form>
  )
}

export default WriteNotice

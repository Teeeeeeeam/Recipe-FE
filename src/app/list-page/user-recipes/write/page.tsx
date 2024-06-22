'use client'

import { postingWrite } from '@/api/recipe-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PostingContent from '../posting-content'
import PostingSelect from '../posting-select'
import PostingPassword from '../posting-password'
import PostingImageUploader from '../posting-image-uploader'
import { POSTING_LEVEL, POSTING_PEOPLE, POSTING_TIME } from '../constants'

export default function Write() {
  const [thisTitle, setThisTitle] = useState<string>('')
  const [thisImage, setThisImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [thisPeople, setThisPeople] = useState<string>('')
  const [thisTime, setThisTime] = useState<string>('')
  const [thisLevel, setThisLevel] = useState<string>('')
  const [thisCont, setThisCont] = useState<string>('')
  const [thisPw, setThisPw] = useState<string>('')

  const imgRef = useRef<HTMLInputElement>(null)
  const state = useSelector((state: RootState) => state.writeRecipe)

  function submitHandler(e: any) {
    e.preventDefault()
    const accessToken = getLocalStorage('accessToken')
    async function postRecipeData() {
      try {
        const option = {
          writeReq: {
            postTitle: thisTitle,
            postContent: thisCont,
            postCookingTime: thisTime,
            postCookingLevel: thisLevel,
            postServing: thisPeople,
            recipeId: Number(state.id),
            postPassword: thisPw,
          },
          writeFile: file!,
        }
        const hasEmptyData = Object.values(option.writeReq).some(
          (value) => value === '',
        )
        if (hasEmptyData) {
          alert('양식을 모두 채워주세요')
        } else if (option.writeFile === null) {
          alert('이미지를 첨부해주세요')
        } else {
          await postingWrite(option)
          window.location.href = `/list-page/main-recipes/${state.id}`
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (accessToken) {
      postRecipeData()
    }
  }

  function uploadImg() {
    if (imgRef.current && imgRef.current.files) {
      const selectFile = imgRef.current.files[0]
      setFile(selectFile)
      if (selectFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectFile)
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setThisImage(reader.result)
          }
        }
      } else {
        setFile(null)
        setThisImage('')
      }
    }
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-[5fr_1fr] justify-between items-center gap-x-4 mb-6">
          <input
            placeholder="게시글 제목"
            onChange={(e) => setThisTitle(e.target.value)}
            className="w-full py-3 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={submitHandler}
            className="py-3 bg-blue-50 text-white rounded-md shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span>등록</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <PostingImageUploader
              imgFile={thisImage}
              previewImg={uploadImg}
              imgRef={imgRef}
              required={true}
            />
          </div>
          <div className="flex flex-col space-y-6 mb-4">
            <PostingSelect
              label="인분"
              value={thisPeople}
              onChange={(value) => setThisPeople(value)}
              options={POSTING_PEOPLE}
            />
            <PostingSelect
              label="요리시간"
              value={thisTime}
              onChange={(value) => setThisTime(value)}
              options={POSTING_TIME}
            />
            <PostingSelect
              label="난이도"
              value={thisLevel}
              onChange={(value) => setThisLevel(value)}
              options={POSTING_LEVEL}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <PostingContent
            label="게시글 내용"
            value={thisCont}
            onChange={(value) => setThisCont(value)}
          />
        </div>
        <div className="text-end">
          <PostingPassword
            label="비밀번호"
            value={thisPw}
            onChange={(value) => setThisPw(value)}
          />
        </div>
      </div>
    </div>
  )
}

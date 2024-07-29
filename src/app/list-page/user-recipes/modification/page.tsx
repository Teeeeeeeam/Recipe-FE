'use client'

import { RootState } from '@/store'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPostingDetail, postingMod } from '@/api/recipe-apis'
import { ModData } from '@/types/recipe'
import PostingImageUploader from '../posting-image-uploader'
import PostingSelect from '../posting-select'
import PostingContent from '../posting-content'
import PostingPassword from '../posting-password'
import { POSTING_LEVEL, POSTING_PEOPLE, POSTING_TIME } from '../constants'
import axios, { AxiosError } from 'axios'

export default function Mod() {
  const [modData, setModData] = useState<ModData | null>(null)
  const [thisTitle, setThisTitle] = useState<string>('')
  const [thisImage, setThisImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [thisPeople, setThisPeople] = useState<string>('')
  const [thisTime, setThisTime] = useState<string>('')
  const [thisLevel, setThisLevel] = useState<string>('')
  const [thisCont, setThisCont] = useState<string>('')
  const [thisPw, setThisPw] = useState<string>('')

  const postIdForMod = useSelector((state: RootState) => state.modRecipe)
  const imgRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (modData) {
      setThisTitle(modData.postTitle)
      setThisImage(modData.postImageUrl)
      setThisPeople(modData.postServing)
      setThisTime(modData.postCookingTime)
      setThisLevel(modData.postCookingLevel)
      setThisCont(modData.postContent)
    }
  }, [modData])

  async function getData() {
    try {
      if (postIdForMod) {
        const result = await getPostingDetail(postIdForMod)
        setModData(result.data.post)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function submitHandler(e: any) {
    e.preventDefault()
    try {
      if (postIdForMod) {
        const option = {
          modReq: {
            postContent: thisCont,
            postTitle: thisTitle,
            postServing: thisPeople,
            postCookingTime: thisTime,
            postCookingLevel: thisLevel,
            postPassword: thisPw,
          },
          modFile: file,
        }
        await postingMod(postIdForMod, option)
        alert('수정 완료')
        window.location.href = `/list-page/user-recipes/${postIdForMod}`
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const statusCode = axiosError.response.status
          const res = axiosError.response.data as {
            success: boolean
            message: string
            data?: any
          }
          if (statusCode === 400) {
            const errorMessages = Object.values(res.data)
            alert(errorMessages.join(' \n'))
          }
        }
      }
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
            value={thisTitle}
            onChange={(e) => setThisTitle(e.target.value)}
            className="w-full py-3 px-4 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="button"
            onClick={submitHandler}
            className="py-3 bg-blue-50 text-white rounded-md shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span>수정</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <PostingImageUploader
              imgFile={thisImage}
              previewImg={uploadImg}
              imgRef={imgRef}
              required={false}
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

'use client'

import { postingWrite } from '@/api/recipe-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PostingContent from '../posting-content'
import PostingSelect from '../posting-select'
import PostingPassword from '../posting-password'
import PostingImageUploader from '../posting-image-uploader'
import { POSTING_LEVEL, POSTING_PEOPLE, POSTING_TIME } from '../constants'
import axios, { AxiosError } from 'axios'

interface SelectedRecipe {
  id: number
  title: string
}

export default function Write() {
  const [thisTitle, setThisTitle] = useState<string>('')
  const [thisImage, setThisImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [thisPeople, setThisPeople] = useState<string>('')
  const [thisTime, setThisTime] = useState<string>('')
  const [thisLevel, setThisLevel] = useState<string>('')
  const [thisCont, setThisCont] = useState<string>('')
  const [thisPw, setThisPw] = useState<string>('')
  const [thisRecipeId, setThisRecipeId] = useState<number>(0)
  const [selectedRecipe, setSelectedRecipe] = useState<SelectedRecipe | null>(
    null,
  )

  const imgRef = useRef<HTMLInputElement>(null)
  const state = useSelector((state: RootState) => state.writeRecipe)

  useEffect(() => {
    if (typeof state.id === 'number') {
      setThisRecipeId(state.id)
    } else if (selectedRecipe) {
      setThisRecipeId(selectedRecipe.id)
    }
  }, [state, selectedRecipe])

  async function postRecipeData() {
    try {
      const option = {
        writeReq: {
          postTitle: thisTitle,
          postContent: thisCont,
          postCookingTime: thisTime,
          postCookingLevel: thisLevel,
          postServing: thisPeople,
          recipeId: thisRecipeId,
          postPassword: thisPw,
        },
        writeFile: file!,
      }
      await postingWrite(option)
      window.location.href = state.direct
        ? `/list-page/main-recipes/${thisRecipeId}`
        : '/list-page/user-recipes'
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
          } else if (statusCode === 500) {
            alert(res.message + ' \n다시 시도해주세요')
          }
        }
      }
    }
  }

  function submitHandler(e: any) {
    e.preventDefault()
    const accessToken = getLocalStorage('accessToken')
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

  function openRecipePopup() {
    const popup = window.open(
      '/search-recipe',
      'SearchRecipe',
      'width=500,height=600',
    )
    // 팝업 창에서 메시지를 받는 이벤트 리스너
    window.addEventListener('message', (e) => {
      if (popup && e.data.type === 'RECIPE_SELECTED') {
        setSelectedRecipe(e.data.recipe)
        popup.close()
      } else {
        setSelectedRecipe(null)
      }
    })
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-[5fr_1fr] justify-between items-center gap-x-4 mb-6">
          <input
            type="text"
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
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={state.title || selectedRecipe?.title || ''}
            readOnly
            className="w-[50%] py-2 px-3 rounded-md"
            placeholder="레시피를 검색해주세요"
          />
          <button
            onClick={() => openRecipePopup()}
            className="rounded-md ml-1 px-1 py-2 bg-blue-50 text-white"
          >
            검색
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

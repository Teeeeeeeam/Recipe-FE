'use client'

import { postUserWrite } from '@/api/recipe-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export interface FormData {
  [key: string]: PostDataType | string
}
interface UserType {
  id: number | undefined
  loginId: string | undefined
  nickName: string | undefined
  loginType: string | undefined
}
interface PostDataType {
  postTitle: string
  postContent: string
  postCookingTime: string
  postCookingLevel: string
  postServing: string
  memberId: number | undefined
  recipe_id: any
  postPassword: string
}

export default function Write() {
  const [thisTitle, setThisTitle] = useState<string>('')
  const [thisImage, setThisImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [thisPeople, setThisPeople] = useState<number>(0)
  const [thisTime, setThisTime] = useState<number>(0)
  const [thisLevel, setThisLevel] = useState<string>('')
  const [thisCont, setThisCont] = useState<string>('')
  const [thisPw, setThisPw] = useState<string>('')

  const imgRef = useRef<HTMLInputElement>(null)
  const state = useSelector((state: RootState) => state.writeRecipe)
  const userInfo = useSelector((state: RootState) => state.userInfo)
  function submitHandler(e: any) {
    e.preventDefault()
    const accessToken = getLocalStorage('accessToken')
    const postData = {
      postTitle: thisTitle,
      postContent: thisCont,
      postCookingTime: `${thisTime}분`,
      postCookingLevel: thisLevel,
      postServing: `${thisPeople}인분`,
      memberId: userInfo.id,
      recipe_id: state.id,
      postPassword: thisPw,
    }
    const postFile = file
    async function postRecipeData() {
      try {
        await postUserWrite('/api/user/posts', postData, postFile)
        window.location.href = `/list-page/main-recipes/${state.id}`
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
      }
    }
  }

  return (
    <div className="space-y-10">
      <form className="relative">
        <fieldset className="flex justify-between text-center gap-x-2 text-white mb-5">
          <input
            placeholder="제목 입력"
            onChange={(e) => setThisTitle(e.target.value)}
            className="max-w-[360px] w-full py-3 pl-2 bg-green-100 rounded-md"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-100 hover:bg-green-150 rounded-md"
            onClick={(e) => submitHandler(e)}
          >
            등록
          </button>
        </fieldset>
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 mb-5">
          <div className="space-y-2">
            <div className="flex items-center justify-center w-full  border">
              <Image
                src={thisImage ? thisImage : `/svg/img-box.svg`}
                alt="이미지 미리보기"
                width={180}
                height={180}
                className="w-1/5"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              onChange={uploadImg}
              className="w-full"
              required
            />
          </div>
          <ul className="flex flex-col items-center justify-center text-white gap-y-2">
            <li className="flex gap-x-2">
              <label className="w-[100px] py-1 text-center bg-green-100 rounded-full">
                인분
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setThisPeople(Number(e.target.value))
                }}
                className="w-[140px] py-1 pl-4 bg-green-100 rounded-full"
                placeholder="숫자만 입력"
                required
              />
            </li>
            <li className="flex gap-x-2">
              <label className="w-[100px] py-1 text-center bg-green-100 rounded-full">
                요리시간
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setThisTime(Number(e.target.value))
                }}
                className="w-[140px] py-1 pl-4 bg-green-100 rounded-full"
                placeholder="숫자만 입력"
                required
              />
            </li>
            <li className="flex gap-x-2">
              <label className="w-[100px] py-1 text-center bg-green-100 rounded-full">
                난이도
              </label>
              <div className="w-[140px] flex justify-between items-center">
                <span>상</span>
                <input
                  type="radio"
                  name="level"
                  value="상"
                  onChange={(e) => setThisLevel(e.target.value)}
                  className=" py-1 pl-4 bg-green-100 rounded-full"
                  required
                />
                <span>중</span>
                <input
                  type="radio"
                  name="level"
                  value="중"
                  onChange={(e) => setThisLevel(e.target.value)}
                  className=" py-1 pl-4 bg-green-100 rounded-full"
                  required
                />
                <span>하</span>
                <input
                  type="radio"
                  name="level"
                  value="초"
                  onChange={(e) => setThisLevel(e.target.value)}
                  className=" py-1 pl-4 bg-green-100 rounded-full"
                  required
                />
              </div>
            </li>
            <li className="w-[250px] py-1 bg-green-100 rounded-full text-center">
              {state ? state.title : '다시 시도해주세요'}
            </li>
          </ul>
        </fieldset>
        <fieldset className="text-center">
          <div className="w-10/12 mx-auto">
            <textarea
              className="w-full h-60"
              onChange={(e) => setThisCont(e.target.value)}
              required
            ></textarea>
          </div>
        </fieldset>
        <fieldset>
          <div className="w-10/12 mx-auto text-end">
            <label>비밀번호</label>
            <input
              type="text"
              onChange={(e) => setThisPw(e.target.value)}
              className="text-center"
              placeholder="게시글 비밀번호"
              required
            />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

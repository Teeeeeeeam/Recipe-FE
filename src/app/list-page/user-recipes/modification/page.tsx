'use client'

import { RootState } from '@/store'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DetailUserRecipe } from '../[id]/page'
import Image from 'next/image'
import { postUserMod } from '@/api/recipe-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { useRouter } from 'next/navigation'

export interface UpdateData {
  postContent: string
  postTitle: string
  postServing: string
  postCookingTime: string
  postCookingLevel: string
  postPassword: string
}

export default function Mod() {
  const state = useSelector(
    (state: RootState) => state.modRecipe,
  ) as DetailUserRecipe
  const initialState = {
    people: Number(state.postServing.replace('인분', '')),
    cookingTime: Number(state.postCookingTime.replace('분', '')),
  }

  const [thisTitle, setThisTitle] = useState<string>(state.postTitle)
  const [thisImage, setThisImage] = useState<string>(state.postImageUrl)
  const [file, setFile] = useState<File | null>(null)
  const [thisPeople, setThisPeople] = useState<number>(initialState.people)
  const [thisTime, setThisTime] = useState<number>(initialState.cookingTime)
  const [thisLevel, setThisLevel] = useState<string>(state.postCookingLevel)
  const [thisCont, setThisCont] = useState<string>(state.postContent)
  const [thisPw, setThisPw] = useState<string>('')

  const imgRef = useRef<HTMLInputElement>(null)
  const route = useRouter()
  const radioOptions = [
    { label: '상', value: '상' },
    { label: '중', value: '중' },
    { label: '하', value: '초' },
  ]

  async function submitHandler(e: any) {
    e.preventDefault()
    const token = getLocalStorage('accessToken')
    const updatePostDto: UpdateData = {
      postContent: thisCont,
      postTitle: thisTitle,
      postServing: `${thisPeople}인분`,
      postCookingTime: `${thisTime}분`,
      postCookingLevel: thisLevel,
      postPassword: thisPw,
    }
    const postFile = file
    const result = await postUserMod(
      `/api/user/update/posts/${state.id}`,
      updatePostDto,
      postFile,
      token,
    )
    if (result?.status === 200) {
      route.push('/list-page/user-recipes')
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

  console.log(state)
  return (
    <div className="space-y-10">
      <form className="relative">
        <fieldset className="flex justify-between text-center gap-x-2 text-white mb-5">
          <input
            value={thisTitle!}
            placeholder="제목 입력"
            onChange={(e) => setThisTitle(e.target.value)}
            className="max-w-[360px] w-full py-3 pl-2 bg-green-100 rounded-md"
            required
          />
          <button
            type="submit"
            onClick={(e) => submitHandler(e)}
            className="px-6 py-3 bg-green-100 hover:bg-green-150 rounded-md"
          >
            완료
          </button>
        </fieldset>
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 mb-5">
          <div className="space-y-2">
            <div className="flex items-center justify-center w-full  border">
              <Image
                src={thisImage}
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
            />
          </div>
          <ul className="flex flex-col items-center justify-center text-white gap-y-2">
            <li className="flex gap-x-2">
              <label className="w-[100px] py-1 text-center bg-green-100 rounded-full">
                인분
              </label>
              <input
                type="text"
                value={thisPeople}
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
                value={thisTime}
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
              <ul className="w-[140px] flex justify-center items-center">
                {radioOptions.map((item) => {
                  return (
                    <li key={item.value} className="grow text-center">
                      <span>{item.label}</span>
                      <input
                        type="radio"
                        name="level"
                        value={item.value}
                        checked={thisLevel === item.value}
                        onChange={(e) => setThisLevel(e.target.value)}
                        className=" py-1 pl-4 bg-green-100 rounded-full"
                        required
                      />
                    </li>
                  )
                })}
              </ul>
            </li>
            <li className="w-[250px] py-1 bg-green-100 rounded-full text-center">
              {state.recipe.title}
            </li>
          </ul>
        </fieldset>
        <fieldset className="text-center">
          <div className="w-10/12 mx-auto">
            <textarea
              className="w-full h-60"
              value={thisCont}
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

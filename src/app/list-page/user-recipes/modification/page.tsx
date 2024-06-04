'use client'

import { RootState } from '@/store'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {
  UpdateData,
  getUserPostingDetail,
  postUserMod,
} from '@/api/recipe-apis'
import { useRouter } from 'next/navigation'
import { ModData } from '@/types/recipe'

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
  const route = useRouter()
  const radioOptions = [
    { label: '상', value: '상' },
    { label: '중', value: '중' },
    { label: '하', value: '초' },
  ]

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
      const thisId = String(postIdForMod)
      const result = await getUserPostingDetail('/api/user/posts/', thisId)
      const fitData = result.data.post
      fitData.postServing = fitData.postServing.replace('인분', '')
      fitData.postCookingTime = fitData.postCookingTime.replace('분', '')
      setModData(fitData)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(modData)

  async function submitHandler(e: any) {
    e.preventDefault()
    try {
      const updatePostDto: UpdateData = {
        postContent: thisCont,
        postTitle: thisTitle,
        postServing: `${thisPeople}인분`,
        postCookingTime: `${thisTime}분`,
        postCookingLevel: thisLevel,
        postPassword: thisPw,
      }
      const postFile = file
      await postUserMod(
        `/api/user/update/posts/${postIdForMod}`,
        updatePostDto,
        postFile,
      )
      window.location.href = '/list-page/user-recipes'
    } catch (error) {
      console.log(error)
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
                  setThisPeople(e.target.value)
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
                  setThisTime(e.target.value)
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
              {modData?.recipe.title}
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

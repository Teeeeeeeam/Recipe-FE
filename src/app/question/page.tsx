'use client'

import { sendQuestion } from '@/api/question-apis'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Question() {
  const [variety, setVariety] = useState<string>('')
  const [isClick, setIsClick] = useState<boolean>(false)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [thisImage, setThisImage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [agreeEmail, setAgreeEmail] = useState<boolean>(false)

  const imgRef = useRef<HTMLInputElement>(null)

  function resetForm() {
    setVariety('')
    setTitle('')
    setContent('')
    setEmail('')
    setThisImage('')
    setFile(null)
    setAgreeEmail(false)
  }

  async function submitHandler() {
    try {
      const req = {
        questionType:
          variety === 'account' ? 'ACCOUNT_INQUIRY' : 'GENERAL_INQUIRY',
        title,
        questionContent: content,
        answer: variety === 'account' ? 'EMAIL' : agreeEmail ? 'EMAIL' : 'NONE',
        answerEmail: email,
      }
      const postFile = file
      if (
        req.title === '' ||
        req.questionContent === '' ||
        req.answerEmail === ''
      ) {
        alert('모두 작성해주세요')
      } else {
        if (variety === 'general') {
          await sendQuestion('/api/user/question', req, postFile)
        }
        if (variety === 'account') {
          await sendQuestion('/api/question', req, postFile)
        }
        alert('문의사항 등록 완료!')
        setIsClick(false)
        resetForm()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isClick) {
      resetForm()
    }
  }, [isClick])

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
  useEffect(() => {
    if (file == null) {
      setThisImage('')
    }
  }, [file])

  return (
    <div className="relative">
      <div className="w-1/3 mx-auto">
        <h3 className="text-3xl text-center mb-3">문의사항</h3>
        <div className="flex flex-col justify-center sm:flex-row gap-4">
          <button
            onClick={() => {
              setVariety('general')
              setAgreeEmail(false)
              setIsClick((prev) => !prev)
            }}
            className={`px-4 py-2 border border-black text-black rounded ${variety === 'general' && 'bg-green-500 text-white'}`}
          >
            일반 문의
          </button>
          <button
            onClick={() => {
              setVariety('account')
              setIsClick((prev) => !prev)
            }}
            className={`px-4 py-2 border border-black text-black rounded ${variety === 'account' && 'bg-green-500 text-white'}`}
          >
            계정 문의
          </button>
        </div>
      </div>

      {isClick && (
        <div className="">
          <div className="bg-white my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
            <div className="flex flex-col border-b pb-4 justify-center items-center">
              <p className="font-medium">문의하기</p>
              <p className="text-sm text-gray-600">
                {variety === 'general' ? '[일반]' : '[계정]'}
              </p>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">제목</p>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">이메일</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="w-32 font-medium">답변형태</p>
              <div>
                <input
                  type="checkbox"
                  onChange={() =>
                    variety === 'account'
                      ? null
                      : setAgreeEmail((prev) => !prev)
                  }
                  checked={variety === 'account' ? true : agreeEmail}
                  placeholder="이메일을 입력해주세요"
                  className="mr-2"
                />
                <span className="text-gray-400">선택 시 이메일로 받기</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">문의내용</p>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              ></textarea>
            </div>
            <div className="flex flex-col gap-4 py-4  lg:flex-row">
              <div className="shrink-0 w-32  sm:py-4">
                <p className="mb-auto font-medium">첨부파일</p>
                <p className="text-sm text-gray-600">&#91;선택사항&#93;</p>
              </div>
              <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                <Image
                  src={thisImage ? thisImage : `/svg/img-box.svg`}
                  alt="첨부파일 이미지"
                  width={100}
                  height={100}
                  className=""
                />
                <p className="text-sm text-gray-600">이미지를 첨부해주세요</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  onChange={uploadImg}
                  className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
            </div>
            <div className="flex justify-end py-4">
              <button
                type="button"
                onClick={() => {
                  setIsClick(false)
                  setAgreeEmail(false)
                }}
                className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => submitHandler()}
                className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
              >
                보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

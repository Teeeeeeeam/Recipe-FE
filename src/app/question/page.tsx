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
        answer: variety === 'account' || agreeEmail ? 'EMAIL' : 'NONE',
        answerEmail: email,
      }
      const postFile = file
      if (variety === 'general') {
        await sendQuestion('/api/user/question', req, postFile)
      }
      if (variety === 'account') {
        await sendQuestion('/api/question', req, postFile)
      }
      setIsClick(false)
      resetForm()
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
    <>
      <div className="w-1/3 mx-auto">
        <h3 className="text-3xl text-center mb-3">문의사항</h3>
        <ul className="flex justify-around">
          <li>
            <button
              onClick={() => {
                setVariety('general')
                setIsClick(true)
              }}
              className="block py-3"
            >
              일반 문의
            </button>
          </li>
          <li>
            {' '}
            <button
              onClick={() => {
                setVariety('account')
                setIsClick(true)
              }}
              className="block py-3"
            >
              계정 문의
            </button>
          </li>
        </ul>
      </div>

      {isClick && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-10 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              문의사항 {variety === 'general' ? '[일반]' : '[계정]'}
            </p>
            <form className="flex felx-wrap flex-col">
              <ul>
                <li className="mb-3">
                  <label>제목</label>
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full"
                  />
                </li>
                <li className="mb-3">
                  <label>문의 내용</label>
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className="block w-full border"
                  ></textarea>
                </li>
                <li className="mb-3">
                  <label>이메일</label>
                  <input
                    type="email"
                    className="block w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li className="mb-3">
                  <label>이메일로 받기</label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      variety === 'account' ? null : setAgreeEmail(!agreeEmail)
                    }
                    checked={variety === 'account' ? true : undefined}
                  />
                </li>
                <li className="mb-5">
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
                </li>
              </ul>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsClick(false)
                    setAgreeEmail(false)
                  }}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => submitHandler()}
                  className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

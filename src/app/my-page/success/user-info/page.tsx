'use client'

import {
  inquiryUser,
  sendEmail,
  updateEmail,
  updateNickName,
  confirmCode,
  updatePassword,
} from '@/api/login-user-apis'
import { RootState } from '@/store'
import { UserInfo } from '@/types/user'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormInput from './form-input-for-update'
import Image from 'next/image'
import FormInputChange from './form-input-for-change'

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [mount, setMount] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [isModNickName, setIsModNicName] = useState<boolean>(false)
  const [modNickName, setModNickName] = useState<string>('')
  const [isModEmail, setIsModEmail] = useState<boolean>(false)
  const [modEmail, setModEmail] = useState<string>('')
  const [isModPw, setIsModPw] = useState<boolean>(false)
  const [modPw, setModPw] = useState('')
  const [modPwVerify, setModPwVerify] = useState('')

  // email 검증
  const [code, setCode] = useState<string>('')
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false)
  const [isVerify, setIsVerify] = useState<boolean>(false)

  const state = useSelector((state: RootState) => state.userInfo)

  useEffect(() => {
    getInquiryUserInfo()
  }, [mount])

  useEffect(() => {
    if (!toggle) {
      setIsModNicName(false)
      setIsModEmail(false)
      setIsModPw(false)
      setModNickName('')
      setModEmail('')
      setModPw('')
      setModPwVerify('')
      setCode('')
      setIsSendEmail(false)
      setIsVerify(false)
    }
  }, [toggle])

  async function getInquiryUserInfo() {
    try {
      const result = await inquiryUser()
      setUserInfo(result.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }

  async function submitUpdate() {
    try {
      if (isModNickName) {
        if (!!modNickName) {
          const option = {
            nickName: modNickName,
          }
          await updateNickName(option)
        } else {
          alert('변경할 닉네임을 입력해주세요')
          return
        }
      }
      if (isModEmail) {
        if (isSendEmail && isVerify) {
          const option = {
            email: modEmail,
            code: Number(code),
          }
          await updateEmail(option)
        } else {
          alert('이메일 인증을 먼저 완료해주세요')
          return
        }
      }
      if (isModPw) {
        if (state.loginId) {
          const option = {
            loginId: state.loginId,
            password: modPw,
            passwordRe: modPwVerify,
          }
          await updatePassword(option)
        }
      }
      setToggle(false)
      setMount((prev) => !prev)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as {
            success: boolean
            message: string
            data?: any
          }
          if (isModEmail || isModNickName) {
            alert(res.message)
          } else if (isModPw) {
            const errorMessages =
              Object.values(res.data)[0] || '사용할 수 없는 비밀번호 입니다'
            modPw !== modPwVerify ? alert(res.message) : alert(errorMessages)
          }
        }
      }
    }
  }

  async function sendingEmail() {
    try {
      const option = {
        email: modEmail,
      }
      await sendEmail(option)
      setIsSendEmail(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }
  async function verifyCode() {
    try {
      const option = {
        email: modEmail,
        code: Number(code),
      }
      const result = await confirmCode(option)
      if (result.data.isVerified) {
        if (!result.data.isExpired) {
          alert('시간이 만료되었습니다')
        } else {
          setIsVerify(true)
        }
      } else {
        alert('인증번호가 일치하지 않습니다')
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
  return (
    <>
      <div className="w-10/12 mx-auto p-4">
        <div className="mb-36">
          <h3 className="text-2xl mb-3">기본 정보</h3>
          <table className="w-full text-sm md:text-base">
            <tbody>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">이름</td>
                <td className="w-2/3">{userInfo?.username}</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">이메일</td>
                <td className="w-2/3">{userInfo?.email}</td>
                <td className="text-end">
                  {userInfo?.loginType === 'normal' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsModEmail(true)
                        setToggle(!toggle)
                      }}
                    >
                      수정
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-2xl mb-3">로그인 정보</h3>
          <table className="w-full text-sm md:text-base">
            <tbody>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">아이디</td>
                <td className="w-2/3">{state?.loginId}</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">닉네임</td>
                <td className="w-2/3">{userInfo?.nickName}</td>
                <td className="text-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModNicName(true)
                      setToggle(!toggle)
                    }}
                  >
                    수정
                  </button>
                </td>
              </tr>
              {userInfo?.loginType === 'normal' && (
                <tr className="border-b-2">
                  <td className="py-2 w-1/5">비밀번호</td>
                  <td className="w-2/3">&#42;&#42;&#42;&#42;&#42;</td>
                  <td className="text-end">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModPw(true)
                        setToggle(true)
                      }}
                    >
                      변경
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {toggle && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
          <div className="relative bg-white m-10 max-w-lg rounded-md border text-gray-800 shadow-lg min-w-[360px]">
            <p className="mt-4 pl-4 text-xl font-bold">
              {isModNickName ? '닉네임 변경' : isModEmail ? '이메일 변경' : ''}
            </p>
            <Image
              src="/svg/close.svg"
              alt="닫기"
              width={50}
              height={50}
              onClick={() => setToggle(false)}
              className="absolute right-0 top-0 m-3 h-6 w-6 cursor-pointer text-gray-400"
            />
            <div className="flex flex-col items-center px-8 py-10">
              {isModNickName && (
                <FormInput
                  title="닉네임"
                  placeholder="닉네임을 입력해주세요"
                  verify={false}
                  onChange={setModNickName}
                />
              )}
              {isModEmail && (
                <>
                  <FormInput
                    title="이메일"
                    placeholder={userInfo?.email || ''}
                    verify={true}
                    onChange={setModEmail}
                    onClick={sendingEmail}
                  />
                  {isSendEmail && (
                    <>
                      {isVerify ? (
                        <p>인증완료</p>
                      ) : (
                        <FormInput
                          title="인증번호"
                          placeholder="인증번호를 입력해주세요"
                          verify={true}
                          onChange={setCode}
                          onClick={verifyCode}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {isModPw && (
                <FormInputChange
                  onChangeFirst={setModPw}
                  onChageSecond={setModPwVerify}
                />
              )}
            </div>
            <div className="flex justify-center pb-3">
              <button
                type="button"
                onClick={() => submitUpdate()}
                className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white mr-3"
              >
                변경하기
              </button>
              <button
                type="button"
                onClick={() => setToggle(false)}
                className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
              >
                변경취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

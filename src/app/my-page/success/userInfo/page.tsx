'use client'

import {
  inquiryUser,
  sendEmail,
  updateEmail,
  updateNickName,
  confirmCode,
} from '@/api/login-user-apis'
import { getLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import { UserInfo } from '@/types/user'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [mount, setMount] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [isModNickName, setIsModNicName] = useState<boolean>(false)
  const [modNickName, setModNickName] = useState<string>('')
  const [isModEmail, setIsModEmail] = useState<boolean>(false)
  const [modEmail, setModEmail] = useState<string>('')
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
      setIsSendEmail(false)
      setIsVerify(false)
    }
  }, [toggle])

  async function getInquiryUserInfo() {
    const userId = state.loginId
    try {
      if (userId) {
        const result = await inquiryUser('/api/user/info/', userId)
        setUserInfo(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function submitUpdate() {
    try {
      if (isModNickName) {
        const options = {
          loginId: state.loginId,
          nickName: modNickName,
        }
        await updateNickName('/api/user/info/update/nickname', options)
      }
      if (isModEmail && isVerify) {
        const options = {
          email: modEmail,
          code: code,
          loginId: state.loginId,
          loginType: state.loginType,
        }
        await updateEmail('/api/user/info/update/email', options)
      }
      setToggle(false)
      setMount(!mount)
    } catch (error) {
      console.log(error)
      // 401 error 시 my-page의 비밀번호 검증으로 redirect
    }
  }

  async function sendingEmail() {
    try {
      await sendEmail('/api/search/email-confirmation/send', modEmail)
      setIsSendEmail(true)
    } catch (error) {
      console.log(error)
    }
  }
  async function verifyCode() {
    try {
      const options = {
        email: modEmail,
        code: code,
      }
      await confirmCode('/api/search/email-confirmation/check', options)
      setIsVerify(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <div className="mb-36">
          <h4 className="text-2xl mb-3">기본 정보</h4>
          <table className="w-full">
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
                        setIsModEmail(!isModEmail)
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
          <h4 className="text-2xl mb-3">로그인 정보</h4>
          <table className="w-full">
            <tbody>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">아이디</td>
                <td className="w-2/3">{state?.loginId}</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 w-1/5">닉네임</td>
                <td className="w-2/3">{userInfo?.nickName}</td>
                <td className="text-end">
                  {userInfo?.loginType === 'normal' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsModNicName(!isModNickName)
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
      </div>
      {toggle && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-10 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              {isModNickName
                ? '변경할 닉네임을 적어주세요'
                : isModEmail
                  ? '변경할 이메일을 적어주세요'
                  : ''}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-wrap flex-col"
            >
              <div className="w-full mb-4 flex justify-between ">
                <input
                  type="text"
                  onChange={(e) => {
                    isModNickName
                      ? setModNickName(e.target.value)
                      : isModEmail
                        ? setModEmail(e.target.value)
                        : null
                  }}
                  className="block pl-1"
                  placeholder={
                    isModNickName
                      ? userInfo?.nickName
                      : isModEmail
                        ? userInfo?.email
                        : ''
                  }
                />
                {isModEmail && (
                  <button
                    type="button"
                    onClick={() => sendingEmail()}
                    className="items-center"
                  >
                    확인
                  </button>
                )}
              </div>
              <div className="mb-4">
                {isSendEmail && !isVerify && (
                  <>
                    <input
                      type="text"
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="인증코드"
                    />
                    <button type="button" onClick={() => verifyCode()}>
                      인증
                    </button>
                  </>
                )}
                {isVerify && '인증 완료!'}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => submitUpdate()}
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

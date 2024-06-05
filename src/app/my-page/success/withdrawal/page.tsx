'use client'

import { doWidthdrawalUser } from '@/api/login-user-apis'
import { removeLocalStorage } from '@/lib/local-storage'
import { RootState } from '@/store'
import { getLoginInfo } from '@/store/user-info-slice'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function Withdrawal() {
  const [agree, setAgree] = useState<boolean>(false)
  const [isClick, setIsClick] = useState<boolean>(false)

  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const { loginId, loginType } = userInfo

  async function withdrawalHandler() {
    try {
      if (loginId && loginType === 'normal') {
        const nullState = {
          id: null,
          loginId: null,
          loginType: null,
          nickName: null,
          roles: null,
        }
        const options = {
          loginId,
          checkBox: agree,
        }
        await doWidthdrawalUser('/api/user/info/disconnect', options)
        alert('회원탈퇴가 완료됐습니다.')
        removeLocalStorage('accessToken')
        dispatch(getLoginInfo(nullState))
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="w-11/12 mx-auto border p-3">
        <div className="h-[40vh] overflow-y-scroll mb-3 border-y ">
          <dl className="mb-4">
            <dt className="mb-1">
              <b>회원의 탈퇴</b>
            </dt>
            <dd>
              회원은 언제든지 서비스의 "회원탈퇴" 메뉴를 이용하여 회원 탈퇴
              신청을 할 수 있으며, 회사는 이에 즉시 처리합니다. 회원 탈퇴 시
              회원의 개인정보는 관계 법령 및 개인정보처리방침에 따라 처리됩니다.
            </dd>
          </dl>
          <dl className="mb-4">
            <dt className="mb-1">
              <b>회원자격 상실</b>
            </dt>
            <dd className="mb-2">
              회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한
              또는 정지시킬 수 있습니다
            </dd>
            <dd>
              <ul>
                <li className="mb-1">
                  1. 가입 신청 시 허위 내용을 등록한 경우
                </li>
                <li className="mb-1">
                  2. 회사의 서비스 이용과 관련하여 회원이 부담하는 채무를 기일
                  내에 이행하지 않는 경우
                </li>
                <li className="mb-1">
                  3. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등
                  전자상거래 질서를 위협하는 경우
                </li>
                <li className="mb-1">
                  4. 서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에
                  반하는 행위를 하는 경우
                </li>
              </ul>
            </dd>
          </dl>
          <dl className="mb-4">
            <dt className="mb-1">
              <b>회원자격 상실의 통지</b>
            </dt>
            <dd>
              회사가 회원 자격을 제한 또는 정지시킨 후, 동일한 행위가 2회 이상
              반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우, 회사는
              회원자격을 상실시킬 수 있습니다.
            </dd>
          </dl>
          <dl className="mb-4">
            <dt className="mb-1">
              <b>회원탈퇴의 효과</b>
            </dt>
            <dd>
              회원이 탈퇴하는 경우, 회원의 개인정보는 회사의 개인정보처리방침에
              따라 처리되며, 탈퇴와 동시에 모든 데이터는 복구할 수 없는 상태로
              삭제됩니다. 단, 관계 법령에 따라 보관할 필요가 있는 경우에는 해당
              법령이 정한 기간 동안 보관됩니다.
            </dd>
          </dl>
          <dl className="">
            <dt className="mb-1">
              <b>탈퇴 후 재가입</b>
            </dt>
            <dd>
              회원이 탈퇴 후 재가입을 희망하는 경우, 탈퇴 후 30일 이내에는
              재가입이 불가능하며, 재가입 시 회사의 가입 절차를 따라야 합니다.
            </dd>
          </dl>
        </div>
        <div className="text-end">
          <label className="mr-2">동의</label>
          <input type="checkbox" onChange={() => setAgree(!agree)} />
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() =>
            agree ? setIsClick(true) : alert('약관에 동의해주세요')
          }
        >
          탈퇴하기
        </button>
      </div>

      {isClick && (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-10 py-14 rounded-md text-center">
            <p className="text-xl mb-4 font-bold text-slate-500">
              탈퇴하시겠습니까?
            </p>
            <div className="flex felx-wrap flex-col">
              <div>
                <button
                  type="button"
                  onClick={() => setIsClick(false)}
                  className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                >
                  Cancel
                </button>
                {loginType === 'normal' ? (
                  <button
                    type="button"
                    onClick={() => withdrawalHandler()}
                    className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                  >
                    Ok
                  </button>
                ) : (
                  <Link
                    href={
                      loginType === 'kakao'
                        ? ''
                        : loginType === 'naver'
                          ? ''
                          : ''
                    }
                  >
                    OK
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

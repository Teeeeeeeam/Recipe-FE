'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function MypageNav() {
  const [isNav, setIsNav] = useState<boolean>(false)
  return (
    <>
      {!isNav && (
        <p
          onClick={() => setIsNav(true)}
          className="absolute min-w-[30px] z-20"
        >
          <Image
            src="/svg/hamburger.svg"
            alt="네비게이션 조작버튼"
            width={35}
            height={35}
            className="cursor-pointer"
          />
        </p>
      )}
      {isNav && (
        <>
          <p
            onClick={() => setIsNav(false)}
            className="absolute min-w-[30px] z-20"
          >
            <Image
              src="/svg/close.svg"
              alt="네비게이션 조작버튼"
              width={35}
              height={35}
              className="cursor-pointer"
            />
          </p>
          <div className="absolute h-full flex bg-gray-200">
            <nav className="flex flex-col items-center bg-white text-gray-700 shadow h-full">
              <div className="h-16 mt-6 flex items-center justify-center w-full text-xl">
                마이페이지
              </div>
              <ul>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/user-info"
                    className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500"
                  >
                    회원정보
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/view-my-posting"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    작성한 글
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/view-recipe-likes"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    레시피 좋아요
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/view-posting-likes"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    게시글 좋아요
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/view-my-bookmark"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    즐겨찾기
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/answer"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    문의사항
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link
                    href="/my-page/success/withdrawal"
                    className="h-16 px-6 flex  justify-center items-center w-full focus:text-orange-500"
                  >
                    회원탈퇴
                  </Link>
                </li>
              </ul>
              <div className="mt-auto h-16 flex items-center w-full">
                <button className="h-16 mx-auto  flex justify-center items-center w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"></button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}

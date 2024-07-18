import Image from 'next/image'
import Link from 'next/link'
import NotifyRecent from './user/notify-recent'
import { LoginInfo } from '@/store/user-info-slice'
import React, { useState } from 'react'

interface HeaderSizeWebProps {
  isSession: boolean
  eventCount: number
  state: LoginInfo
  inputValue: string
  logOutBtn: () => void
  searchHeader: (e: any) => void
  setInputValue: (value: string) => void
  toggleProfile: boolean
  toggleNotify: boolean
  setToggleProfile: React.Dispatch<React.SetStateAction<boolean>>
  setToggleNotify: React.Dispatch<React.SetStateAction<boolean>>
}

export function HeaderSizeWeb({
  isSession,
  eventCount,
  state,
  inputValue,
  logOutBtn,
  searchHeader,
  setInputValue,
  toggleProfile,
  toggleNotify,
  setToggleProfile,
  setToggleNotify,
}: HeaderSizeWebProps) {
  return (
    <>
      {/* nav */}
      <div className="grow pl-3 md:block hidden">
        <Link
          href="/list-page/main-recipes"
          className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
        >
          레시피
        </Link>
        <Link
          href="/list-page/user-recipes"
          className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
        >
          게시글
        </Link>
        <Link
          href="/notices"
          className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
        >
          공지사항
        </Link>
        <Link
          href="/question"
          className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
        >
          문의하기
        </Link>
      </div>
      {/* input */}
      <div className="grow md:block hidden">
        <form onSubmit={searchHeader} className="relative z-50">
          <button
            type="submit"
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Image src="/svg/search.svg" alt="검색" width={30} height={30} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-11/12 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 text-gray-300 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search"
          />
        </form>
      </div>
      {/* icons */}
      <div className="grow-0 md:block hidden">
        {!isSession && (
          <button
            type="button"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  "
          >
            <Link href="/user/login">로그인</Link>
          </button>
        )}
        {isSession && (
          <div className="flex items-center">
            <NotifyRecent
              eventCount={eventCount}
              toggleNotify={toggleNotify}
              setToggleNotify={setToggleNotify}
            />
            <div className="relative">
              <p
                onClick={() => setToggleProfile((prev) => !prev)}
                className="border rounded-full py-1 px-2 cursor-pointer "
              >
                {state.roles === 'ROLE_ADMIN' && <>관</>}
                {state.roles === 'ROLE_USER' && (
                  <>{state.nickName && state.nickName[0]}</>
                )}
              </p>
              {toggleProfile && (
                <div className="absolute w-[150px] right-0 top-[46px] bg-white">
                  <ul
                    className="py-1 px-3"
                    onClick={() => setToggleProfile((prev) => !prev)}
                  >
                    <li className="py-2 hover:bg-gray-100">
                      {state.roles === 'ROLE_ADMIN' && (
                        <Link
                          href="/admin/dash-board"
                          className="block w-full text-center"
                        >
                          관리페이지
                        </Link>
                      )}
                      {state.roles === 'ROLE_USER' && (
                        <Link
                          href="/my-page"
                          className="block w-full text-center"
                        >
                          마이페이지
                        </Link>
                      )}
                    </li>
                    <li className="py-2 hover:bg-gray-100">
                      <button
                        type="button"
                        onClick={logOutBtn}
                        className="w-full"
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

interface HeaderSizeMobileProps {
  isSession: boolean
  eventCount: number
  state: LoginInfo
  inputValue: string
  logOutBtn: () => void
  searchHeader: (e: any) => void
  setInputValue: (value: string) => void
  toggleMenu: boolean
  toggleSearch: boolean
  toggleNotify: boolean
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>
  setToggleSearch: React.Dispatch<React.SetStateAction<boolean>>
  setToggleNotify: React.Dispatch<React.SetStateAction<boolean>>
}
export function HeaderSizeMobile({
  isSession,
  eventCount,
  state,
  inputValue,
  logOutBtn,
  searchHeader,
  setInputValue,
  toggleMenu,
  toggleSearch,
  toggleNotify,
  setToggleMenu,
  setToggleSearch,
  setToggleNotify,
}: HeaderSizeMobileProps) {
  return (
    <>
      {/* icons */}
      <div
        className={`${isSession ? 'w-[100px]' : 'w-[65px]'} flex justify-between items-center md:hidden`}
      >
        <button type="button" onClick={() => setToggleSearch((prev) => !prev)}>
          <Image src="/svg/search.svg" alt="검색" width={30} height={30} />
        </button>
        {isSession && (
          <NotifyRecent
            eventCount={eventCount}
            toggleNotify={toggleNotify}
            setToggleNotify={setToggleNotify}
          />
        )}
        <div className="" onClick={() => setToggleMenu((prev) => !prev)}>
          <Image
            src={toggleMenu ? '/svg/close.svg' : '/svg/hamburger.svg'}
            alt="메뉴"
            width={30}
            height={30}
          />
        </div>
      </div>
      {/* spread menu */}
      {toggleMenu && (
        <div
          onClick={() => setToggleMenu((prev) => !prev)}
          className="fixed block w-full top-[71px] left-0 bg-white shadow-md md:hidden"
        >
          <ul className="border-b">
            <li className="py-2">
              <Link
                href="/list-page/main-recipes"
                className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
              >
                레시피
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/list-page/user-recipes"
                className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
              >
                게시글
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/question"
                className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
              >
                문의하기
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/notices"
                className="font-semibold tracking-tight cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300 ml-2"
              >
                공지사항
              </Link>
            </li>
          </ul>
          <ul>
            {!isSession && (
              <li className="py-3 text-center">
                <Link href="/user/login" className="px-5">
                  로그인
                </Link>
              </li>
            )}
            {isSession && (
              <>
                <li className="py-3 text-center">
                  {state.roles === 'ROLE_ADMIN' && (
                    <Link href="/admin/dash-board">관리페이지</Link>
                  )}
                  {state.roles === 'ROLE_USER' && (
                    <Link href="/my-page">마이페이지</Link>
                  )}
                </li>
                <li className="py-3">
                  <button type="button" onClick={logOutBtn} className="w-full">
                    로그아웃
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {/* spread toggleSearch */}
      {toggleSearch && (
        <div className="w-full py-5 fixed left-0 top-[71px] block md:hidden shadow-md bg-white">
          <form
            onSubmit={searchHeader}
            className="relative z-50 w-11/12 mx-auto"
          >
            <button
              type="submit"
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Image src="/svg/search.svg" alt="검색" width={30} height={30} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md leading-5 text-gray-300 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
              placeholder="요리명 검색"
            />
          </form>
        </div>
      )}
    </>
  )
}

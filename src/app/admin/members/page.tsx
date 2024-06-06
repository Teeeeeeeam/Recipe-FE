'use client'

import { deleteMembers, getMembers } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { MemberInfo } from '@/types/admin'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

const FILTER_LIST = ['아이디', '이름', '이메일', '닉네임']

const Members = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [lastId, setLastId] = useState<number | null>(null)
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [filter, setFilter] = useState('아이디')
  const [isFilter, setIsFilter] = useState(false)
  const [deleteList, setDeleteList] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const { loginId, username, email, nickname } = searchParams

  const getMember = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getMembers(
        loginId ?? null,
        username ?? null,
        email ?? null,
        nickname ?? null,
        lastId,
      )

      const newMembers = res.memberInfos
      if (newMembers) {
        setMembers((prev) => [...prev, ...newMembers])
        setLastId(newMembers[newMembers.length - 1].id)
        setHasMore(res.nextPage)
      }
    } catch (err) {
      console.log(err)
    }
  }, [loginId, username, email, nickname, hasMore, lastId])

  const lastElementRef = useInfiniteScroll(getMember, hasMore)

  useEffect(() => {
    if (loginId && loginId.length > 0) {
      setFilter('아이디')
      setSearchInput(loginId)
    } else if (username && username.length > 0) {
      setFilter('이름')
      setSearchInput(username)
    } else if (email && email.length > 0) {
      setFilter('이메일')
      setSearchInput(email)
    } else if (nickname && nickname.length > 0) {
      setFilter('닉네임')
      setSearchInput(nickname)
    }
  }, [])

  const handleSearchSubmit = () => {
    let query = ['']
    if (filter === '아이디') {
      query = ['loginId', searchInput]
    } else if (filter === '이름') {
      query = ['username', searchInput]
    } else if (filter === '이메일') {
      query = ['email', searchInput]
    } else if (filter === '닉네임') {
      query = ['nickname', searchInput]
    }
    const queryString = new URLSearchParams([query]).toString()
    const newUrl = `/admin/members?${queryString}`
    window.location.href = newUrl
    setMembers([])
    getMember()
  }

  const handleCheckboxChange = (postId: number) => {
    setDeleteList((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    )
  }
  console.log(members)
  const handleSelectAll = () => {
    if (selectAll) {
      console.log('h')
      setDeleteList([])
    } else {
      console.log('b')
      const allIds = members.map((el) => el.id)
      setDeleteList(allIds)
    }
    setSelectAll(!selectAll)
  }

  const handleAllDeleteClick = async () => {
    if (deleteList.length > 0) {
      if (confirm('선택된 회원들을 추방 하시겠습니까?')) {
        await deleteMembers(deleteList)
        alert('해당 회원들이 추방 되었습니다.')
        location.reload()
      }
    }
  }

  const handleDeleteMemberClick = async (id: number) => {
    if (confirm('해당 회원을 추방 하시겠습니까?')) {
      await deleteMembers([id])
      alert('해당 회원이 추방 되었습니다.')
      location.reload()
    }
  }
  return (
    <div>
      <form
        className="grid grid-cols-[1fr_4fr_1fr] w-full items-center text-center gap-x-2 mb-2"
        onSubmit={(e) => {
          e.preventDefault()
          handleSearchSubmit()
        }}
      >
        <button
          type="button"
          className="flex justify-center items-center bg-green-150 h-full rounded-sm"
          onClick={() => (window.location.href = '/admin/members')}
        >
          사용자 목록
        </button>
        <div className="grid grid-cols-[2fr_7fr] items-center border">
          <div
            className="relative flex justify-center items-center gap-x-2 cursor-pointer bg-white h-full border-r"
            onClick={() => setIsFilter(!isFilter)}
          >
            <button type="button">{filter}</button>
            <Image
              src="/svg/down-arrow.svg"
              alt="down-arrow"
              width={0}
              height={0}
              className="w-4 h-4"
              priority
            />
            {isFilter && (
              <ul className="absolute top-[100%] bg-white w-full z-30">
                {FILTER_LIST.map((el) => (
                  <li
                    key={el}
                    onClick={() => {
                      setFilter(el)
                      setIsFilter(false)
                    }}
                    className="hover:bg-gray-50 border-t"
                  >
                    {el}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <AdminInput
            placeholder="사용자 검색"
            state={searchInput}
            setState={setSearchInput}
          />
        </div>
        <button
          className="bg-green-100 h-full rounded-sm hover:bg-green-150"
          type="submit"
        >
          검색
        </button>
      </form>
      <div className="bg-navy-50 p-2 text-white rounded-md">
        <ul className="grid grid-cols-[1fr_2fr_2fr_2fr_3fr_1fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
          <li className="relative flex justify-center items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="cursor-pointer"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={20}
              height={20}
              className="absolute left-[45px] cursor-pointer translate-transition hover:scale-x-110"
              onClick={handleAllDeleteClick}
              priority
            />
          </li>
          <li>이름</li>
          <li>닉네임</li>
          <li>아이디</li>
          <li>이메일</li>
          <li>관리</li>
        </ul>
        <div className="flex flex-col space-y-2 mt-2">
          {members &&
            members.map((el) => (
              <ul
                key={el.id}
                className="grid grid-cols-[1fr_2fr_2fr_2fr_3fr_1fr] text-[12px] lg:text-[16px] text-center py-4 bg-navy-100"
              >
                <li className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={deleteList.includes(el.id)}
                    onChange={() => handleCheckboxChange(el.id)}
                  />
                </li>
                <li>{el.username}</li>
                <li>{el.nickname}</li>
                <li>
                  {el.loginId.length > 16
                    ? `${el.loginId.slice(0, 16)}...`
                    : el.loginId}
                </li>
                <li>{el.email}</li>
                <li>
                  <button onClick={() => handleDeleteMemberClick(el.id)}>
                    추방
                  </button>
                </li>
              </ul>
            ))}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  )
}

export default Members

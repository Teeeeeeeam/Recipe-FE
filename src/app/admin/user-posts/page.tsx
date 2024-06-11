'use client'

import { deletePosts, deleteRecipe, getPosts } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import Image from 'next/image'

import { useState, useEffect, useCallback } from 'react'
import useCheckbox from '@/hooks/use-check-box'
import Comments from './comments'
import Link from 'next/link'
import { PostList } from '@/types/admin'

const FILTER_LIST = ['요리글 제목', '레시피 제목', '아이디']

const UserPosts = ({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) => {
  const [posts, setPosts] = useState<PostList[]>([])
  const [postId, setPostId] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [filter, setFilter] = useState('요리글 제목')
  const [isFilter, setIsFilter] = useState(false)

  const [activeCommentId, setActiveCommentId] = useState<number | null>(null)

  const handleGetCommentClick = (id: number) => {
    if (activeCommentId) {
      setActiveCommentId(null)
    } else {
      setActiveCommentId((prevId) => (prevId === id ? null : id))
    }
  }
  const { recipeTitle, postTitle, id } = searchParams

  const fetchGetPosts = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getPosts(
        postId,
        id ?? null,
        recipeTitle ?? null,
        postTitle ?? null,
      )
      const newPosts = res.posts
      const lastId = newPosts[newPosts.length - 1].id

      setPostId(lastId)
      setPosts((prev) => [...prev, ...newPosts])
      setHasMore(res.nextPage)
    } catch (error) {
      console.log(error)
    }
  }, [postId, hasMore, searchParams])

  const lastElementRef = useInfiniteScroll(fetchGetPosts, hasMore)

  const handleSearchSubmit = () => {
    let query = ['']
    if (filter === '레시피 제목') {
      query = ['recipeTitle', searchInput]
    } else if (filter === '요리글 제목') {
      query = ['postTitle', searchInput]
    } else if (filter === '아이디') {
      query = ['id', searchInput]
    }
    const queryString = new URLSearchParams([query]).toString()
    const newUrl = `/admin/user-posts?${queryString}`
    window.location.href = newUrl
    setPosts([])
    fetchGetPosts()
  }

  useEffect(() => {
    if (recipeTitle && recipeTitle.length > 0) {
      setFilter('레시피 제목')
      setSearchInput(recipeTitle)
    } else if (postTitle && postTitle.length > 0) {
      setFilter('요리글 제목')
      setSearchInput(postTitle)
    }
  }, [])

  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleSelectAll,
    handleAllDeleteClick,
    handleDeleteClick,
  } = useCheckbox()
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
          onClick={() => (window.location.href = '/admin/user-posts')}
        >
          요리글 목록
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
            placeholder="요리글 정보 입력"
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
        <ul className="grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md">
          <li className="flex justify-center items-center">
            <div className="relative flex">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={() => handleSelectAll(posts.map((el) => el.id))}
                className="cursor-pointer w-5 h-5"
              />
              <Image
                src={`/svg/trash.svg`}
                alt="delete-icon"
                width={40}
                height={40}
                className="absolute top-0 left-[25px] cursor-pointer translate-transition hover:scale-x-110"
                onClick={() => handleAllDeleteClick(deleteList, deletePosts)}
                priority
              />
            </div>
          </li>
          <li>요리글 번호</li>
          <li>요리명</li>
          <li>아이디</li>
          <li>스크랩한 레시피</li>
          <li>등록일자</li>
          <li>관리</li>
        </ul>
        <div className="flex flex-col space-y-2 mt-2">
          {posts &&
            posts.map((el) => (
              <div key={el.id}>
                <ul className="relative grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center py-4 bg-navy-100">
                  <li>
                    <input
                      type="checkbox"
                      checked={deleteList.includes(el.id)}
                      onChange={() => handleCheckboxChange(el.id)}
                      className="cursor-pointer w-5 h-5"
                    />
                  </li>
                  <li>{el.id}</li>
                  <Link href={`/list-page/user-recipes/${el.id}`}>
                    <li className="cursor-pointer hover:text-green-150">
                      {el.postTitle}
                    </li>
                  </Link>
                  <li>{el.member.loginId}</li>
                  <Link href={`/list-page/main-recipes/${el.recipe.id}`}>
                    <li className="hover:text-green-150">{el.recipe.title}</li>
                  </Link>
                  <li>{el.create_at.slice(0, 10)}</li>
                  <li className="space-x-1">
                    <button onClick={() => handleGetCommentClick(el.id)}>
                      댓글
                    </button>
                    <span>/</span>
                    <button
                      onClick={() => handleDeleteClick(el.id, deletePosts)}
                    >
                      삭제
                    </button>
                  </li>
                </ul>
                {activeCommentId === el.id && <Comments id={el.id} />}
              </div>
            ))}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  )
}

export default UserPosts

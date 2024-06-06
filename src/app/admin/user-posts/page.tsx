'use client'

import { deletePosts, deleteRecipe, getPosts } from '@/api/admin-apis'
import AdminInput from '@/components/common/admin-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import Image from 'next/image'

import { useState, useEffect, useCallback } from 'react'
import PostList from './post-list'

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
  const [deleteList, setDeleteList] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const { recipeTitle, postTitle, id } = searchParams

  const getRecipes = useCallback(async () => {
    if (!hasMore) return
    try {
      const res = await getPosts(
        id ?? null,
        recipeTitle ?? null,
        postTitle ?? null,
        postId,
      )
      const newPosts = res.posts
      setPosts((prev) => [...prev, ...newPosts])
      setPostId(newPosts[newPosts.length - 1].id)
      setHasMore(res.nextPage)
    } catch (error) {
      //에러 처리
      //존재하지 않는 검색값일때
      console.log(error)
    }
  }, [postId, hasMore, searchParams])

  const lastElementRef = useInfiniteScroll(getRecipes, hasMore)

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
    getRecipes()
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

  const handleCheckboxChange = (postId: number) => {
    setDeleteList((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setDeleteList([])
    } else {
      const allIds = posts.map((post) => post.id)
      setDeleteList(allIds)
    }
    setSelectAll(!selectAll)
  }

  const handleAllDeleteClick = async () => {
    if (confirm('선택된 요리글들을 삭제하시겠습니까?')) {
      await deletePosts(deleteList)
      alert('요리글이 삭제 되었습니다.')
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
        <ul className="grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md ">
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
          <li>요리글 번호</li>
          <li>요리명</li>
          <li>아이디</li>
          <li>스크랩한 레시피</li>
          <li>등록일자</li>
          <li>관리</li>
        </ul>
        <PostList
          posts={posts}
          ref={lastElementRef}
          deleteList={deleteList}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  )
}

export default UserPosts

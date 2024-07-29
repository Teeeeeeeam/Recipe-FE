'use client'

import {
  getPostingAboutRecipe,
  getPostingList,
  getPostingSearch,
} from '@/api/recipe-apis'
import { useEffect, useState } from 'react'
import { UserPostingFigure } from '@/components/recipe-and-posting/recipe-figure'
import {
  PostingFigure,
  PostingFigureAboutRecipe,
  PostingFigureSearch,
} from '@/types/recipe'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { initWriteState } from '@/store/write-userRecipe-slice'
import { useRouter, useSearchParams } from 'next/navigation'
import NoResult from '@/components/layout/no-result'
import { getLocalStorage } from '@/lib/local-storage'
import { RecipeSkeletonLoader } from '@/components/layout/skeleton/main-skeleton'
import axios, { AxiosError } from 'axios'
import useInfiniteScrollVer2 from '@/hooks/use-infinite-scroll-ver2'

export default function UserRecipes() {
  const [firstRender, setFirstRender] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false)
  const [posting, setPosting] = useState<
    PostingFigure[] | PostingFigureAboutRecipe[] | PostingFigureSearch[]
  >([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [lastLikeCount, setLastLikeCount] = useState<number>(-1)
  const [input, setInput] = useState<string>('')

  const loader = useInfiniteScrollVer2(next, setIsMoreLoading, posting)
  const router = useRouter()
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const query = Object.keys(params)[0]
  const queryValue = params[query]
  const accessToken = getLocalStorage('accessToken')

  useEffect(() => {
    if (query === 'recipeid') {
      getData2(true)
    } else if (query === 'title') {
      getData3(true)
    } else {
      getData(true)
    }
    setFirstRender(true)
    setIsLoading(false)
  }, [queryValue])

  useEffect(() => {
    if (firstRender && isMoreLoading) {
      if (queryValue === 'recipeid') {
        getData2(false)
      } else if (queryValue === 'title') {
        getData3(false)
      } else {
        getData(false)
      }
      setIsMoreLoading(false)
    }
  }, [isMoreLoading])

  async function getData(isInit: boolean) {
    try {
      const option = {
        size: 8,
      }
      const result = await getPostingList(option, lastId)
      if (isInit) {
        setPosting(result.data.posts)
      } else {
        setPosting((prev) => {
          const newData = result.data.posts
          return [...prev, ...newData]
        })
      }
      if (result.data.posts.length > 0) {
        const dataLastId = result.data.posts[result.data.posts.length - 1]?.id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          alert('데이터를 불러올 수 없습니다')
        }
      }
    }
  }

  async function getData2(isInit: boolean) {
    try {
      const option = {
        size: 8,
      }
      if (isInit) {
        const result = await getPostingAboutRecipe(Number(queryValue), option)
        setPosting(result.data.posts)
        const dataLastId = result.data.posts[result.data.posts.length - 1]?.id
        const dataLastLikeCount =
          result.data.posts[result.data.posts.length - 1].postLikeCount
        setNext(result.data.nextPage)
        setLastId(dataLastId)
        setLastLikeCount(dataLastLikeCount)
      } else {
        const queryForParams = {
          lastId,
          lastLikeCount,
        }
        const result = await getPostingAboutRecipe(
          Number(queryValue),
          option,
          queryForParams,
        )
        setPosting((prev) => {
          const newData = result.data.posts
          return [...prev, ...newData]
        })
        const dataLastId = result.data.posts[result.data.posts.length - 1]?.id
        const dataLastLikeCount =
          result.data.posts[result.data.posts.length - 1].postLikeCount
        setNext(result.data.nextPage)
        setLastId(dataLastId)
        setLastLikeCount(dataLastLikeCount)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          alert('데이터를 불러올 수 없습니다')
        }
      }
    }
  }

  async function getData3(isInit: boolean) {
    const option = {
      size: 8,
    }
    try {
      if (isInit) {
        const result = await getPostingSearch(queryValue, option)
        const dataLastId = result.data.posts[result.data.posts.length - 1]?.id
        setLastId(dataLastId)
        setPosting(result.data.posts)
        setNext(result.data.nextPage)
      } else {
        const result = await getPostingSearch(queryValue, option, lastId)
        setPosting((prev) => {
          const newData = result.data.posts
          return [...prev, ...newData]
        })
        const dataLastId = result.data.posts[result.data.posts.length - 1]?.id
        setNext(result.data.nextPage)
        setLastId(dataLastId)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          alert('데이터를 불러올 수 없습니다')
        }
      }
    }
  }

  function submitHandler(e: any) {
    e.preventDefault()
    const newParams = new URLSearchParams()
    newParams.append('title', input)
    const newUrl = `/list-page/user-recipes?${newParams.toString()}`
    router.push(newUrl)
  }

  return (
    <div className="pt-4">
      <form onSubmit={submitHandler}>
        <div className="mb-6 flex flex-col justify-center md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            className="placeholder:text-gray-400 h-12 w-full md:w-96 rounded-lg px-4 font-medium focus:outline-none focus:border-blue-50 border border-gray-300"
            placeholder="검색어를 입력해주세요"
          />
          <button
            type="submit"
            className="w-full md:w-16  py-3 flex items-center justify-center rounded-lg bg-blue-50 text-white hover:bg-blue-100 transition duration-300"
          >
            검색
          </button>
        </div>
      </form>

      {query === 'title' && (
        <h2 className="font-semibold text-lg md:text-xl px-2 md:px-8 mb-2">{`"${queryValue}"에 대한 결과`}</h2>
      )}

      {isLoading || isMoreLoading ? (
        <RecipeSkeletonLoader />
      ) : (
        <>
          {posting.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-2 md:px-8 md:pb-8">
              <UserPostingFigure recipes={posting} />
              <div ref={loader} />
            </div>
          ) : (
            <NoResult />
          )}
        </>
      )}

      <aside className="fixed md:w-14 md:h-14 w-10 h-10 md:right-10 bottom-10 right-5 bg-yellow-500 rounded-full">
        <Link
          href={accessToken ? '/list-page/user-recipes/write' : '/user/login'}
          onClick={() => dispatch(initWriteState())}
          className="w-full h-full flex justify-center items-center text-2xl text-white"
        >
          +
        </Link>
      </aside>
    </div>
  )
}

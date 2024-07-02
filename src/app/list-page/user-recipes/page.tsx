'use client'

import { getPostingAboutRecipe, getPostingList } from '@/api/recipe-apis'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UserPostingFigure } from '@/components/recipe-and-posting/recipe-figure'
import { PostingFigure, PostingFigureAboutRecipe } from '@/types/recipe'

export default function UserRecipes() {
  const [params, setParams] = useState<string | null>(null)
  const [posting, setPosting] = useState<
    PostingFigure[] | PostingFigureAboutRecipe[]
  >([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [lastLikeCount, setLastLikeCount] = useState<number>(-1)

  const loader = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams =
        new URL(window.location.href).searchParams.get('recipeid') || null
      setParams(urlParams)
    }
  }, [])

  useEffect(() => {
    if (params) {
      getData2(true)
    } else {
      getData(true)
    }
  }, [params])

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
      console.log(error)
    }
  }

  async function getData2(isInit: boolean) {
    try {
      const option = {
        size: 8,
      }
      if (isInit) {
        const result = await getPostingAboutRecipe(Number(params), option)
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
          Number(params),
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
      console.log(error)
    }
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          if (params) {
            getData2(false)
          } else {
            getData(false)
          }
        }
      }
    },
    [posting],
  )
  // Intersection Observer 설정
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => observer.disconnect()
  }, [handleObserver])

  if (posting.length < 1) {
    return <div>loading</div>
  }
  return (
    <div className="userRecipe-wrap">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-2 md:px-8 md:pb-8">
        <UserPostingFigure recipes={posting} />
        <div ref={loader} />
      </div>
    </div>
  )
}

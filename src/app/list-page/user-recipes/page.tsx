'use client'

import { getPostingList } from '@/api/recipe-apis'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UserPostingFigure } from '@/components/recipe-and-posting/recipe-figure'
import { PostingFigure } from '@/types/recipe'

export default function UserRecipes() {
  const [posting, setPosting] = useState<PostingFigure[]>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)

  const loader = useRef(null)

  useEffect(() => {
    getData(true)
  }, [])

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

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getData(false)
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

  return (
    <div className="userRecipe-wrap">
      <div className="p-8 grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
        <UserPostingFigure recipes={posting} />
        <div ref={loader} />
      </div>
    </div>
  )
}

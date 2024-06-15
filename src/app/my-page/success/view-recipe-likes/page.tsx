'use client'
import { doLikeForRecipe, inquiryLikeRecipe } from '@/api/login-user-apis'
import { RootState } from '@/store'
import { MyLikesRecipe } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ViewRecipeLikes() {
  const [likeData, setLikeData] = useState<MyLikesRecipe[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<string | undefined>(undefined)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useRef(null)

  useEffect(() => {
    getInquiryLikeRecipe(true)
  }, [mount])

  async function getInquiryLikeRecipe(isInit: boolean) {
    try {
      const options = {
        page: 0,
        size: 5,
        sort: [''].join(),
      }
      const result = await inquiryLikeRecipe(
        `/api/user/info/${userInfo.loginId}/recipes/likes?${isInit === false && lastId ? `&last-id=${lastId}` : ''}`,
        options,
      )
      // lastId
      const dataLastId = String(
        result.data.content[result.data.content.length - 1]?.like_id,
      )
      if (isInit) {
        setLikeData(result.data.content)
      } else {
        setLikeData((prev) => {
          const newData = result.data.content
          return [...prev, ...newData]
        })
      }
      setLastId(dataLastId)
      setNext(result.data.nextPage)
    } catch (error) {
      console.log(error)
    }
  }

  async function cancelLike(thisId: number) {
    try {
      if (userInfo.id) {
        const options = {
          memberId: userInfo.id,
          recipeId: thisId,
        }
        await doLikeForRecipe('/api/user/recipe/like', options)
        setMount(!mount)
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
          getInquiryLikeRecipe(false)
        }
      }
    },
    [likeData],
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
    <div className="w-full">
      <div className="h-[80vh] overflow-y-scroll border px-5">
        <ul>
          {likeData.map((item, index) => {
            return (
              <li key={item.like_id} className="border px-5 mb-3">
                <ul className="flex justify-between grid-cols-3">
                  <li className="py-3">{index + 1}</li>
                  <li className="py-3">
                    <Link href={`/list-page/main-recipes/${item.content_id}`}>
                      {item.title}
                    </Link>
                  </li>
                  <li className="py-3">
                    <button
                      type="button"
                      onClick={() => cancelLike(item.content_id)}
                    >
                      취소
                    </button>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
        <div ref={loader} />
      </div>
    </div>
  )
}

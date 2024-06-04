'use client'
import { inquiryPosting } from '@/api/login-user-apis'
import { postUserDel } from '@/api/recipe-apis'
import { RootState } from '@/store'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { MyPostings } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function ViewMyPosting() {
  const [posting, setPosting] = useState<MyPostings[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<string | undefined>(undefined)
  const [mount, setMount] = useState<boolean>(false)

  const state = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch()
  const loader = useRef(null)

  useEffect(() => {
    getInquiryPosting(true)
  }, [mount])

  async function getInquiryPosting(isInit: boolean) {
    try {
      const result = await inquiryPosting(
        `/api/user/info/${state.loginId}/posts?size=${10}${!isInit && lastId ? `&last-id=${lastId}` : ''}`,
      )
      // lastId
      const dataLastId = String(
        result.data.content[result.data.content.length - 1]?.id,
      )
      if (isInit) {
        setPosting(result.data.content)
      } else {
        setPosting((prev) => {
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

  async function deletePosting(thisId: number) {
    try {
      await postUserDel('/api/user/posts', thisId)
      setMount(!mount)
    } catch (error) {
      console.log(error)
    }
  }
  async function modPosting(thisId: number) {
    dispatch(recipeId(thisId))
    window.location.href = '/list-page/user-recipes/modification'
  }

  // Intersection Observer 콜백 함수
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0]
      if (target.isIntersecting) {
        if (next) {
          getInquiryPosting(false)
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
    <div className="w-full">
      <div className="h-[80vh] overflow-y-scroll border px-5">
        <ul>
          {posting.map((item, index) => {
            return (
              <li key={item.id} className="border px-5 mb-3">
                <ul className="flex justify-between grid-cols-3">
                  <li className="py-3">{index + 1}</li>
                  <li className="py-3">
                    <Link href={`/list-page/user-recipes/${item.id}`}>
                      {item.postTitle}
                    </Link>
                  </li>
                  <li className="py-3">
                    <button
                      type="button"
                      onClick={() => modPosting(item.id)}
                      className="mr-5"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePosting(item.id)}
                    >
                      삭제
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

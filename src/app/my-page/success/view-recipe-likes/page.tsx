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
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useRef(null)

  useEffect(() => {
    getInquiryLikeRecipe(true)
  }, [mount])

  async function getInquiryLikeRecipe(isInit: boolean) {
    try {
      const option = {
        size: 5,
      }
      const result = await inquiryLikeRecipe(option, lastId)
      if (isInit) {
        setLikeData(result.data.content)
      } else {
        setLikeData((prev) => {
          const newData = result.data.content
          return [...prev, ...newData]
        })
      }
      if (result.data.content.length > 0) {
        const dataLastId =
          result.data.content[result.data.content.length - 1].like_id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
    } catch (error) {
      console.log(error)
    }
  }

  async function cancelLike(thisId: number) {
    try {
      if (userInfo.id) {
        const options = {
          recipeId: thisId,
        }
        await doLikeForRecipe(options)
        setLastId(null)
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
    <>
      <h4 className="text-center text-lg mb-3">좋아요한 레시피</h4>
      <div className="h-[70vh] bg-white overflow-y-scroll">
        <div className="rounded-lg p-4">
          <table className="w-full border-gray-200 table-fixed">
            <thead>
              <tr>
                <th className="p-2 w-[10%]">#</th>
                <th className="p-2 w-[80%]">제목</th>
                <th className="p-2 sm:w-[10%] w-[20%]">취소</th>
              </tr>
            </thead>
            <tbody className="">
              {likeData.map((item, index) => {
                return (
                  <tr key={item.like_id}>
                    <td className="px-2 py-5 text-center ">{index + 1}</td>
                    <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
                      <Link href={`/list-page/main-recipes/${item.content_id}`}>
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-2 py-5 text-center">
                      <button
                        type="button"
                        onClick={() => cancelLike(item.content_id)}
                      >
                        취소
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

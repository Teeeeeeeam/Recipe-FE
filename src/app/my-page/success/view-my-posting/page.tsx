'use client'
import { inquiryPosting } from '@/api/login-user-apis'
import { postUserDel } from '@/api/recipe-apis'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { MyPostings } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function ViewMyPosting() {
  const [posting, setPosting] = useState<MyPostings[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const dispatch = useDispatch()
  const loader = useRef(null)

  useEffect(() => {
    getInquiryPosting(true)
  }, [mount])

  async function getInquiryPosting(isInit: boolean) {
    try {
      const option = {
        size: 10,
      }
      const result = await inquiryPosting(option, lastId)
      if (isInit) {
        setPosting(result.data.content)
      } else {
        setPosting((prev) => {
          const newData = result.data.content
          return [...prev, ...newData]
        })
      }
      if (result.data.content.length > 0) {
        const dataLastId =
          result.data.content[result.data.content.length - 1]?.id
        setLastId(dataLastId)
      }
      setNext(result.data.nextPage)
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePosting(thisId: number) {
    try {
      await postUserDel(thisId)
      setLastId(null)
      setMount((prev) => !prev)
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
    <>
      <h4 className="text-center text-lg mb-3">내가 작성한 글</h4>
      <div className="h-[70vh] bg-white overflow-y-scroll">
        <div className="rounded-lg p-4">
          <table className="w-full border-gray-200 table-fixed">
            <thead>
              <tr>
                <th className="p-2 w-[10%]">#</th>
                <th className="p-2 w-[]">제목</th>
                <th className="p-2 sm:w-[20%] w-[30%]">조작</th>
              </tr>
            </thead>
            <tbody className="">
              {posting.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="px-2 py-5 text-center ">{index + 1}</td>
                    <td className="px-2 py-5 text-center whitespace-nowrap text-ellipsis overflow-hidden">
                      <Link href={`/list-page/user-recipes/${item.id}`}>
                        {item.postTitle}
                      </Link>
                    </td>
                    <td className="px-2 py-5 text-center">
                      <button
                        type="button"
                        onClick={() => modPosting(item.id)}
                        className="mr-3"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePosting(item.id)}
                      >
                        삭제
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

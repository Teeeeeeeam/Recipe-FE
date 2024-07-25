'use client'
import { inquiryPosting } from '@/api/login-user-apis'
import { postUserDel } from '@/api/recipe-apis'
import { recipeId } from '@/store/mod-userRecipe-slice'
import { MyPostings } from '@/types/user'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import TableHeader from '@/components/user/infinite-paging/sequence/table-header'
import TableBody from '@/components/user/infinite-paging/sequence/table-body'
import TableBodyNoData from '@/components/user/infinite-paging/sequence/table-body-no-data'

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
    <div className="w-10/12 mx-auto p-4">
      <div className="flex items-center border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold">내가 작성한 글</h3>
      </div>
      <div className="h-[70vh] bg-white overflow-y-scroll">
        <div className="pb-4">
          <table className="w-full border-gray-200 table-fixed">
            <TableHeader
              theadOptions={[
                { class: 'p-2 w-[10%]', title: '#' },
                { class: 'p-2 sm:w-[70%] w-[60%]', title: '제목' },
                { class: 'p-2 sm:w-[20%] w-[30%]', title: '기능' },
              ]}
            />
            {posting.length > 0 ? (
              <TableBody
                ctg={2}
                info="작성글"
                data={posting}
                onClick={modPosting}
                onClick2={deletePosting}
              />
            ) : (
              <TableBodyNoData />
            )}
            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

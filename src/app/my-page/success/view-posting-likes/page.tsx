'use client'
import { doLikeForPosting, inquiryLikePosting } from '@/api/login-user-apis'
import { RootState } from '@/store'
import { MyLikesPosting } from '@/types/user'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TableHeader from '@/components/user/infinite-paging/sequence/table-header'
import TableBody from '@/components/user/infinite-paging/sequence/table-body'
import TableBodyNoData from '@/components/user/infinite-paging/sequence/table-body-no-data'

export default function ViewPostingLikes() {
  const [likeData, setLikeData] = useState<MyLikesPosting[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useRef(null)

  useEffect(() => {
    getInquiryLikePosting(true)
  }, [mount])

  async function getInquiryLikePosting(isInit: boolean) {
    try {
      const option = {
        size: 5,
      }
      const result = await inquiryLikePosting(option, lastId)
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
        const option = {
          postId: thisId,
        }
        await doLikeForPosting(option)
        setLastId(null)
        setMount((prev) => !prev)
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
          getInquiryLikePosting(false)
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
      <h4 className="text-center text-lg mb-3">좋아요한 게시글</h4>
      <div className="h-[70vh] bg-white overflow-y-scroll">
        <div className="rounded-lg pb-4">
          <table className="w-full border-gray-200 table-fixed">
            <TableHeader
              theadOptions={[
                { class: 'p-2 w-[10%]', title: '#' },
                { class: 'p-2 w-[80%]', title: '제목' },
                { class: 'p-2 sm:w-[10%] w-[20%]', title: '취소' },
              ]}
            />
            {likeData.length > 0 ? (
              <TableBody
                ctg={1}
                info="게시글"
                data={likeData}
                onClick={cancelLike}
              />
            ) : (
              <TableBodyNoData />
            )}
            <tfoot ref={loader}></tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

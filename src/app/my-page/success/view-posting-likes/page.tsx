'use client'
import { doLikeForPosting, inquiryLikePosting } from '@/api/login-user-apis'
import { RootState } from '@/store'
import { MyLikesPosting } from '@/types/user'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TableHeader from '@/components/user/infinite-paging/sequence/table-header'
import TableBody from '@/components/user/infinite-paging/sequence/table-body'
import TableBodyNoData from '@/components/user/infinite-paging/sequence/table-body-no-data'
import {
  InfiniteScrollSkeleton,
  MypageSkeletonLoader,
} from '@/components/layout/skeleton/mypage-skeleton'
import axios, { AxiosError } from 'axios'
import useInfiniteScrollVer2 from '@/hooks/use-infinite-scroll-ver2'

export default function ViewPostingLikes() {
  const [firstRender, setFirstRender] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false)
  const [likeData, setLikeData] = useState<MyLikesPosting[] | []>([])
  const [next, setNext] = useState<boolean>(false)
  const [lastId, setLastId] = useState<number | null>(null)
  const [mount, setMount] = useState<boolean>(false)

  const userInfo = useSelector((state: RootState) => state.userInfo)
  const loader = useInfiniteScrollVer2(next, setIsMoreLoading, likeData)

  useEffect(() => {
    getInquiryLikePosting(true)
    setFirstRender(true)
    setIsLoading(false)
  }, [mount])

  useEffect(() => {
    if (firstRender && isMoreLoading) {
      getInquiryLikePosting(false)
      setIsMoreLoading(false)
    }
  }, [isMoreLoading])

  async function getInquiryLikePosting(isInit: boolean) {
    try {
      const option = {
        size: 13,
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          const res = axiosError.response.data as { message: string }
          alert(res.message)
        }
      }
    }
  }

  return (
    <div className="w-10/12 mx-auto p-4">
      <div className="flex items-center border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold">좋아요한 게시글</h3>
      </div>
      {isLoading ? (
        <MypageSkeletonLoader rows={13} columns={3} />
      ) : (
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
              {isMoreLoading ? (
                <InfiniteScrollSkeleton rows={13} columns={3} />
              ) : (
                <>
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
                </>
              )}
              <tfoot ref={loader}></tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

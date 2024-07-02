import {
  DefaultData,
  MyBookmark,
  MyLikesPosting,
  MyLikesRecipe,
  MyPostings,
} from '@/types/user'
import TableButton from './table-button'
import TableBodyCommon from './table-body-common'

interface TableBodyProps {
  ctg: number
  info: string
  data: MyPostings[] | MyBookmark[] | MyLikesPosting[] | MyLikesRecipe[] | []
  onClick: (value: number) => void
  onClick2?: (value: number) => void
}

export default function TableBody({
  ctg,
  info,
  data,
  onClick,
  onClick2,
}: TableBodyProps) {
  //
  function isMyBookmark(isItem: any): isItem is MyBookmark {
    return (isItem as MyBookmark).id !== undefined
  }
  function isMyLikes(isItem: any): isItem is MyLikesRecipe | MyLikesPosting {
    return (isItem as MyLikesRecipe | MyLikesPosting).like_id !== undefined
  }
  function isMyPosting(isItem: any): isItem is MyPostings {
    return (isItem as MyPostings).id !== undefined
  }

  function convertHandler(
    item: MyPostings | MyBookmark | MyLikesPosting | MyLikesRecipe | undefined,
  ) {
    if (info === '즐겨찾기' && isMyBookmark(item)) {
      return {
        idForKey: item.id,
        id: item.id,
        title: item.title,
        url: `/list-page/main-recipes/${item.id}`,
      }
    }
    if (isMyLikes(item)) {
      const defaultData: DefaultData = {
        idForKey: item.like_id,
        id: item.content_id,
        title: item.title,
        url: '',
      }
      if (info === '레시피') {
        defaultData.url = `/list-page/main-recipes/${item.content_id}`
        return defaultData
      } else if (info === '게시글') {
        defaultData.url = `/list-page/user-recipes/${item.content_id}`
        return defaultData
      }
    }
    if (info === '작성글' && isMyPosting(item)) {
      return {
        idForKey: item.id,
        id: item.id,
        title: item.postTitle,
        url: `/list-page/user-recipes/${item.id}`,
      }
    }
  }
  return (
    <>
      <tbody>
        <>
          {ctg === 1 &&
            data.map((item, index) => {
              const convertData = convertHandler(item)
              return (
                convertData && (
                  <tr key={convertData.idForKey} className="border-b">
                    <TableBodyCommon index={index} convertData={convertData} />
                    <td className="px-2 text-center">
                      <TableButton
                        label="취소"
                        onClick={onClick}
                        id={convertData.id}
                      />
                    </td>
                  </tr>
                )
              )
            })}

          {ctg === 2 &&
            info === '작성글' &&
            onClick2 &&
            data.map((item, index) => {
              const convertData = convertHandler(item)
              return (
                convertData && (
                  <tr key={convertData.id}>
                    <TableBodyCommon index={index} convertData={convertData} />
                    <td className="px-2 py-5 text-center">
                      <TableButton
                        label="수정"
                        onClick={onClick}
                        id={convertData.id}
                      />
                      <TableButton
                        label="삭제"
                        onClick={onClick2}
                        id={convertData.id}
                      />
                    </td>
                  </tr>
                )
              )
            })}
        </>
      </tbody>
    </>
  )
}

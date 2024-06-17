import Image from 'next/image'
import useCheckbox from '@/hooks/use-check-box'
import { PostInfo } from '@/types/admin'
import { deletePosts } from '@/api/admin-apis'
import Link from 'next/link'
import Comments from './comments'

interface PostListProps {
  posts: PostInfo[]
  lastElementRef: React.RefObject<HTMLDivElement>
  activeCommentId: number | null
  handleGetCommentClick: (id: number) => void
}

const PostList = ({
  posts,
  lastElementRef,
  activeCommentId,
  handleGetCommentClick,
}: PostListProps) => {
  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleDeleteClick,
    handleSelectAll,
    handleAllDeleteClick,
  } = useCheckbox()

  return (
    <div className="bg-navy-50 p-2 text-white rounded-md space-y-2">
      <ul className="grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] text-[12px] lg:text-[16px] text-center bg-navy-100 py-4 rounded-t-md">
        <li className="flex justify-center items-center">
          <div className="relative flex">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(posts.map((el) => el.id))}
              className="cursor-pointer w-5 h-5"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={0}
              height={0}
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-5 cursor-pointer"
              onClick={() => handleAllDeleteClick(deleteList, deletePosts)}
            />
          </div>
        </li>
        <li>요리글 번호</li>
        <li>요리글 제목</li>
        <li>작성자</li>
        <li>레시피 제목</li>
        <li>작성일</li>
        <li>기능</li>
      </ul>
      {posts.map((post) => (
        <div key={post.id}>
          <ul className="relative grid grid-cols-[1fr_2fr_2fr_1fr_2fr_2fr_2fr] items-center text-[12px] lg:text-[16px] text-center py-4 bg-navy-100">
            <li>
              <input
                type="checkbox"
                checked={deleteList.includes(post.id)}
                onChange={() => handleCheckboxChange(post.id)}
                className="cursor-pointer w-5 h-5"
              />
            </li>
            <li>{post.id}</li>
            <Link href={`/list-page/user-recipes/${post.id}`}>
              <li className="cursor-pointer hover:text-green-150">
                {post.postTitle}
              </li>
            </Link>
            <li>{post.member.loginId}</li>
            <Link href={`/list-page/main-recipes/${post.recipe.id}`}>
              <li className="hover:text-green-150">{post.recipe.title}</li>
            </Link>
            <li>{post.createdAt}</li>
            <li className="space-x-1">
              <button onClick={() => handleGetCommentClick(post.id)}>
                댓글
              </button>
              <span>/</span>
              <button onClick={() => handleDeleteClick(post.id, deletePosts)}>
                삭제
              </button>
            </li>
          </ul>
          {activeCommentId === post.id && <Comments id={post.id} />}
        </div>
      ))}
      <div ref={lastElementRef} />
    </div>
  )
}

export default PostList

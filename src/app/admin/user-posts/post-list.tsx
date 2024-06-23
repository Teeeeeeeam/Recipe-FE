import Image from 'next/image'
import { useState } from 'react'
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
  const [hoveredPost, setHoveredPost] = useState<PostInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    deleteList,
    selectAll,
    handleCheckboxChange,
    handleDeleteClick,
    handleSelectAll,
    handleAllDeleteClick,
  } = useCheckbox()

  const handleMouseEnter = (post: PostInfo) => {
    setHoveredPost(post)
    setIsModalOpen(true)
  }

  const handleMouseLeave = () => {
    setHoveredPost(null)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-4 rounded shadow text-[12px] md:text-[14px] mt-4">
      <ul className="grid grid-cols-[0.5fr_2fr_2fr_1.5fr] md:grid-cols-[0.5fr_1fr_2fr_2fr_2fr_1.5fr_1.5fr] text-center font-semibold bg-gray-200 p-2 rounded-t">
        <li className="flex justify-center items-center">
          <div className="relative flex">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => handleSelectAll(posts.map((el) => el.id))}
              className="cursor-pointer w-4 h-4"
            />
            <Image
              src={`/svg/trash.svg`}
              alt="delete-icon"
              width={0}
              height={0}
              className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-5 cursor-pointer"
              onClick={() => handleAllDeleteClick(deleteList, deletePosts)}
            />
          </div>
        </li>
        <li className="hidden md:block">번호</li>
        <li>요리글 제목</li>
        <li>작성자</li>
        <li className="hidden md:block">레시피 제목</li>
        <li className="hidden md:block">작성일</li>
        <li>관리</li>
      </ul>
      <div className="divide-y">
        {posts.map((post) => (
          <div key={post.id}>
            <ul
              className="relative grid grid-cols-[0.5fr_2fr_2fr_1.5fr] md:grid-cols-[0.5fr_1fr_2fr_2fr_2fr_1.5fr_1.5fr] text-center p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(post)}
              onMouseLeave={handleMouseLeave}
            >
              <li className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={deleteList.includes(post.id)}
                  onChange={() => handleCheckboxChange(post.id)}
                  className="cursor-pointer w-4 h-4"
                />
              </li>
              <li className="hidden md:block">{post.id}</li>
              <Link href={`/list-page/user-recipes/${post.id}`}>
                <li className="cursor-pointer hover:text-blue-100">
                  {post.postTitle}
                </li>
              </Link>
              <li>{post.member.nickname}</li>
              <li className="hover:text-blue-100 hidden md:block">
                <Link href={`/list-page/main-recipes/${post.recipe.id}`}>
                  {post.recipe.title}
                </Link>
              </li>
              <li className="hidden md:block">{post.createdAt}</li>
              <li className="space-x-1">
                <button
                  onClick={() => handleGetCommentClick(post.id)}
                  className="hover:text-blue-100"
                >
                  댓글
                </button>
                <span>/</span>
                <button
                  onClick={() => handleDeleteClick(post.id, deletePosts)}
                  className="text-red-500 hover:bg-red-100"
                >
                  삭제
                </button>
              </li>
              {hoveredPost && hoveredPost.id === post.id && isModalOpen && (
                <div className="absolute break-words top-[110%] left-[25%] w-[300px]  bg-white border rounded shadow-lg p-4 z-10">
                  <ul className="w-full list-none p-0 m-0 text-left ">
                    <li>
                      <span className="font-bold">{`번호 : `}</span>
                      <span>{hoveredPost.id}</span>
                    </li>
                    <li>
                      <span className="font-bold">{`요리글 제목 : `}</span>
                      <span>{hoveredPost.postTitle}</span>
                    </li>
                    <li>
                      <span className="font-bold">{`작성자 : `}</span>
                      <span>{hoveredPost.member.nickname}</span>
                    </li>
                    <li>
                      <span className="font-bold">{`레시피 제목 : `}</span>
                      <span>{hoveredPost.recipe.title}</span>
                    </li>
                    <li>
                      <span className="font-bold">{`작성일 : `}</span>
                      <span>{hoveredPost.createdAt}</span>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
            {activeCommentId === post.id && <Comments id={post.id} />}
          </div>
        ))}
        <div ref={lastElementRef} />
      </div>
    </div>
  )
}

export default PostList

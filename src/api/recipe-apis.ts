import requester from '.'
import {
  CommentDelReq,
  CommentModReq,
  CommentWriteReq,
  GetComment,
  GetCommentParams,
  GetHomePosting,
  GetHomePostingParams,
  GetHomeRecipe,
  GetPostingAboutRecipe,
  GetPostingAboutRecipePageable,
  GetPostingAboutRecipeParams,
  GetPostingDetail,
  GetPostingList,
  GetPostingListParams,
  GetRecipeDetail,
  GetRecipeList,
  GetRecipeListParams,
  PostingModReq,
  PostingVerifyPasswordReq,
  PostingWriteReq,
  Response,
} from '@/types/recipe-apis-type'

// 홈(레시피)
export async function getHomeRecipe() {
  const { payload } = await requester<GetHomeRecipe>({
    method: 'GET',
    url: '/api/recipe/main',
  })
  return payload
}

// 홈(카테고리 레시피)
export async function getCategoryRecipe(
  title: string | null,
  ingredients: string[] | null,
  cat1: string[] | null,
  cat2: string[] | null,
  cat3: string[] | null,
  lastCount: number | null,
  lastId: number | null,
  order: 'DATE' | 'LIKE',
  isSize: boolean,
) {
  const params = new URLSearchParams({
    ...(title && { title }),
    ...((lastCount || lastCount === 0) && { lastCount: String(lastCount) }),
    ...(lastId && { lastId: String(lastId) }),
  })

  if (cat1) {
    params.append('cat1', cat1.join(','))
  }
  if (cat2) {
    params.append('cat2', cat2.join(','))
  }
  if (cat3) {
    params.append('cat3', cat3.join(','))
  }
  if (ingredients) {
    params.append('ingredients', ingredients.join(','))
  }
  params.append('order', order)
  params.append('size', isSize ? '8' : '12')

  const { payload } = await requester<GetHomeRecipe>({
    method: 'GET',
    url: `/api/recipe/search?${params.toString()}`,
  })
  return payload.data
}

// 홈(게시글)
export async function getHomePosting(params: GetHomePostingParams) {
  const { payload } = await requester<GetHomePosting>({
    method: 'GET',
    url: '/api/posts/main',
    params,
  })
  return payload
}

// 레시피 - 페이지네이션
export async function getRecipeList(params: GetRecipeListParams) {
  const { payload } = await requester<GetRecipeList>({
    method: 'GET',
    url: '/api/recipe/normal',
    params,
  })
  return payload
}

// 레시피 - 상세페이지
export async function getRecipeDetail(recipeId: number) {
  const { payload } = await requester<GetRecipeDetail>({
    method: 'GET',
    url: `/api/recipe/${recipeId}`,
  })
  return payload
}

// 게시글 - 무한페이징
export async function getPostingList(
  params: GetPostingListParams,
  lastId: number | null,
) {
  const { payload } = await requester<GetPostingList>({
    method: 'GET',
    url: `/api/posts${lastId ? `?lastId=${lastId}` : ''}`,
    params,
  })
  return payload
}

// 게시글 - 상세페이지
export async function getPostingDetail(postId: number) {
  const { payload } = await requester<GetPostingDetail>({
    method: 'GET',
    url: `/api/user/posts/${postId}`,
  })
  return payload
}

// 게시글 - 작성
export async function postingWrite(req: PostingWriteReq) {
  const formData = new FormData()
  formData.append('userAddPostRequest', JSON.stringify(req.writeReq))
  formData.append('file', req.writeFile)

  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/user/posts',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

// 게시글 - 수정
export async function postingMod(postId: number, req: PostingModReq) {
  const formData = new FormData()
  if (req.modFile === null) {
    formData.append('userUpdateRequest', JSON.stringify(req.modReq))
  } else {
    formData.append('userUpdateRequest', JSON.stringify(req.modReq))
    formData.append('file', req.modFile)
  }
  const { payload } = await requester<Response>({
    method: 'POST',
    url: `/api/user/update/posts/${postId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

// 게시글 - 삭제
export async function postUserDel(postId: number) {
  const { payload } = await requester<Response>({
    method: 'DELETE',
    url: `/api/user/posts/${postId}`,
  })
  return payload
}

// 게시글 - 비밀번호 검증
export async function postingVerifyPassword(req: PostingVerifyPasswordReq) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: `/api/user/valid/posts`,
    data: req,
  })
  return payload
}

// 게시글 - 댓글 조회
export async function getComment(params: GetCommentParams, postId: number) {
  const { payload } = await requester<GetComment>({
    method: 'GET',
    url: `/api/comments?postId=${postId}`,
    params,
  })
  return payload
}

// 게시글 - 댓글 작성
export async function commentWrite(req: CommentWriteReq) {
  const { payload } = await requester<Response>({
    method: 'POST',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}

// 게시글 - 댓글 수정
export async function commentMod(req: CommentModReq) {
  const { payload } = await requester<Response>({
    method: 'PUT',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}

// 게시글 - 댓글 삭제
export async function commentDel(req: CommentDelReq) {
  const { payload } = await requester<Response>({
    method: 'Delete',
    url: '/api/user/comments',
    data: req,
  })
  return payload
}

// 게시글 BEST (레시피 상세페이지)
interface GetTopPostingParams {
  recipeId: number
}
interface AxiosTopPosting extends Response {
  data: {
    id: number
    post: TopPosting[]
  }
}
export interface TopPosting {
  id: number
  postTitle: string
  createAt: string
  postLikeCount: number
  postImageUrl: string
  member: {
    nickname: string
  }
}
export async function getTopPosting(params: GetTopPostingParams) {
  const { payload } = await requester<AxiosTopPosting>({
    method: 'GET',
    url: '/api/top/posts',
    params,
  })
  return payload
}

// 게시글 - 레시피 참조
export async function getPostingAboutRecipe(
  recipeId: number,
  params: GetPostingAboutRecipePageable,
  last?: GetPostingAboutRecipeParams,
) {
  const newQuery = new URLSearchParams()
  if (last && last.lastLikeCount === 0) {
    newQuery.append('lastCount', String(last.lastLikeCount))
    newQuery.append('lastId', String(last.lastId))
  }
  if (last && last.lastLikeCount > 0) {
    newQuery.append('lastCount', String(last.lastLikeCount))
  }

  const { payload } = await requester<GetPostingAboutRecipe>({
    method: 'GET',
    // url: `/api/posts/${recipeId}`,
    url: last
      ? `/api/posts/${recipeId}?${newQuery.toString()}`
      : `/api/posts/${recipeId}`,
    params,
  })
  return payload
}

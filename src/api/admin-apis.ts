import {
  Comments,
  CookStep,
  Members,
  Notices,
  Posts,
  Recipe,
  RecipeForm,
} from '@/types/admin'
import requester from './index'

export const getRecipe = async (
  lastId: number | null,
  title: string | null,
  ingredients: string | null,
) => {
  const { payload } = await requester<Recipe>({
    method: 'get',
    url: `/api/admin/recipe?${ingredients ? `ingredients=${ingredients}` : ''}${title ? `&title=${title}` : ''}${lastId !== null ? `&lastId=${lastId}` : ''}&page=0&size=10&sort=string`,
  })
  return payload.data
}

export const getDetailRecipe = async (id: string) => {
  const { payload } = await requester<RecipeForm>({
    method: 'get',
    url: `/api/recipe/${id}`,
  })
  return payload.data
}

export const postRecipe = async (
  title: string,
  cookLevel: string,
  people: string,
  ingredients: string[],
  cookTime: string,
  cookSteps: string[],
  file: File,
) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'recipeSaveRequest',
    JSON.stringify({
      title,
      cookLevel,
      people,
      ingredients,
      cookTime,
      cookSteps,
    }),
  )

  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/admin/save/recipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const updateRecipe = async (
  title: string,
  cookLevel: string,
  people: string,
  ingredients: string[],
  cookTime: string,
  cookSteps: CookStep[],
  file: File,
) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'recipeSaveRequest',
    JSON.stringify({
      title,
      cookLevel,
      people,
      ingredients,
      cookTime,
      cookSteps,
    }),
  )

  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/admin/save/recipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const deleteRecipe = async (id: number) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/recipe/${id}`,
  })
  return payload
}

export const getPosts = async (
  loginId: string | null,
  recipeTitle: string | null,
  postTitle: string | null,
  postId: number | null,
) => {
  const { payload } = await requester<Posts>({
    method: 'get',
    url: `/api/search?${loginId ? `login-id=${loginId}` : ''}${recipeTitle ? `&recipe-title=${recipeTitle}` : ''}${postTitle ? `post-title=${postTitle}` : ''}${postId ? `post-id=${postId}` : ''}page=0size=10&sort=string`,
  })
  return payload
}

export const deletePosts = async (id: number) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/user/posts/${id}`,
  })
  return payload
}

export const getComments = async (id: string) => {
  const { payload } = await requester<Comments>({
    method: 'get',
    url: `/api/admin/posts/comments?post-id=${id}&page=0&size=1&sort=string`,
  })
  return payload.data
}

export const deleteComments = async (id: string) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: ``,
  })
  return payload
}

export const getMembers = async (
  loginId: string | null,
  username: string | null,
  email: string | null,
  nickname: string | null,
  memberId: number | null,
) => {
  const { payload } = await requester<Members>({
    method: 'get',
    url: `/api/admin/members/search?member-id=${memberId ? memberId : ''}${loginId ? `&login-id=${loginId}` : ''}${username ? `&username=${username}` : ''}${email ? `&email=${email}` : ''}${username ? `&username=${username}` : ''}${nickname ? `&nickname=${nickname}` : ''}&page=0&size=3&sort=string`,
  })
  return payload.data
}

export const deleteMembers = async (id: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/members?ids=${id}`,
  })
  return payload
}

export const getNotice = async (id: number | null) => {
  const { payload } = await requester<Notices>({
    method: 'get',
    url: `/api/admin/notices?${id ? `last-id=${id}` : ''}&page=0&size=1&sort=string`,
  })
  return payload.data
}

export const postNotice = async (
  title: string,
  content: string,
  id: number,
  file: File | null,
) => {
  const formData = new FormData()
  file && formData.append('file', file)
  formData.append(
    'adminAddNoticeDto',
    JSON.stringify({
      noticeTitle: title,
      noticeContent: content,
      memberId: id,
    }),
  )
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/admin/notices`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

import {
  Comments,
  CookStep,
  DailyVisit,
  Members,
  MonthlyVisit,
  NoticeInfo,
  Notices,
  NumberOfVisitor,
  Posts,
  QuestionDetail,
  Questions,
  Recipe,
  RecipeForm,
  WeeklyVisit,
} from '@/types/admin'
import requester from './index'
import { Response } from '@/types/auth'

export const getRecipe = async (
  lastId: number | null,
  ingredients: string | null,
  title: string | null,
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
  recipeId: number,
  title: string,
  cookLevel: string,
  people: string,
  ingredients: string[],
  cookTime: string,
  cookSteps: CookStep[],
  newCookSteps: string[],
  deleteCookStepsId: string[],
  file: File | null,
) => {
  const formData = new FormData()
  if (file) formData.append('file', file)

  const recipeUpdateRequest: any = {
    title,
    cookLevel,
    people,
    ingredients,
    cookTime,
    cookSteps,
  }
  if (newCookSteps.length > 0) {
    recipeUpdateRequest.newCookSteps = newCookSteps
  }

  if (deleteCookStepsId.length > 0) {
    recipeUpdateRequest.deleteCookStepsId = deleteCookStepsId
  }
  formData.append('recipeUpdateRequest', JSON.stringify(recipeUpdateRequest))

  const { payload } = await requester<Response>({
    method: 'put',
    url: `/api/admin/update/${recipeId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const deleteRecipe = async (ids: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/recipe/ids=${ids}`,
  })
  return payload
}

export const getPosts = async (
  postId: number | null,
  loginId: string | null,
  recipeTitle: string | null,
  postTitle: string | null,
) => {
  const params = new URLSearchParams({
    ...(loginId && { 'login-id': loginId }),
    ...(recipeTitle && { 'recipe-title': recipeTitle }),
    ...(postTitle && { 'post-title': postTitle }),
    ...(postId !== null && { 'post-id': String(postId) }),
    page: '0',
    size: '10',
    sort: 'string',
  })
  const { payload } = await requester<Posts>({
    method: 'get',
    url: `/api/search?${params.toString()}`,
  })
  return payload
}

export const deletePosts = async (ids: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/posts/?ids=${ids}`,
  })
  return payload
}

export const getComments = async (id: number, lastId: number | null) => {
  const { payload } = await requester<Comments>({
    method: 'get',
    url: `/api/admin/posts/comments?post-id=${id}${lastId ? `&last-id=${lastId}` : ''}&page=0&size=10&sort=string`,
  })
  return payload.data
}

export const deleteComments = async (ids: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/posts/comments?ids=${ids}`,
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

export const deleteMembers = async (ids: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/members?ids=${ids}`,
  })
  return payload
}

export const getNotice = async (id: number | null) => {
  const { payload } = await requester<Notices>({
    method: 'get',
    url: `/api/notices?${id ? `last-id=${id}` : ''}&page=0&size=10&sort=string`,
  })
  return payload.data
}

export const getNoticeDetail = async (id: number) => {
  const { payload } = await requester<{ data: NoticeInfo }>({
    method: 'get',
    url: `/api/notice/${id}`,
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
  return payload
}

export const deleteNotice = async (ids: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/notices?ids=${ids}`,
  })
  return payload
}

export const getAllDayVisit = async () => {
  const { payload } = await requester<NumberOfVisitor>({
    method: 'get',
    url: 'api/admin/visit-count/all',
  })
  return payload.data
}

export const getYesterdayVisit = async () => {
  const { payload } = await requester<NumberOfVisitor>({
    method: 'get',
    url: '/api/admin/visit-count/before',
  })
  return payload.data
}

export const getTodayVisit = async () => {
  const { payload } = await requester<NumberOfVisitor>({
    method: 'get',
    url: '/api/admin/visit-count/today',
  })
  return payload.data
}

export const getDailyVisit = async (days: boolean | null) => {
  const { payload } = await requester<DailyVisit>({
    method: 'get',
    url: `/api/admin/visit-count/days${days ? `?days=${days}` : ''}`,
  })
  return payload.data
}

export const getWeeklyVisit = async () => {
  const { payload } = await requester<WeeklyVisit>({
    method: 'get',
    url: `/api/admin/visit-count/week`,
  })
  return payload.data
}
export const getMonthlyVisit = async () => {
  const { payload } = await requester<MonthlyVisit>({
    method: 'get',
    url: `/api/admin/visit-count/month`,
  })
  return payload.data
}

export const getRecipeCount = async () => {
  const { payload } = await requester<{ data: number }>({
    method: 'get',
    url: '/api/admin/recipes/count',
  })
  return payload.data
}

export const getPostCount = async () => {
  const { payload } = await requester<{ data: number }>({
    method: 'get',
    url: '/api/admin/posts/count',
  })
  return payload.data
}

export const getMemberCount = async () => {
  const { payload } = await requester<{ data: number }>({
    method: 'get',
    url: '/api/admin/members/count',
  })
  return payload.data
}

export const getQuestions = async (
  lastId: number | null,
  questionsType: string | null,
  questionStatus: string | null,
) => {
  const params = new URLSearchParams({
    ...(lastId !== null ? { 'last-id': String(lastId) } : {}),
    ...(questionsType ? { 'question-type': questionsType } : {}),
    ...(questionStatus ? { question_status: questionStatus } : {}),
    page: '0',
    size: '10',
    sort: 'string',
  })

  const { payload } = await requester<{ data: Questions }>({
    method: 'get',
    url: `/api/admin/questions?${params.toString()}`,
  })
  return payload.data
}

export const getQuestionsDetail = async (id: number) => {
  const { payload } = await requester<{ data: QuestionDetail }>({
    method: 'get',
    url: `/api/admin/question/${id}`,
  })
  return payload.data
}

export const postAnswer = async (
  id: number,
  title: string,
  content: string,
) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/admin/questions/${id}/answers`,
    data: {
      answer_title: title,
      answer_content: content,
      questionStatus: 'COMPLETED',
    },
  })
  return payload
}

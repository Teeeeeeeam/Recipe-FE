import {
  BlackList,
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

export const getRecipes = async (
  lastId: number | null,
  ingredients: string | null,
  title: string | null,
) => {
  const params = new URLSearchParams({
    ...(ingredients && { ingredients }),
    ...(title && { title }),
    ...(lastId && { lastId: String(lastId) }),
    size: '10',
  }).toString()

  const { payload } = await requester<Recipe>({
    method: 'get',
    url: `/api/recipe/search?${params}`,
  })
  return payload.data
}

export const getRecipeDetail = async (id: string) => {
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
  cookIngredients: string,
  cookMethods: string,
  dishTypes: string,
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
      cookIngredients,
      cookMethods,
      dishTypes,
    }),
  )

  const { payload } = await requester<Response>({
    method: 'post',
    url: '/api/admin/save/recipes',
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
  cookIngredients: string,
  cookMethods: string,
  dishTypes: string,
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
    cookIngredients,
    cookMethods,
    dishTypes,
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

export const deleteRecipe = async (recipeIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/recipes?recipeIds=${recipeIds}`,
  })
  return payload
}

export const getPosts = async (
  lastId: number | null,
  loginId: string | null,
  recipeTitle: string | null,
  postTitle: string | null,
) => {
  const params = new URLSearchParams({
    ...(loginId && { loginId }),
    ...(recipeTitle && { recipeTitle }),
    ...(postTitle && { postTitle }),
    ...(lastId && { lastId: String(lastId) }),
    size: '10',
  }).toString()
  const { payload } = await requester<{ data: Posts }>({
    method: 'get',
    url: `/api/posts/search?${params}`,
  })
  return payload.data
}

export const deletePosts = async (postIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/posts/?postIds=${postIds}`,
  })
  return payload
}

export const getComments = async (postId: number, lastId: number | null) => {
  const { payload } = await requester<Comments>({
    method: 'get',
    url: `/api/admin/posts/${postId}/comments?${lastId ? `&lastId=${lastId}` : ''}&size=10`,
  })
  return payload.data
}

export const deleteComments = async (commentIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/posts/comments?commentIds=${commentIds}`,
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
  const params = new URLSearchParams({
    ...(memberId && { memberId: String(memberId) }),
    ...(loginId && { loginId }),
    ...(username && { username }),
    ...(email && { email }),
    ...(nickname && { nickname }),
    size: '10',
  }).toString()

  const { payload } = await requester<Members>({
    method: 'get',
    url: `/api/admin/members/search?${params}`,
  })
  return payload.data
}

export const deleteMembers = async (memberIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/members?memberIds=${memberIds}`,
  })
  return payload
}

export const getNotices = async (
  lastId: number | null,
  title: string | null,
) => {
  const params = new URLSearchParams({
    ...(lastId && { lastId: String(lastId) }),
    ...(title && { title }),
    size: '10',
  }).toString()

  const { payload } = await requester<Notices>({
    method: 'get',
    url: `/api/notices/search?${params}`,
  })
  return payload.data
}

export const getNoticeDetail = async (noticeId: number) => {
  const { payload } = await requester<{ data: NoticeInfo }>({
    method: 'get',
    url: `/api/notices/${noticeId}`,
  })
  return payload.data
}

export const postNotice = async (
  title: string,
  content: string,
  file: File | null,
) => {
  const formData = new FormData()
  file && formData.append('file', file)
  formData.append(
    'adminAddRequest',
    JSON.stringify({
      noticeTitle: title,
      noticeContent: content,
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

export const updateNotice = async (
  title: string,
  content: string,
  noticeId: number,
  file: File | null,
) => {
  const formData = new FormData()
  file && formData.append('file', file)
  formData.append(
    'adminUpdateRequest',
    JSON.stringify({
      noticeContent: content,
      noticeTitle: title,
    }),
  )
  const { payload } = await requester<Response>({
    method: 'put',
    url: `/api/admin/notices/${noticeId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return payload
}

export const deleteNotice = async (noticeIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/notices?noticeIds=${noticeIds}`,
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
  questionType: string | null,
  questionStatus: string | null,
) => {
  const params = new URLSearchParams({
    ...(lastId ? { lastId: String(lastId) } : {}),
    ...(questionType ? { questionType } : {}),
    ...(questionStatus ? { questionStatus } : {}),
    size: '10',
  }).toString()

  const { payload } = await requester<{ data: Questions }>({
    method: 'get',
    url: `/api/admin/questions?${params}`,
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
  questionId: number,
  title: string,
  content: string,
) => {
  const { payload } = await requester<Response>({
    method: 'post',
    url: `/api/admin/questions/${questionId}/answers`,
    data: {
      answerTitle: title,
      answerContent: content,
      questionStatus: 'COMPLETED',
    },
  })
  return payload
}

export const getBlackList = async (
  lastId: number | null,
  email: string | null,
) => {
  const params = new URLSearchParams({
    ...(lastId ? { lastId: String(lastId) } : {}),
    ...(email ? { email } : {}),
    size: '10',
  }).toString()

  const { payload } = await requester<BlackList>({
    method: 'get',
    url: `/api/admin/black/search?${params}`,
  })
  return payload.data
}

export const deleteBlackList = async (blacklistIds: number[]) => {
  const { payload } = await requester<Response>({
    method: 'delete',
    url: `/api/admin/blacklist?blacklistIds=${blacklistIds}`,
  })
  return payload
}

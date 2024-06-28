import { Response } from './auth'

export interface Recipe extends Response {
  data: { recipeDtoList: RecipeDtoList[]; nextPage: boolean }
}

export interface RecipeData {
  recipeDtoList: RecipeDtoList[]
  lastId: number
  nextPage: boolean
}

export interface RecipeDtoList {
  id: number
  imageUrl: string | null
  title: string | null
  cookingLevel: string
  people: string | null
  cookingTime: string
  likeCount: number
  createdAt: string
}

export interface RecipeForm extends Response {
  data: {
    recipe: {
      id: number
      imageUrl: string
      title: string
      cookingLevel: string
      people: string
      cookingTime: string
      likeCount: number
      cookIngredients: string
      cookMethods: string
      dishTypes: string
    }
    ingredients: string[]
    cookSteps: CookStep[]
  }
}
export interface CookStep {
  cookStepId: string
  cookSteps: string
}
export interface NewCookStep {
  newCookSteps: string
}
export interface Posts {
  nextPage: boolean
  posts: PostInfo[]
}
export interface PostInfo {
  id: number
  postTitle: string
  createdAt: string
  postImageUrl: string
  member: { nickname: string; loginId: string }
  recipe: { id: number; title: string }
}

export interface Comment {
  id: number
  commentContent: string
  member: {
    nickname: string
    loginId: string
    username: string
  }
  createdAt: string
}
export interface Comments extends Response {
  data: {
    nextPage: false
    comment: Comment[]
  }
}
export interface MemberInfo {
  id: number
  username: string
  nickname: string
  loginId: string
  email: string
}

export interface Members extends Response {
  data: {
    memberInfoes: MemberInfo[]
    nextPage: boolean
  }
}

export interface NoticeInfo {
  id: number
  noticeTitle: string
  noticeContent: string
  createdAt: string
  imgUrl: string
  member: {
    id: number
    nickname: string
  }
}
export interface Notices extends Response {
  data: {
    nextPage: boolean
    notice: NoticeInfo[]
  }
}

export interface DailyVisitInfo {
  date: string
  count: number
}

export interface DailyVisit {
  data: DailyVisitInfo[]
}

export interface WeeklyVisitInfo {
  week: string
  count: number
}
export interface WeeklyVisit {
  data: WeeklyVisitInfo[]
}

export interface MonthlyVisitInfo {
  month: string
  count: number
}
export interface MonthlyVisit {
  data: MonthlyVisitInfo[]
}
export interface NumberOfVisitor {
  data: number
}

export interface QuestionInfo {
  id: number
  questionType: 'ACCOUNT_INQUIRY' | 'GENERAL_INQUIRY'
  title: string
  status: 'PENDING' | 'COMPLETED'
  createdAt: string
  imgUrl: string
  member: {
    id: number
    loginId: string
  }
}

export interface Questions {
  nextPage: boolean
  questions: QuestionInfo[]
}

export interface QuestionDetail {
  questionType: 'ACCOUNT_INQUIRY' | 'GENERAL_INQUIRY'
  title: string
  questionContent: string
  status: 'PENDING' | 'COMPLETED'
  imgUrl: string
  answerType: string
  createdAt: string
  answerEmail: string
  member?: { id: number; nickname: string; loginId: string }
}

export interface BlackListInfo {
  id: number
  email: string
  blackCheck: boolean
}

export interface BlackList {
  data: {
    nextPage: boolean
    blackList: BlackListInfo[]
  }
}

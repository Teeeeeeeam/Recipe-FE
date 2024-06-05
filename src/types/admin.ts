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
    }
    ingredients: string[]
    cookStep: CookStep[]
  }
}
export interface CookStep {
  cook_step_id?: string
  cook_steps: string
}

export interface Posts {
  nextPage: boolean
  posts: PostList[]
}
export interface PostList {
  id: number
  postTitle: string
  create_at: string
  postImageUrl: string
  member: { nickName: string; loginId: string }
  recipe: { id: number; title: string }
}

export interface Comment {
  id: number
  comment_content: string
  member: {
    nickname: string
    loginId: string
    username: string
  }
  create_at: string
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
    memberInfos: MemberInfo[]
    nextPage: boolean
  }
}

export interface NoticeInfo {
  id: number
  noticeTitle: string
  noticeContent: string
  created_at: string
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

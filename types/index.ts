export type UserT = {
  id: number
  name: string
  email: string
  age: number
  role: string
  createdAt: string
}

export type SortByT = 'age' | 'createdAt' | null

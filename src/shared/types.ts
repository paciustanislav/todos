
export interface TodoEntity {
  id: number
  name: string
  completed: boolean
  description?: string | null
}

export interface Filters {
  completed?: boolean
}
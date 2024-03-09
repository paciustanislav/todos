
export interface TodoEntity {
  id: number
  name: string
  description?: string | null
  completed?: boolean | null
  expired_at?: string | null
}

export type User = {
  id: string
  password: string
  needsPasswordReset?: boolean
  role: 'admin' | 'student' | 'faculty'
  isDeleted?: boolean
  status?: 'in-progress' | 'active' | 'inactive' | 'pending'| 'blocked'
}


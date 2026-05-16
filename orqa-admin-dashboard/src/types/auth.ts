export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'Admin'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  token: string
}
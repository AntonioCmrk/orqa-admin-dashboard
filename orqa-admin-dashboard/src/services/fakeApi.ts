import type { LoginCredentials, LoginResponse } from '../types/auth'

export async function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.')
  }

  return {
    token: 'admin-token',
    user: {
      id: '1',
      name: 'Admin Admin',
      email: credentials.email,
      role: 'Admin',
    },
  }
}
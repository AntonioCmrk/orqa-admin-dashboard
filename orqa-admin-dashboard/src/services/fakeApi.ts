import type { LoginCredentials, LoginResponse } from '../types/auth'

const DEMO_EMAIL = 'admin@orqa.com'
const DEMO_PASSWORD = 'password'

export async function loginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.')
  }

  if (
    credentials.email.trim().toLowerCase() !== DEMO_EMAIL ||
    credentials.password !== DEMO_PASSWORD
  ) {
    throw new Error('Wrong email or password.')
  }

  return {
    token: 'admin-token',
    user: {
      id: '1',
      name: 'Admin Admin',
      email: DEMO_EMAIL,
      role: 'Admin',
    },
  }
}

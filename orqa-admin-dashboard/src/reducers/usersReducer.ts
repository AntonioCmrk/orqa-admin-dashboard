import type { User } from '../types/user'

export type UsersAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }

export function usersReducer(users: User[], action: UsersAction): User[] {
  switch (action.type) {
    case 'ADD_USER':
      return [...users, action.payload]

    case 'UPDATE_USER':
      return users.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      )

    case 'DELETE_USER':
      return users.filter((user) => user.id !== action.payload)

    default:
      return users
  }
}
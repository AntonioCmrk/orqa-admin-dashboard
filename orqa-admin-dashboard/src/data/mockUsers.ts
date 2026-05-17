import type { User } from '../types/user'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ivo Ivic',
    email: 'iivic@mail.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Marko Markic',
    email: 'mmarkic@mail.com',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Ana Anic',
    email: 'aanic@mail.com',
    role: 'Viewer',
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'Marin Maric',
    email: 'mmaric@mail.com',
    role: 'Admin',
    status: 'Active',
  },
]
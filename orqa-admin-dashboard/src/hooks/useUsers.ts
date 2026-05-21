import { useEffect, useMemo, useReducer, useState } from 'react'
import { mockUsers } from '../data/mockUsers'
import { usersReducer } from '../reducers/usersReducer'
import type { User, UserRole } from '../types/user'
import { sortUsers, type UserSortConfig } from '../utils/users'

export const USERS_STORAGE_KEY = 'orqa-users'

function getStoredUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)

  if (!storedUsers) {
    return mockUsers
  }

  try {
    return JSON.parse(storedUsers) as User[]
  } catch {
    localStorage.removeItem(USERS_STORAGE_KEY)
    return mockUsers
  }
}

export function useUsers() {
  const [users, dispatch] = useReducer(usersReducer, undefined, getStoredUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole | 'All'>('All')
  const [sortConfig, setSortConfig] = useState<UserSortConfig>({
    key: 'name',
    direction: 'asc',
  })

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  }, [users])

  const filteredUsers = useMemo(() => {
    const matchingUsers = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = selectedRole === 'All' || user.role === selectedRole

      return matchesSearch && matchesRole
    })

    return sortUsers(matchingUsers, sortConfig)
  }, [users, searchTerm, selectedRole, sortConfig])

  function handleSortChange(key: UserSortConfig['key']) {
    setSortConfig((currentSortConfig) => {
      if (currentSortConfig.key !== key) {
        return { key, direction: 'asc' }
      }

      return {
        key,
        direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
      }
    })
  }

  function addUser(user: User) {
    dispatch({ type: 'ADD_USER', payload: user })
  }

  function updateUser(user: User) {
    dispatch({ type: 'UPDATE_USER', payload: user })
  }

  function deleteUser(userId: string) {
    dispatch({ type: 'DELETE_USER', payload: userId })
  }

  return {
    users,
    filteredUsers,
    searchTerm,
    selectedRole,
    sortConfig,
    setSearchTerm,
    setSelectedRole,
    handleSortChange,
    addUser,
    updateUser,
    deleteUser,
  }
}

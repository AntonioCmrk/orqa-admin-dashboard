import { useMemo, useReducer, useState } from 'react'
import { mockUsers } from '../data/mockUsers'
import { usersReducer } from '../reducers/usersReducer'
import type { User, UserRole } from '../types/user'

export function useUsers() {
  const [users, dispatch] = useReducer(usersReducer, mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole | 'All'>('All')

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = selectedRole === 'All' || user.role === selectedRole

      return matchesSearch && matchesRole
    })
  }, [users, searchTerm, selectedRole])

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
    setSearchTerm,
    setSelectedRole,
    addUser,
    updateUser,
    deleteUser,
  }
}
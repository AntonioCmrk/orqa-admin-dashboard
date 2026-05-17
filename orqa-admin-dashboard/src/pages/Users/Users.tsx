import { useState } from "react";
import { UserFilters } from "../../components/users/UserFilters";
import { UserModal } from "../../components/users/UserModal";
import { UsersTable } from "../../components/users/UsersTable";
import { useUsers } from "../../hooks/useUsers";
import { DeleteConfirmationModal } from "../../components/users/DeleteConfirmationModal";
import type { User } from "../../types/user";
import "./Users.css";

export function Users() {
  const {
    filteredUsers,
    searchTerm,
    selectedRole,
    setSearchTerm,
    setSelectedRole,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  function handleAddUser() {
    setUserToEdit(null);
    setIsModalOpen(true);
  }

  function handleEditUser(user: User) {
    setUserToEdit(user);
    setIsModalOpen(true);
  }

  function handleSubmitUser(user: User) {
    if (userToEdit) {
      updateUser(user);
      return;
    }

    addUser(user);
  }

  return (
    <div className="users-page">
      <section className="users-page__header">
        <div>
          <p className="users-page__eyebrow">Administration</p>
          <h2>User Management</h2>
          <p>Manage users, roles, and account status from one place.</p>
        </div>

        <button type="button" onClick={handleAddUser}>
          + Add User
        </button>
      </section>

      <section className="users-page__panel">
        <UserFilters
          searchTerm={searchTerm}
          selectedRole={selectedRole}
          onSearchChange={setSearchTerm}
          onRoleChange={setSelectedRole}
        />

        <UsersTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={setUserToDelete}
        />
      </section>

      <UserModal
        isOpen={isModalOpen}
        userToEdit={userToEdit}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitUser}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete);
          }

          setUserToDelete(null);
        }}
      />
    </div>
  );
}

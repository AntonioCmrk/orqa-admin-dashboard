import { useState } from "react";
import { UserFilters } from "../../components/users/UserFilters";
import { UserModal } from "../../components/users/UserModal";
import { UsersTable } from "../../components/users/UsersTable";
import { useUsers } from "../../hooks/useUsers";
import { DeleteConfirmationModal } from "../../components/users/DeleteConfirmationModal";
import { useToast } from "../../hooks/useToast";
import type { User } from "../../types/user";
import "./Users.css";

export function Users() {
  const {
    filteredUsers,
    users,
    searchTerm,
    selectedRole,
    sortConfig,
    setSearchTerm,
    setSelectedRole,
    handleSortChange,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { showToast } = useToast();

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
      showToast("User updated successfully.");
      return;
    }

    addUser(user);
    showToast("User created successfully.");
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
          resultsCount={filteredUsers.length}
          onSearchChange={setSearchTerm}
          onRoleChange={setSelectedRole}
        />

        <UsersTable
          users={filteredUsers}
          sortConfig={sortConfig}
          onSort={handleSortChange}
          onEdit={handleEditUser}
          onDelete={setUserToDelete}
        />
      </section>

      <UserModal
        isOpen={isModalOpen}
        userToEdit={userToEdit}
        existingUsers={users}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitUser}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete);
            showToast("User deleted successfully.");
          }

          setUserToDelete(null);
        }}
      />
    </div>
  );
}

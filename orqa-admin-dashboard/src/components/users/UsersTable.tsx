import type { User } from "../../types/user";
import "./UsersTable.css";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  if (users.length === 0) {
    return <p className="users-table__empty">No users found.</p>;
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th aria-label="Actions" />
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="users-table__user">
                  <span className="users-table__avatar">
                    {getInitials(user.name)}
                  </span>
                  <strong>{user.name}</strong>
                </div>
              </td>

              <td>{user.email}</td>

              <td>
                <span className={`badge badge--${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className={`status status--${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>

              <td>
                <div className="users-table__actions">
                  <button type="button" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="users-table__delete"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

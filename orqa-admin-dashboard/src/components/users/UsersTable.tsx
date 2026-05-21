import type { User } from "../../types/user";
import type { UserSortConfig, UserSortKey } from "../../utils/users";
import "./UsersTable.css";

interface UsersTableProps {
  users: User[];
  sortConfig: UserSortConfig;
  onSort: (key: UserSortKey) => void;
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

const columns: Array<{ key: UserSortKey; label: string }> = [
  { key: "name", label: "User" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

export function UsersTable({
  users,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="users-table__empty">
        <strong>No users found.</strong>
        <span>Try changing the search term or role filter.</span>
      </div>
    );
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className="users-table__sort"
                  onClick={() => onSort(column.key)}
                  aria-sort={
                    sortConfig.key === column.key
                      ? sortConfig.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <span>{column.label}</span>
                  <span aria-hidden="true">
                    {sortConfig.key === column.key
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </button>
              </th>
            ))}
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

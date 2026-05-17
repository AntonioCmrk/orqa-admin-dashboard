import type { UserRole } from "../../types/user";
import "./UserFilters.css";

interface UserFiltersProps {
  searchTerm: string;
  selectedRole: UserRole | "All";
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "All") => void;
}

export function UserFilters({
  searchTerm,
  selectedRole,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="user-filters">
      <input
        type="search"
        value={searchTerm}
        placeholder="Search users..."
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        value={selectedRole}
        onChange={(event) =>
          onRoleChange(event.target.value as UserRole | "All")
        }
      >
        <option value="All">All roles</option>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
    </div>
  );
}

import type { UserRole } from "../../types/user";
import "./UserFilters.css";

interface UserFiltersProps {
  searchTerm: string;
  selectedRole: UserRole | "All";
  resultsCount: number;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "All") => void;
}

export function UserFilters({
  searchTerm,
  selectedRole,
  resultsCount,
  onSearchChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="user-filters" aria-label="User filters">
      <label>
        <span>Search</span>
        <input
          type="search"
          value={searchTerm}
          placeholder="Search users..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        <span>Role</span>
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
      </label>

      <p className="user-filters__count" aria-live="polite">
        {resultsCount} {resultsCount === 1 ? "result" : "results"}
      </p>
    </div>
  );
}

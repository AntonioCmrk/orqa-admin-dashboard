import type { User } from "../types/user";

export type UserSortKey = "name" | "email" | "role" | "status";
export type SortDirection = "asc" | "desc";

export interface UserSortConfig {
  key: UserSortKey;
  direction: SortDirection;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  admins: number;
  inactiveUsers: number;
}

export function sortUsers(users: User[], sortConfig: UserSortConfig) {
  return [...users].sort((firstUser, secondUser) => {
    const firstValue = firstUser[sortConfig.key].toLowerCase();
    const secondValue = secondUser[sortConfig.key].toLowerCase();
    const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;

    return firstValue.localeCompare(secondValue) * directionMultiplier;
  });
}

export function hasDuplicateEmail(
  users: User[],
  email: string,
  currentUserId?: string,
) {
  const normalizedEmail = email.trim().toLowerCase();

  return users.some(
    (user) =>
      user.email.trim().toLowerCase() === normalizedEmail &&
      user.id !== currentUserId,
  );
}

export function getUserStats(users: User[]): UserStats {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === "Active").length,
    admins: users.filter((user) => user.role === "Admin").length,
    inactiveUsers: users.filter((user) => user.status === "Inactive").length,
  };
}

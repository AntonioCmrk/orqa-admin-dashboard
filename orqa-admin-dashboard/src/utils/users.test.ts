import { describe, expect, it } from "vitest";
import type { User } from "../types/user";
import { getUserStats, hasDuplicateEmail, sortUsers } from "./users";

const users: User[] = [
  {
    id: "1",
    name: "Marko Markic",
    email: "marko@mail.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: "2",
    name: "Ana Anic",
    email: "ana@mail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "3",
    name: "Ivo Ivic",
    email: "ivo@mail.com",
    role: "Editor",
    status: "Active",
  },
];

describe("user utilities", () => {
  it("sorts users by the selected column and direction", () => {
    expect(
      sortUsers(users, { key: "name", direction: "asc" }).map(
        (user) => user.name,
      ),
    ).toEqual(["Ana Anic", "Ivo Ivic", "Marko Markic"]);

    expect(
      sortUsers(users, { key: "email", direction: "desc" }).map(
        (user) => user.email,
      ),
    ).toEqual(["marko@mail.com", "ivo@mail.com", "ana@mail.com"]);
  });

  it("detects duplicate emails while allowing the currently edited user", () => {
    expect(hasDuplicateEmail(users, " ANA@mail.com ")).toBe(true);
    expect(hasDuplicateEmail(users, "ana@mail.com", "2")).toBe(false);
  });

  it("calculates dashboard user stats", () => {
    expect(getUserStats(users)).toEqual({
      totalUsers: 3,
      activeUsers: 2,
      admins: 1,
      inactiveUsers: 1,
    });
  });
});

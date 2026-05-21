import { describe, expect, it } from "vitest";
import type { User } from "../types/user";
import { usersReducer } from "./usersReducer";

const users: User[] = [
  {
    id: "1",
    name: "Ana Anic",
    email: "ana@mail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Marko Markic",
    email: "marko@mail.com",
    role: "Viewer",
    status: "Inactive",
  },
];

describe("usersReducer", () => {
  it("adds, updates, and deletes users without mutating previous state", () => {
    const addedUser: User = {
      id: "3",
      name: "Ivo Ivic",
      email: "ivo@mail.com",
      role: "Editor",
      status: "Active",
    };

    const afterAdd = usersReducer(users, {
      type: "ADD_USER",
      payload: addedUser,
    });

    expect(afterAdd).toHaveLength(3);
    expect(users).toHaveLength(2);

    const afterUpdate = usersReducer(afterAdd, {
      type: "UPDATE_USER",
      payload: { ...addedUser, role: "Admin" },
    });

    expect(afterUpdate.find((user) => user.id === "3")?.role).toBe("Admin");

    const afterDelete = usersReducer(afterUpdate, {
      type: "DELETE_USER",
      payload: "2",
    });

    expect(afterDelete.map((user) => user.id)).toEqual(["1", "3"]);
  });
});

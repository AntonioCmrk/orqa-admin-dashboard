import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { User } from "../../types/user";
import { UserModal } from "./UserModal";

const existingUsers: User[] = [
  {
    id: "1",
    name: "Ana Anic",
    email: "ana@mail.com",
    role: "Admin",
    status: "Active",
  },
];

afterEach(() => {
  cleanup();
});

describe("UserModal", () => {
  it("shows validation feedback for invalid and duplicate user data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <UserModal
        isOpen
        userToEdit={null}
        existingUsers={existingUsers}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText("Name"), "A");
    await user.type(screen.getByLabelText("Email"), "ana@mail.com");
    await user.click(screen.getByRole("button", { name: "Create user" }));

    expect(
      screen.getByText("Name must contain at least 2 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A user with this email already exists."),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits trimmed, normalized data when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <UserModal
        isOpen
        userToEdit={null}
        existingUsers={existingUsers}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText("Name"), "  Marko Markic  ");
    await user.type(screen.getByLabelText("Email"), "  Marko@mail.com  ");
    await user.click(screen.getByRole("button", { name: "Create user" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Marko Markic",
        email: "marko@mail.com",
      }),
    );
    expect(onClose).toHaveBeenCalled();
  });
});

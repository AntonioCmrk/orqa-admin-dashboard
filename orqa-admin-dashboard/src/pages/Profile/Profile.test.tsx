import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthContext } from "../../context/AuthContextValue";
import type { AuthContextValue } from "../../context/AuthContextValue";
import { ToastContext } from "../../context/ToastContextValue";
import type { ToastContextValue } from "../../context/ToastContextValue";
import { Profile } from "./Profile";

const authValue: AuthContextValue = {
  user: {
    id: "1",
    name: "Admin Admin",
    email: "admin@orqa.com",
    role: "Admin",
  },
  isAuthenticated: true,
  isLoading: false,
  login: vi.fn(),
  logout: vi.fn(),
};

function renderProfile(toastValue: ToastContextValue = { showToast: vi.fn() }) {
  return render(
    <AuthContext.Provider value={authValue}>
      <ToastContext.Provider value={toastValue}>
        <Profile />
      </ToastContext.Provider>
    </AuthContext.Provider>,
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.useRealTimers();
});

describe("Profile", () => {
  it("shows inline validation errors for invalid profile data", async () => {
    const user = userEvent.setup();

    renderProfile();

    await user.clear(screen.getByLabelText("Full Name"));
    await user.type(screen.getByLabelText("Full Name"), "A");
    await user.clear(screen.getByLabelText("Email Address"));
    await user.type(screen.getByLabelText("Email Address"), "invalid-email");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(
      screen.getByText("Full name must contain at least 2 characters."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(localStorage.getItem("orqa-profile-settings")).toBeNull();
  });

  it("saves trimmed and normalized profile settings when valid", async () => {
    const user = userEvent.setup();
    const showToast = vi.fn();

    renderProfile({ showToast });

    await user.clear(screen.getByLabelText("Full Name"));
    await user.type(screen.getByLabelText("Full Name"), "  Ana Admin  ");
    await user.clear(screen.getByLabelText("Email Address"));
    await user.type(screen.getByLabelText("Email Address"), "  Ana@mail.com  ");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => {
      expect(
        JSON.parse(localStorage.getItem("orqa-profile-settings") ?? "{}"),
      ).toMatchObject({
        fullName: "Ana Admin",
        email: "ana@mail.com",
      });
    });

    expect(showToast).toHaveBeenCalledWith(
      "Profile settings saved successfully.",
    );
  });
});

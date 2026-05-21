import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AuthContext } from "../../context/AuthContextValue";
import type { AuthContextValue } from "../../context/AuthContextValue";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

function renderWithAuth(value: Partial<AuthContextValue>, initialPath: string) {
  const authValue: AuthContextValue = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    ...value,
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<p>Private dashboard</p>} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<p>Login page</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe("route guards", () => {
  it("redirects unauthenticated users away from protected routes", () => {
    renderWithAuth({}, "/dashboard");

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("redirects authenticated users away from the login route", () => {
    renderWithAuth(
      {
        user: {
          id: "1",
          name: "Admin Admin",
          email: "admin@orqa.com",
          role: "Admin",
        },
        isAuthenticated: true,
      },
      "/login",
    );

    expect(screen.getByText("Private dashboard")).toBeInTheDocument();
  });
});

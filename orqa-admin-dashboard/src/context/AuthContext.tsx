import { useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContextValue";
import { loginRequest } from "../services/fakeApi";
import type { AuthUser, LoginCredentials } from "../types/auth";

const STORAGE_KEY = "orqa-auth";

interface StoredAuth {
  user: AuthUser;
  token: string;
}

function getStoredUser() {
  const storedAuth = localStorage.getItem(STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    const parsedAuth = JSON.parse(storedAuth) as StoredAuth;
    return parsedAuth.user;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  async function login(credentials: LoginCredentials) {
    const response = await loginRequest(credentials);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: response.user,
        token: response.token,
      }),
    );

    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

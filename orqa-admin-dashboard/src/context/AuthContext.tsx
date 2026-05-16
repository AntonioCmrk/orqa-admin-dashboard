import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loginRequest } from "../services/fakeApi";
import type { AuthUser, LoginCredentials } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "orqa-auth";

interface StoredAuth {
  user: AuthUser;
  token: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);

    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth) as StoredAuth;
      setUser(parsedAuth.user);
    }

    setIsLoading(false);
  }, []);

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
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

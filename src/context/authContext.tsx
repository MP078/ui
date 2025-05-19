import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { auth } from "../lib/api";

export type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        await auth.checkAuth();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await auth.login(email, password);
    const token = response.headers?.["access-token"];

    if (token) {
      localStorage.setItem("token", token);
    }
    setAuthenticated(true);
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const response = await auth.register(userData);
    const token = response.headers?.["access-token"];

    if (token) {
      localStorage.setItem("token", token);
    }
    setAuthenticated(true);
  };

  const logout = async () => {
    await auth.logout();
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

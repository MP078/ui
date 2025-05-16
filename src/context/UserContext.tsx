import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../lib/api";

export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  image_url: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const getAvatarNumber = (input: string): number => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 10) + 1;
};

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await auth.checkAuth();
        const backendUser = res.data;

        const formattedUser: User = {
          id: backendUser.id,
          name: backendUser.name,
          username: backendUser.username,
          email: backendUser.email,
          image_url:
            backendUser.image_url ||
            `/avatars/${getAvatarNumber(backendUser.id.toString())}.png`,
        };

        setUser(formattedUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching user:", error.message);
        } else {
          console.error("Unknown error fetching user");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

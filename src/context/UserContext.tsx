import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../lib/api";

export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  image_url: string;
  verified: boolean | false;
  total_trips: number | 0;
  travel_days: number | 0;
  connections: number | 0;
  member_since: string | "";
  interests: string[] | [];
  languages: string[] | [];
  website: string | "";
  certifications: string[] | [];
  bio: string | "";
  about: string | "";
  location: string | "";
  phone: string | "";
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const getAvatarNumber = (input: string): number => {
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

        const {
          id,
          name,
          username,
          email,
          profile_image,
          verified,
          total_trips,
          travel_days,
          connections,
          member_since,
          interests,
          languages,
          website,
          certifications,
          bio,
          location,
          about,
          phone,
        } = backendUser;

        const formattedUser: User = {
          id,
          name,
          username,
          email,
          image_url:
            profile_image || `/avatars/${getAvatarNumber(id.toString())}.png`,
          verified,
          total_trips,
          travel_days,
          connections,
          member_since,
          interests,
          languages,
          website,
          certifications,
          bio,
          about,
          phone,
          location,
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

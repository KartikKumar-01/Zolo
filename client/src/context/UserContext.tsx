import { createContext, useState, type ReactNode } from "react";
import type { User } from "@/types/auth.types";

interface UserContextType {
  user: User | null;
  isAutheticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };
  return (
    <UserContext.Provider value={undefined}>{children}</UserContext.Provider>
  );
};

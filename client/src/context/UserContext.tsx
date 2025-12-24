import { createContext, useState, type ReactNode } from "react";
import type { User } from "@/types/auth.types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("USER CONTEXT STATE →", user);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

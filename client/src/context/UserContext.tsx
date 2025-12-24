import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types/auth.types";
import api from "@/api/api";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("accessToken")
    if(!token){
      setLoading(false);
      return;
    }
  
    const fetchMe = async () => {
      try{
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      }
      catch (err) {
          localStorage.removeItem("accessToken");
          setUser(null);
        } finally {
          setLoading(false);
        }
    }
    fetchMe();
  }, [])

  console.log("USER CONTEXT STATE →", user);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

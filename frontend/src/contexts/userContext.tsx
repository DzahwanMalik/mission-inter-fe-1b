import React, { createContext, useEffect, useState } from "react";
import type User from "../types/user";

type UserContextType = {
  user: User | null;
  setUser: (value: User | null) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (user) setUser(JSON.parse(user));

    setLoading(false);
  }, []);

  // Save data to local storage when the user changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  saveUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setName(user);
      }
    };
    loadUser();
  }, []);

  const saveUser = async () => {
    let randomTag = (Math.random() + 1).toString(36).substring(7);
    const userName = `${name}#${randomTag}`;
    await AsyncStorage.setItem("user", userName);
    setName(userName);
  };

  return (
    <UserContext.Provider value={{ name, setName, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

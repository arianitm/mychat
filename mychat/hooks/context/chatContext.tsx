import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ChatContextType = {
  userName: string | null;
  setUserName: (name: string) => void;
  chatId: string | null;
  setChatId: (id: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedChatId = await AsyncStorage.getItem("currentChatId");

      //   if (storedUser) setUserName(storedUser);
      setUserName(storedUser);
      if (storedChatId) setChatId(storedChatId);
    };

    loadData();
  }, []);

  return (
    <ChatContext.Provider value={{ userName, setUserName, chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within an ChatProvider");
  }
  return context;
};

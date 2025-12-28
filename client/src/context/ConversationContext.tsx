import type { Conversation } from "@/types/conversation.types";
import type { MessageResponse } from "@/types/message.types";
import React, { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface ConversationContextType {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  messages: MessageResponse[];
  setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
}

export const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  return (
    <ConversationContext.Provider
      value={{ selectedConversation, setSelectedConversation, messages, setMessages }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;

import { socket } from "@/lib/socket";
import type { Conversation } from "@/types/conversation.types";
import type { MessageResponse } from "@/types/message.types";
import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface ConversationContextType {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  messages: MessageResponse[];
  setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
}

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversation, _setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);

  const prevConversationIdRef = useRef<string | null>(null);

  const setSelectedConversation = (conversation: Conversation | null) => {
    _setSelectedConversation(conversation);
    setMessages([]);
  }

  useEffect(() => {
    if(!selectedConversation) return;

    const conversationId = selectedConversation._id;

    if(prevConversationIdRef.current && prevConversationIdRef.current !== conversationId){
      socket.emit("leave-conversation", prevConversationIdRef.current);
    }

    socket.emit("join-conversation", conversationId);
    prevConversationIdRef.current = conversationId;
    console.log("Room connected for conversation id: ", conversationId);

    return () => {
      socket.emit("leave-conversation", conversationId);
    }
  }, [selectedConversation])


  useEffect(() => {
    const handleNewMessage = (message : MessageResponse) => {
      if(message.conversationId !== selectedConversation?._id) return;

      setMessages((prev) => [...prev, message]);
    }

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new")
    }
  }, [selectedConversation?._id])

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;

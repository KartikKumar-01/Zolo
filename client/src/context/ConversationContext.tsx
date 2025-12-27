import type { Conversation } from '@/types/conversation.types'
import React, { createContext, useState, type ReactNode } from 'react'

interface ConversationContextType {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

export const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({children} : {children: ReactNode}) => {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  return (
    <ConversationContext.Provider value={{selectedConversation, setSelectedConversation}}>
        {children}
    </ConversationContext.Provider>
    
  )
}

export default ConversationProvider

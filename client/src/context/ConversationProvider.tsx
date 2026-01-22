import {socket} from "@/lib/socket";
import type {Conversation} from "@/types/conversation.types";
import type {MessageResponse} from "@/types/message.types";
import {
    createContext,
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";

interface ConversationContextType {
    conversations: Conversation[];
    addConversation: (conversation: Conversation) => void;
    setConversations: Dispatch<SetStateAction<Conversation[]>>;
    selectedConversation: Conversation | null;
    setSelectedConversation: (conversation: Conversation | null) => void;
    messages: MessageResponse[];
    setMessages: Dispatch<SetStateAction<MessageResponse[]>>;
}

export const ConversationContext =
    createContext<ConversationContextType | null>(null);

export const ConversationProvider = ({children}: { children: ReactNode }) => {
    const [selectedConversation, _setSelectedConversation] =
        useState<Conversation | null>(null);
    const [messages, setMessages] = useState<MessageResponse[]>([]);

    const prevConversationIdRef = useRef<string | null>(null);

    const [conversations, setConversations] = useState<Conversation[]>([]);

    const setSelectedConversation = (conversation: Conversation | null) => {
        _setSelectedConversation((prev) => {
            if(prev?._id === conversation?._id) return prev;
            setMessages([]);
            return conversation;
        });
    }

    const addConversation = (conversation: Conversation) => {
        setConversations((prev) => {
            const exists = prev.some((c) => c._id === conversation._id);
            if (exists) return prev;
            return [conversation, ...prev];
        });
    };

    useEffect(() => {
        if (!selectedConversation) return;

        const conversationId = selectedConversation._id;

        if (prevConversationIdRef.current && prevConversationIdRef.current !== conversationId) {
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
        const handleNewMessage = (message: MessageResponse) => {
            if (message.conversationId !== selectedConversation?._id) return;

            setMessages((prev) => [...prev, message]);
        }

        socket.on("message:new", handleNewMessage);

        return () => {
            socket.off("message:new", handleNewMessage)
        }
    }, [selectedConversation?._id])

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                addConversation,
                setConversations,
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

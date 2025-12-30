import EmptyMessages from "./EmptyMessages";
import { useConversation } from "@/context/useConversation";
import { useUser } from "@/context/useUser";
import ChatMessage from "./ChatMessage";
import { fetchMessages } from "@/api/messages";
import { useEffect, useState } from "react";

const MessagesArea = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const isEmpty = !selectedConversation?.lastMessage && messages.length === 0;

  useEffect(() => {
    if (!selectedConversation?._id) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const data = await fetchMessages({
          conversationId: selectedConversation._id,
        });
        setMessages(data);
      } catch (err) {
        console.log("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [selectedConversation?._id, setMessages]);
  return (

    
    <div className={`flex-1 flex flex-col items-center ${isEmpty ? "justify-center" : "justify-end"} text-center p-6 max-w-[95%] overflow-y-auto`}>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading message....</div>
      ) : (isEmpty ? (
        <EmptyMessages />
      ) : (
        <>
          {messages.map((msg) => (
            <ChatMessage
              key={msg._id}
              content={msg.content}
              isOwn={msg.sender === user?._id}
            />
          ))}
        </>
      ))}
    </div>
  );
};

export default MessagesArea;

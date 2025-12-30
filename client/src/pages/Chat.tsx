import { fetchConversations } from "@/api/conversations";
import ChatArea from "@/components/chat/ChatArea";
import ChatList from "@/components/chat/ChatList";
import Sidebar from "@/components/chat/Sidebar";
import "@/styles.css";
import type { Conversation } from "@/types/conversation.types";
import { useEffect, useState } from "react";

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    fetchConversations().then(setConversations);
  }, []);
  return (
    <div className="main relative h-screen w-screen overflow-hidden grid grid-cols-[60px_1fr]">
      <Sidebar />
      <div className="chat flex overflow-hidden w-full h-full">
        <ChatList conversations={conversations}/>
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;

import { fetchConversations } from "@/api/conversations";
import ChatArea from "@/components/chat/ChatArea";
import ChatList from "@/components/chat/ChatList";
import Sidebar from "@/components/chat/Sidebar";
import { socket } from "@/lib/socket";
import "@/styles.css";
import type { Conversation } from "@/types/conversation.types";
import { useEffect, useState } from "react";

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetchConversations().then(setConversations);
  }, []);

  // useEffect(() => {
  //   if(conversations.length === 0) return;

  //   socket.emit("join-conversations", conversations.map((conversation) => conversation._id));

  // }, [conversations])
  return (
    <div className="main h-screen w-screen overflow-hidden grid grid-cols-[60px_1fr]">
      <Sidebar />
      <div className="chat flex overflow-hidden w-full h-full">
        <ChatList conversations={conversations}/>
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;

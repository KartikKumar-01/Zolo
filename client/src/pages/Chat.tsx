import ChatArea from "@/components/chat/ChatArea";
import ChatList from "@/components/chat/ChatList";
import Sidebar from "@/components/chat/Sidebar";
import "@/styles.css";

const Chat = () => {
  return (
    <div className="main h-screen w-screen overflow-hidden grid grid-cols-[60px_1fr]">
      <Sidebar />
      <div className="chat flex overflow-auto w-full h-full">
        <ChatList />
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;

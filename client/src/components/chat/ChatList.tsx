import "@/styles.css";
import type { Conversation } from "@/types/conversation.types";
import ChatItems from "./ChatItems";

interface ChatListProps {
  conversations: Conversation[];
}

const ChatList = ({ conversations = [] }: ChatListProps) => {
  return (
    <div className="chat-list bg-primary flex flex-col overflow-y-auto scrollbar-hide items-center w-[300px] h-full rounded-tl-3xl rounded-bl-3xl py-5 px-3 gap-4">
      <div className="search w-[90%] h-[40px]">
        <input
          type="text"
          className="w-full
    bg-[#252A31]
    text-[#E5E7EB]
    placeholder-[#8B95A7]
    border border-[#30363D]
    rounded-lg
    px-3 py-2
    shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]
    focus:outline-none
    focus:ring-2
    focus:ring-primary/40"
          placeholder="Search..."
        />
      </div>
      <ChatItems conversations={conversations} />
    </div>
  );
};

export default ChatList;

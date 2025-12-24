import type { Conversation } from "@/types/conversation.types";
import ChatItem from "./ChatItem";
import '@/styles.css'

interface ChatListProps {
  conversations: Conversation[];
}


const ChatItems = ({conversations} : ChatListProps) => {
  return (
    <div className="chat-items flex flex-col h-full w-full overflow-y-scroll scrollbar-hidden">
      {conversations.map((convo) => (
        <ChatItem 
        key={convo._id}
        conversation={convo}
        />
      ))}
    </div>
  );
};

export default ChatItems;

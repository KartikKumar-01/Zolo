import ChatItem from "./ChatItem";
import "@/styles.css";
import { useConversation } from "@/context/useConversation";

// interface ChatListProps {
//   conversations: Conversation[];
// }

const ChatItems = () => {
  const { conversations, selectedConversation, setSelectedConversation } = useConversation();
  return (
    <div className="chat-items flex flex-col gap-1 h-full w-full overflow-y-scroll scrollbar-hidden">
      {conversations.map((convo) => (
        <ChatItem
          key={convo._id}
          conversation={convo}
          isActive={selectedConversation?._id === convo._id}
          onClick={() => setSelectedConversation(convo)}
        />
      ))}
    </div>
  );
};

export default ChatItems;

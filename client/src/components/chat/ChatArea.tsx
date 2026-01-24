import { useConversation } from "@/context/useConversation";
import ChatTopBar from "./ChatTopBar";
import EmptyChat from "./EmptyChat";
import { useUser } from "@/context/useUser";
import MessagesArea from "./MessagesArea";
import SendMessage from "./SendMessage";

interface ChatAreaProps {
  onBack?: () => void;
}

const ChatArea = ({ onBack }: ChatAreaProps) => {
  const { selectedConversation } = useConversation();
  const { user } = useUser();

  return (
    <div className="bg-primary w-full h-full relative flex flex-col overflow-hidden">

      {selectedConversation === null ? (
        <>
          <EmptyChat />
        </>
      ) : (
        <>
          <ChatTopBar
            conversationName={
              selectedConversation.name ||
              selectedConversation.participants.find((p) => p._id !== user?._id)
                ?.name
            }
            isOnline={true}
            participantsCount={selectedConversation.participants.length}
            onBack={onBack}
          />
          <MessagesArea />
          <SendMessage />
        </>
      )}
    </div>
  );
};

export default ChatArea;

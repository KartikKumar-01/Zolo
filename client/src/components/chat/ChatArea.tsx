import { useConversation } from "@/context/useConversation";
import ChatTopBar from "./ChatTopBar";
import EmptyChat from "./EmptyChat";
import { useUser } from "@/context/useUser";
import MessagesArea from "./MessagesArea";
import SendMessage from "./SendMessage";
import UsernameDialog from "./UsernameDialog";
import { useState } from "react";

const ChatArea = () => {
  const { selectedConversation } = useConversation();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const askSetUsername = !!user && !user.username;

  return (
    <div className="bg-primary w-full h-full relative flex flex-col overflow-hidden">
      {askSetUsername && (
        <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between gap-4 bg-yellow-500/10 border-b border-yellow-500/30 px-6 py-3 backdrop-blur">
          <p className="text-sm text-yellow-200">
            You need to set a username to continue chatting.
          </p>

          <button onClick={() => setOpen(true)} className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-yellow-400 transition">
            Set username
          </button>
        </div>
      )}

      <UsernameDialog open={open} setOpen={setOpen} />

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
          />
          <MessagesArea />
          <SendMessage />
        </>
      )}
    </div>
  );
};

export default ChatArea;

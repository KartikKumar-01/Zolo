import "@/styles.css";
import ChatItems from "./ChatItems";
import NewConversationBtn from "@/components/chat/NewConversationBtn";

const ChatList = () => {
    return (
        <div className="chat-list bg-primary flex flex-col w-[300px] h-full rounded-tl-3xl rounded-bl-3xl py-5 px-3 gap-4 relative">

            <div className="w-full">
                <input
                    type="text"
                    className="w-full bg-[#252A31] text-[#E5E7EB] placeholder-[#8B95A7]
                     border border-[#30363D] rounded-lg px-3 py-2
                     shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]
                     focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Search chats..."
                />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <ChatItems />
            </div>

            <NewConversationBtn />
        </div>
    );
};

export default ChatList;

import { useUser } from "@/context/useUser";
import type { Conversation } from "@/types/conversation.types";

interface ChatItemProp {
  conversation: Conversation;
}
const ChatItem = ({conversation}: ChatItemProp) => {
  const fallbackAvatar = "/profile-placeholder.jpg";
  const isGroup = conversation.type === 'group'
  const {user} = useUser();
  const loggedInUserId = user?._id;
  const profileImg = isGroup ? "../public/profile-placeholder.jpg" : conversation.participants.find(p => p._id !== loggedInUserId)?.avatar;
  const chatName = isGroup ? conversation.name : conversation.participants.find(p => p._id !== loggedInUserId)?.name;
  const lastMessage = conversation.lastMessage?.content;
  const lastSender = conversation.lastMessage?.sender.name;
  return (
    <div className="chat-item w-full h-[50px] flex items-center">
      <div className="chat-img h-[40px] w-[40px]  rounded-md">
        <img
          src={profileImg || fallbackAvatar}
          alt="profile-image"
          className="h-[40px] w-[40px]  rounded-md"
        />
      </div>

      <div className="chat-info flex flex-col w-[80%]  pl-2 pr-2">
        <p>{chatName}</p>
        {lastMessage && <p className="truncate text-sm tracking-tighter text-[#9aa4bf]">
          {lastSender}: {lastMessage};
        </p>}
      </div>
    </div>
  );
};

export default ChatItem;

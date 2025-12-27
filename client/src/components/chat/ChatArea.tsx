import { useConversation } from "@/context/useConversation"
import ChatTopBar from "./ChatTopBar"

const ChatArea = () => {
  const {selectedConversation} = useConversation();

  return (
    <div className="bg-[#202329] w-full h-full relative">
      
    </div>
  )
}

export default ChatArea

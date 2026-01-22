import {fetchConversations} from "@/api/conversations";
import ChatArea from "@/components/chat/ChatArea";
import ChatList from "@/components/chat/ChatList";
import Sidebar from "@/components/chat/Sidebar";
import "@/styles.css";
import {useEffect} from "react";
import {useConversation} from "@/context/useConversation.ts";

const Chat = () => {
    // const [conversations, setConversations] = useState<Conversation[]>([]);

    const {setConversations} = useConversation();
    useEffect(() => {
        fetchConversations().then(setConversations);
    }, [setConversations]);
    return (
        <div className="main relative h-screen w-screen overflow-hidden grid grid-cols-[60px_1fr]">
            <Sidebar/>
            <div className="chat flex overflow-hidden w-full h-full">
                <ChatList/>
                <ChatArea/>
            </div>
        </div>
    );
};

export default Chat;

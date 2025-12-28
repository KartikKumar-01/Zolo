interface ChatMessageProp {
  content: string;
  isOwn: boolean;
}

const ChatMessage = ({ content, isOwn }: ChatMessageProp) => {
  return (
    <div
      className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
        isOwn
          ? "ml-auto bg-blue-600 text-white rounded-br-none"
          : "mr-auto bg-gray-700 text-white rounded-bl-none"
      }`}
    >
        {content}
    </div>
  );
};

export default ChatMessage;

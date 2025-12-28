interface ChatTopBarProp {
  conversationName?: string;
  isOnline?: boolean;
  participantsCount: number;
}

const ChatTopBar = ({
  conversationName,
  isOnline=false,
  participantsCount,
}: ChatTopBarProp) => {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 h-[60px] px-4 border-b border-[rgba(255,255,255,0.3)]">
      <div className="chat-img h-[40px] w-[40px] bg-white rounded-md"></div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{conversationName}</p>
        <p className="text-xs text-muted-foreground">
          {participantsCount <= 2
            ? isOnline ? "Online" : "Offline"
            : `${participantsCount} members`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="h-10 w-10 bg-white rounded-full hover:bg-muted" />
        <button className="h-10 w-10 bg-white rounded-full hover:bg-muted" />
      </div>
    </header>
  );
};

export default ChatTopBar;

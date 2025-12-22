
const ChatItem = () => {
  return (
    <div className="chat-item w-full h-[50px] flex items-center">
      <div className="chat-img h-[40px] w-[40px] bg-white rounded-md"></div>

      <div className="chat-info flex flex-col w-[80%]  pl-2 pr-2">
        <p>Office Chat</p>
        <p className="truncate text-sm tracking-tighter">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis illo
          minus saepe fugiat facere! Exercitationem explicabo at modi officiis
          illum cum, aut quisquam.
        </p>
      </div>
    </div>
  );
};

export default ChatItem;

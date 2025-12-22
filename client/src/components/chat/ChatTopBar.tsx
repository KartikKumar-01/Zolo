
const ChatTopBar = () => {
  return (
    <div className="absolute flex items-center justify-between top-0 border-red-700 border w-full h-[60px] p-2 gap-3">
      <div className="chat-img h-[40px] w-[40px] bg-white rounded-md"></div>

      <div className="chat-info flex flex-col justify-center w-1/2 ">
        <p>Lorem, ipsum dolor.</p>
        <p className="text-sm tracking-tight">Lorem ipsum dolor sit amet.</p>
      </div>
      
      <div className="chat-options w-1/2 flex justify-end items-center">
        <div className="rounded-full bg-white h-[45px] w-[45px]"></div>
        <div className="rounded-full bg-white h-[45px] w-[45px]"></div>
      </div>
    </div>
  );
};

export default ChatTopBar;

import ChatItems from './ChatItems'

const ChatList = () => {
  return (
    <div className='chat-list bg-[#202329] flex flex-col overflow-y-auto items-center w-[280px] h-full rounded-tl-3xl rounded-bl-3xl p-5 gap-4'>
      <div className="search w-[95%] h-[40px]">
        <input type="text" className='w-full h-full rounded-md'/>
      </div>
      <ChatItems />
    </div>
  )
}

export default ChatList

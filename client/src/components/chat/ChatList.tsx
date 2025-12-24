import ChatItems from './ChatItems'
import '@/styles.css'

const ChatList = () => {
  return (
    <div className='chat-list bg-[#202329] flex flex-col overflow-y-auto scrollbar-hide items-center w-[300px] h-full rounded-tl-3xl rounded-bl-3xl py-5 px-3 gap-4'>
      <div className="search w-[90%] h-[40px]">
        <input type="text" className='w-full h-full rounded-md py-2 px-3' placeholder='Search...'/>
      </div>
      <ChatItems />
    </div>
  )
}

export default ChatList

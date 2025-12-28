
const EmptyChat = () => {
  return (
    <div className="flex items-center justify-center h-full">
  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center shadow-lg">
    <div className="text-5xl mb-4">🚀</div>

    <h2 className="text-xl font-semibold text-white">
      Welcome to Zolo
    </h2>

    <p className="text-sm text-white/70 mt-2 max-w-sm">
      Select a conversation from the left to start chatting in real time.
    </p>
  </div>
</div>
  )
}

export default EmptyChat

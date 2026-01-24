import { ArrowLeft, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/useUser";
import { useNavigate } from "react-router-dom";

interface ChatTopBarProp {
  conversationName?: string;
  isOnline?: boolean;
  participantsCount: number;
  onBack?: () => void;
}

const ChatTopBar = ({
  conversationName,
  isOnline=false,
  participantsCount,
  onBack,
}: ChatTopBarProp) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 h-[60px] px-4 border-b border-[rgba(255,255,255,0.3)] bg-primary">
      {/* Back button (mobile only) */}
      {onBack && (
        <button
          onClick={onBack}
          className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Back to chat list"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

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
        <button className="hidden lg:block h-10 w-10 bg-white rounded-full hover:bg-muted" />
        <button className="hidden lg:block h-10 w-10 bg-white rounded-full hover:bg-muted" />
        
        {/* Profile menu button (mobile) */}
        <div className="lg:hidden relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Profile menu"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#252A31] border border-[#30363D] rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#30363D]">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-[#8B95A7]">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatTopBar;

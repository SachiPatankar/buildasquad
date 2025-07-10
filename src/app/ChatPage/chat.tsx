import { useParams, useNavigate } from "react-router-dom"
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import { useQuery } from '@apollo/client';
import { GET_CHAT_LIST_FOR_USER, GET_UNREAD_COUNT_FOR_CHATS } from '@/graphql';
import useNotificationStore from '@/stores/notificationStore';
import { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { data} = useQuery(GET_CHAT_LIST_FOR_USER, { fetchPolicy: 'cache-and-network' });
  const chats = data?.getChatListForUser || [];
  const currentChat = chatId
    ? chats.find((chat: any) => chat._id === chatId)
    : undefined;

  const { data: unreadData } = useQuery(GET_UNREAD_COUNT_FOR_CHATS);
  const setChatUnreadCounts = useNotificationStore((s) => s.setChatUnreadCounts);
  useEffect(() => {
    if (unreadData && Array.isArray(unreadData.getUnreadCountForChats)) {
      const counts: { [chatId: string]: number } = {};
      unreadData.getUnreadCountForChats.forEach((item: any) => {
        if (item && item.chat_id) counts[item.chat_id] = item.unread_count;
      });
      setChatUnreadCounts(counts);
    }
  }, [unreadData, setChatUnreadCounts]);

  // Responsive state: on mobile, control which panel is visible
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile, show chat window if chatId is present
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(!chatId);
    }
  }, [chatId, isMobile]);

  const handleOpenChat = (id: string) => {
    if (isMobile) setShowSidebar(false);
    navigate(`/chat/${id}`);
  };

  const handleBack = () => {
    navigate('/chat');
    if (isMobile) setShowSidebar(true);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-65px)] flex overflow-hidden">
      {/* Sidebar: show on desktop, or on mobile if showSidebar is true */}
      {(showSidebar || !isMobile) && (
        <div className={isMobile ? 'w-full' : ''} style={{ minWidth: isMobile ? '100%' : 320 }}>
          <ChatSidebar
            chats={chats}
            chatId={chatId}
            onChatSelect={handleOpenChat}
          />
        </div>
      )}
      {/* Chat Window: show on desktop, or on mobile if showSidebar is false */}
      {((chatId && !showSidebar) || (!isMobile && chatId)) && (
        <div className={isMobile ? 'w-full flex-1 flex flex-col h-full min-h-0' : 'hidden md:flex flex-1 flex-col h-full min-h-0'}>
          {/* Back button for mobile */}
          {isMobile && (
            <button
              className="p-2 text-sm flex items-center gap-2 bg-muted border-b"
              onClick={handleBack}
            >
              <span > <ArrowLeft/> </span>
            </button>
          )}
          <ChatWindow chatId={chatId!} firstName={currentChat?.first_name || ''} lastName={currentChat?.last_name || ''} photo={currentChat?.photo || ''} />
        </div>
      )}
      {/* Mobile: Show "Select a chat" message if no chat selected and not showing sidebar */}
      {isMobile && !showSidebar && !chatId && (
        <div className="flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BookUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import { useQuery } from '@apollo/client';
import { GET_CHAT_LIST_FOR_USER } from '@/graphql';

// TODO: Replace with real user auth context/store
const CURRENT_USER_ID = 'CURRENT_USER_ID' // Replace with actual current user id

export default function ChatPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { data, loading } = useQuery(GET_CHAT_LIST_FOR_USER, { fetchPolicy: 'cache-and-network' });
  const chats = data?.getChatListForUser || [];
  const currentChat = chatId
    ? chats.find((chat: any) => chat._id === chatId)
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex">
        {/* Chat List Sidebar */}
        <ChatSidebar
          chats={chats}
          chatId={chatId}
        />
        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col">
          {chatId ? (
            <ChatWindow chatId={chatId} firstName={currentChat?.first_name || ''} lastName={currentChat?.last_name || ''} photo={currentChat?.photo || ''} />

          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
        {/* Mobile: Show "Select a chat" message */}
        <div className="md:hidden flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
        {/* Floating Contacts and Pending Requests Buttons */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
          <Button
            className="bg-primary text-white shadow-lg hover:bg-primary/90 w-16 h-16 rounded-full flex items-center justify-center"
            onClick={() => navigate('/contacts')}
          >
            <BookUser className="w-14 h-14" />
          </Button>
        </div>
      </div>
    </div>
  )
}

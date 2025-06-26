import { useState } from "react"
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import ContactListDrawer from './components/ContactListDrawer'

// TODO: Replace with real user auth context/store
const CURRENT_USER_ID = 'CURRENT_USER_ID' // Replace with actual current user id

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleStartChat = (connection: any) => {
    // Simulate starting a new chat with the connection (could trigger a mutation in a real app)
    setSelectedChat({
      _id: 'new',
      participant_ids: [connection.requester_user_id, connection.addressee_user_id],
      first_name: connection.first_name,
      last_name: connection.last_name,
      photo: connection.photo,
      // Add any other fields as needed
    })
    setDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex">
        {/* Chat List Sidebar */}
        <ChatSidebar
          selectedChatId={selectedChat?._id || null}
          onSelectChat={setSelectedChat}
        />
        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
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
        {/* Floating Contacts Button */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full shadow-lg p-4 hover:bg-primary/90"
          onClick={() => setDrawerOpen(true)}
        >
          Contacts
        </button>
        <ContactListDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onStartChat={handleStartChat} />
      </div>
    </div>
  )
}

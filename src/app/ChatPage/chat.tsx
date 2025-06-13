import { useState } from "react"
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for chats
const mockChats = [
  {
    id: "1",
    name: "Rahul Sharma",
    lastMessage: "Hey, are you available for the project discussion?",
    timestamp: "2m",
    unread: 2,
    avatar: "/placeholder.svg",
    online: true,
  },
  {
    id: "2",
    name: "Priya Patel",
    lastMessage: "Thanks for sharing the resources!",
    timestamp: "1h",
    unread: 0,
    avatar: "/placeholder.svg",
    online: false,
  },
  {
    id: "3",
    name: "Arjun Kumar",
    lastMessage: "Let's schedule a meeting for tomorrow",
    timestamp: "3h",
    unread: 1,
    avatar: "/placeholder.svg",
    online: true,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    lastMessage: "The blockchain implementation looks great!",
    timestamp: "1d",
    unread: 0,
    avatar: "/placeholder.svg",
    online: false,
  },
]

// Mock messages for the selected chat
const mockMessages = [
  {
    id: "1",
    sender: "them",
    content: "Hey! I saw your project on the AI study assistant. Really interesting approach!",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "me",
    content: "Thanks! I'm glad you find it interesting. Are you looking to collaborate?",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    sender: "them",
    content: "Yes, exactly! I have experience with machine learning and would love to contribute to the NLP part.",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    sender: "me",
    content: "That sounds perfect! We definitely need someone with ML expertise. When would be a good time to discuss this further?",
    timestamp: "10:37 AM",
  },
  {
    id: "5",
    sender: "them",
    content: "How about we have a call tomorrow evening? I can share some ideas I have for the project.",
    timestamp: "10:40 AM",
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r bg-card flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-1">
            <div className="">
              {filteredChats.map((chat) => (
               <div
               key={chat.id}
               onClick={() => setSelectedChat(chat)}
               className={`cursor-pointer px-4 py-3 border-b hover:bg-muted/40 transition-colors ${
                 selectedChat.id === chat.id ? "bg-muted" : ""
               }`}
             >
               <div className="flex items-center gap-3">
                 <div className="relative">
                   <Avatar className="h-10 w-10">
                     <AvatarImage src={chat.avatar} />
                     <AvatarFallback>
                       {chat.name.split(' ').map(n => n[0]).join('')}
                     </AvatarFallback>
                   </Avatar>
                   {chat.online && (
                     <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                   )}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between">
                     <h4 className="font-medium truncate">{chat.name}</h4>
                     <div className="flex items-center gap-2 shrink-0">
                       <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                       {chat.unread > 0 && (
                         <Badge className="h-5 w-5 text-xs rounded-full p-0 flex items-center justify-center">
                           {chat.unread}
                         </Badge>
                       )}
                     </div>
                   </div>
                   <p className="text-sm text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                 </div>
               </div>
             </div>
             
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>
                    {selectedChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.online ? "Online" : "Last seen 2h ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === "me" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: Show "Select a chat" message */}
        <div className="md:hidden flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center text-muted-foreground">
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      </div>
    </div>
  )
}

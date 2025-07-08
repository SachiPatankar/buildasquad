import { useParams } from "react-router-dom"
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import { useQuery } from '@apollo/client';
import { GET_CHAT_LIST_FOR_USER } from '@/graphql';


export default function ChatPage() {
  const { chatId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading } = useQuery(GET_CHAT_LIST_FOR_USER, { fetchPolicy: 'cache-and-network' });
  const chats = data?.getChatListForUser || [];
  const currentChat = chatId
    ? chats.find((chat: any) => chat._id === chatId)
    : undefined;

  return (
      <div className="max-w-7xl mx-auto h-[calc(100vh-65px)] flex overflow-hidden">
        {/* Chat List Sidebar */}
        <ChatSidebar
          chats={chats}
          chatId={chatId}
        />
        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col h-full min-h-0">
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
      </div>
  )
}

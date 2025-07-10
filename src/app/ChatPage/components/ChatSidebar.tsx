import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatListItem from './ChatListItem';
import type { Chat } from '@/graphql/generated';
import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ChatSidebarProps {
  chats: Chat
  chatId: string | null | undefined
  onChatSelect?: (id: string) => void
}

export default function ChatSidebar({ chats, chatId, onChatSelect }: ChatSidebarProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-80 lg:w-96 border-r bg-card flex flex-col h-full relative">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <Input
          placeholder="Search conversations..."
          className="pl-9"
        />
      </div>
      {/* Only the chat list is scrollable */}
      <div className="flex-1 relative">
        <ScrollArea className="h-full">
          <div>
            {Array.isArray(chats) && chats.length > 0 ? (
              chats.map((chat: Chat) => (
                <ChatListItem
                  key={chat._id}
                  chat={chat}
                  chatId={chatId}
                  onClick={onChatSelect ? () => onChatSelect(chat._id) : undefined}
                />
              ))
            ) : (
              <div className="p-4 text-muted-foreground text-center">
                No conversations found.
              </div>
            )}
          </div>
        </ScrollArea>
        {/* Floating contacts button stays fixed at the bottom right */}
        <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-3">
          <Button
            className="bg-primary text-white shadow-lg hover:bg-primary/90 w-12 h-12 rounded-full flex items-center justify-center p-0"
            onClick={() => navigate('/contacts')}
          >
            <UserRound style={{ width: '20px', height: '20px' }} />
          </Button>
        </div>
      </div>
    </div>
  );
} 
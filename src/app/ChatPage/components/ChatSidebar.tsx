import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_CHAT_LIST_FOR_USER } from '@/graphql';
import ChatListItem from './ChatListItem';

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chat: any) => void;
}

export default function ChatSidebar({ selectedChatId, onSelectChat }: ChatSidebarProps) {
  const [search, setSearch] = useState('');
  const { data, loading, error } = useQuery(GET_CHAT_LIST_FOR_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const chats = data?.getChatListForUser || [];
  const filteredChats = chats.filter((chat: any) => {
    const name = `${chat.first_name} ${chat.last_name}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });
  return (
    <div className="w-full md:w-80 lg:w-96 border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <Input
          placeholder="Search conversations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <ScrollArea className="flex-1">
        <div>
          {loading ? <div className="p-4">Loading...</div> : error ? <div className="p-4 text-red-500">Error loading chats</div> :
            filteredChats.map((chat: any) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selected={selectedChatId === chat._id}
                onClick={() => onSelectChat(chat)}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
} 
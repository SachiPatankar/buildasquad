import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_CHAT_LIST_FOR_USER } from '@/graphql';
import ChatListItem from './ChatListItem';
import type { Chat } from '@/graphql/generated';

interface ChatSidebarProps {
  chats: Chat
  chatId: string | null | undefined
}

export default function ChatSidebar({ chats, chatId }: ChatSidebarProps) {
  return (
    <div className="w-full md:w-80 lg:w-96 border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <Input
          placeholder="Search conversations..."
          className="pl-9"
        />
      </div>
      <ScrollArea className="flex-1">
        <div>
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((chat: Chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                chatId={chatId}
              />
            ))
          ) : (
            <div className="p-4 text-muted-foreground text-center">
              No conversations found.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 
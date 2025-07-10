import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_MESSAGES_FOR_CHAT, SEND_MESSAGE, MARK_MESSAGES_AS_READ } from '@/graphql';
import MessageBubble from './MessageBubble';
import useAuthStore from '@/stores/userAuthStore';
import socket from '@/lib/socket';

interface ChatWindowProps {
  chatId: string | null | undefined;
  firstName: string;
  lastName: string | null | undefined;
  photo: string | null | undefined;
}

function ChatWindow({ chatId, firstName, lastName, photo }: ChatWindowProps) {
  const authUser = useAuthStore((s) => s.user);
  const userId = authUser?._id;
  const [message, setMessage] = useState('');
  const { data, loading } = useQuery(GET_MESSAGES_FOR_CHAT, {
    variables: { chatId: chatId, page: 1, limit: 50 },
    fetchPolicy: 'cache-and-network',
    skip: !chatId,
  });
  const client = useApolloClient();
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data }) {
      if (!data?.sendMessage) return;
      const newMsg = data.sendMessage;
      const existing = cache.readQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 50 },
      }) as { getMessagesForChat: any[] } | null;
      if (existing && existing.getMessagesForChat) {
        cache.writeQuery({
          query: GET_MESSAGES_FOR_CHAT,
          variables: { chatId, page: 1, limit: 50 },
          data: {
            getMessagesForChat: [...existing.getMessagesForChat, newMsg],
          },
        });
      }
    },
  });
  const [markMessagesAsRead] = useMutation(MARK_MESSAGES_AS_READ);
  const messages = data?.getMessagesForChat || [];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    // Mark messages as read when chat window loads
    markMessagesAsRead({ variables: { chatId } });
    const sock = socket;
    sock.emit('joinChat', chatId);
    // Helper to update cache for new/updated/deleted messages
    const updateCache = (msg: any, type: 'add' | 'update' | 'delete') => {
      const existing = client.readQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 50 },
      }) as { getMessagesForChat: any[] } | null;
      if (!existing || !existing.getMessagesForChat) return;
      let updatedMessages = existing.getMessagesForChat;
      if (type === 'add') {
        // Avoid duplicates
        if (!updatedMessages.some((m: any) => m._id === msg._id)) {
          updatedMessages = [...updatedMessages, msg];
        }
      } else if (type === 'update') {
        updatedMessages = updatedMessages.map((m: any) => m._id === msg._id ? { ...m, ...msg } : m);
      } else if (type === 'delete') {
        updatedMessages = updatedMessages.filter((m: any) => m._id !== msg._id);
      }
      client.writeQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 50 },
        data: { getMessagesForChat: updatedMessages },
      });
    };
    sock.on('receiveMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'add');
      }
    });
    sock.on('updateMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'update');
      }
    });
    sock.on('deleteMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'delete');
      }
    });
    return () => {
      sock.emit('leaveChat', chatId);
      sock.off('receiveMessage');
      sock.off('updateMessage');
      sock.off('deleteMessage');
    };
  }, [chatId, client, markMessagesAsRead]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage({ variables: { chatId: chatId, content: message } });
    setMessage('');
    // No refetch needed, cache is updated optimistically
  };

  const name = `${firstName} ${lastName}`.trim();

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card flex items-center gap-3 flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={photo || '/placeholder.svg'} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            messages.map((msg: any) => (
              <MessageBubble key={msg._id} message={msg} isMe={String(msg.sender_id) === String(userId)} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <div className="p-4 border-t bg-card flex items-center gap-2 flex-shrink-0">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} size="icon">
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatWindow;
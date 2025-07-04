import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_MESSAGES_FOR_CHAT, SEND_MESSAGE } from '@/graphql';
import MessageBubble from './MessageBubble';
import useAuthStore from '@/stores/userAuthStore';
import { io, Socket } from 'socket.io-client';

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
  const { data, loading, refetch } = useQuery(GET_MESSAGES_FOR_CHAT, {
    variables: { chatId: chatId, page: 1, limit: 50 },
    fetchPolicy: 'cache-and-network',
    skip: !chatId,
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const messages = data?.getMessagesForChat || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
        withCredentials: true,
      });
    }
    const socket = socketRef.current;
    socket.emit('joinChat', chatId);
    socket.on('receiveMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        refetch();
      }
    });
    socket.on('updateMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        refetch();
      }
    });
    socket.on('deleteMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        refetch();
      }
    });
    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('receiveMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
    };
  }, [chatId, refetch]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage({ variables: { chatId: chatId, content: message } });
    setMessage('');
    refetch();
  };

  const name = `${firstName} ${lastName}`.trim();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-card flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={photo || '/placeholder.svg'} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{name}</h3>
        </div>
      </div>
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {loading ? <div>Loading...</div> : messages.map((msg: any) => (
            <MessageBubble key={msg._id} message={msg} isMe={String(msg.sender_id) === String(userId)} />
          ))}
        </div>
      </ScrollArea>
      {/* Input */}
      <div className="p-4 border-t bg-card flex items-center gap-2">
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
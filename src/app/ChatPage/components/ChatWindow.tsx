import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_MESSAGES_FOR_CHAT, SEND_MESSAGE } from '@/graphql';
import MessageBubble from './MessageBubble';
import useAuthStore from '@/stores/userAuthStore';

interface ChatWindowProps {
  chat: any;
}

function ChatWindow({ chat }: ChatWindowProps) {
  const authUser = useAuthStore((s) => s.user);
  const userId = authUser?._id;
  const [message, setMessage] = useState('');
  const { data, loading, refetch } = useQuery(GET_MESSAGES_FOR_CHAT, {
    variables: { chatId: chat._id, page: 1, limit: 50 },
    fetchPolicy: 'cache-and-network',
    skip: !chat?._id,
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const messages = data?.getMessagesForChat || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage({ variables: { chatId: chat._id, content: message } });
    setMessage('');
    refetch();
  };

  const name = `${chat.first_name} ${chat.last_name}`.trim();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-card flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.photo || '/placeholder.svg'} />
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
            <MessageBubble key={msg._id} message={msg} isMe={msg.sender_id === userId} />
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
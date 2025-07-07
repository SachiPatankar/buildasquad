import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GET_MESSAGES_FOR_CHAT, SEND_MESSAGE } from '@/graphql';
import MessageBubble from './MessageBubble';
import useAuthStore from '@/stores/userAuthStore';
import { io, Socket } from 'socket.io-client';
import { Send as SendIcon } from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previousScrollHeight, setPreviousScrollHeight] = useState(0);
  
  const { data, loading, fetchMore } = useQuery(GET_MESSAGES_FOR_CHAT, {
    variables: { chatId: chatId, page: 1, limit: 10 },
    fetchPolicy: 'cache-and-network',
    skip: !chatId,
    onCompleted: (data) => {
      // If we get less than 10 messages, there are no more to load
      if (data?.getMessagesForChat && data.getMessagesForChat.length < 10) {
        setHasMore(false);
      }
    },
  });
  
  const client = useApolloClient();
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data }) {
      if (!data?.sendMessage) return;
      const newMsg = data.sendMessage;
      const existing = cache.readQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
      }) as { getMessagesForChat: any[] } | null;
      if (existing && existing.getMessagesForChat) {
        cache.writeQuery({
          query: GET_MESSAGES_FOR_CHAT,
          variables: { chatId, page: 1, limit: 10 },
          data: {
            getMessagesForChat: [...existing.getMessagesForChat, newMsg],
          },
        });
      }
    },
  });
  
  const messages = data?.getMessagesForChat || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Reset pagination when chatId changes
  useEffect(() => {
    if (chatId) {
      setCurrentPage(1);
      setHasMore(true);
      setIsLoadingMore(false);
    }
  }, [chatId]);

  // Enhanced scroll to bottom function
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    // Only scroll if we have messages or when switching chats
    if (messages.length > 0 || chatId) {
      // Multiple attempts to ensure it works
      scrollToBottom();
      setTimeout(scrollToBottom, 150);
    }
  }, [messages, loading, chatId]);

  // Scroll event handler for infinite scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      
      // Check if user scrolled to the top (with small threshold)
      if (scrollTop <= 100 && hasMore && !isLoadingMore && !loading) {
        setIsLoadingMore(true);
        setPreviousScrollHeight(scrollHeight);
        
        try {
          const nextPage = currentPage + 1;
          const result = await fetchMore({
            variables: {
              chatId: chatId,
              page: nextPage,
              limit: 10,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult?.getMessagesForChat) return prev;
              
              const newMessages = fetchMoreResult.getMessagesForChat;
              
              // If we get less than 10 messages, no more to load
              if (newMessages.length < 10) {
                setHasMore(false);
              }
              
              // Add older messages to the beginning of the array
              // Since we're loading older messages, they should come before current messages
              const existingIds = new Set(prev.getMessagesForChat.map((msg: any) => msg._id));
              const uniqueNewMessages = newMessages.filter((msg: any) => !existingIds.has(msg._id));
              
              return {
                getMessagesForChat: [...uniqueNewMessages, ...prev.getMessagesForChat],
              };
            },
          });
          
          setCurrentPage(nextPage);
        } catch (error) {
          console.error('Error loading more messages:', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [chatId, currentPage, hasMore, isLoadingMore, loading, fetchMore]);

  // Maintain scroll position after loading more messages
  useEffect(() => {
    if (isLoadingMore === false && previousScrollHeight > 0 && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const newScrollHeight = scrollContainer.scrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeight;
      scrollContainer.scrollTop = scrollDiff;
      setPreviousScrollHeight(0);
    }
  }, [isLoadingMore, previousScrollHeight]);

  useEffect(() => {
    if (!chatId) return;
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000', {
        withCredentials: true,
      });
    }
    const socket = socketRef.current;
    socket.emit('joinChat', chatId);
    
    // Helper to update cache for new/updated/deleted messages
    const updateCache = (msg: any, type: 'add' | 'update' | 'delete') => {
      const existing = client.readQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
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
        variables: { chatId, page: 1, limit: 10 },
        data: { getMessagesForChat: updatedMessages },
      });
    };
    
    socket.on('receiveMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'add');
      }
    });
    socket.on('updateMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'update');
      }
    });
    socket.on('deleteMessage', (msg: any) => {
      if (msg.chat_id === chatId) {
        updateCache(msg, 'delete');
      }
    });
    
    return () => {
      socket.emit('leaveChat', chatId);
      socket.off('receiveMessage');
      socket.off('updateMessage');
      socket.off('deleteMessage');
    };
  }, [chatId, client]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage({ variables: { chatId: chatId, content: message } });
    setMessage('');
    // No refetch needed, cache is updated optimistically
  };

  const name = `${firstName} ${lastName}`.trim();

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
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
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto p-4" ref={scrollRef}>
          <div className="space-y-4">
            {/* Loading indicator for older messages */}
            {isLoadingMore && (
              <div className="flex justify-center py-2">
                <div className="text-sm text-muted-foreground">Loading older messages...</div>
              </div>
            )}
            {/* No more messages indicator */}
            {!hasMore && messages.length > 0 && (
              <div className="flex justify-center py-2">
                <div className="text-sm text-muted-foreground">No more messages</div>
              </div>
            )}
            {loading ? (
              <div>Loading...</div>
            ) : (
              messages.map((msg: any) => (
                <MessageBubble key={msg._id} message={msg} isMe={String(msg.sender_id) === String(userId)} />
              ))
            )}
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="p-4 border-t bg-card flex items-center gap-2 flex-shrink-0">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} size="icon">
          <SendIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default ChatWindow;
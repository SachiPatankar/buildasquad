// src/components/chat/ChatWindow.tsx
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useLocation } from 'react-router-dom';

import {
  GET_MESSAGES_FOR_CHAT,
  SEND_MESSAGE,
  MARK_MESSAGES_AS_READ,
} from '@/graphql';
import MessageBubble from './MessageBubble';
import useAuthStore from '@/stores/userAuthStore';
import useNotificationStore from '@/stores/notificationStore';
import socket from '@/lib/socket';
import {  Send } from 'lucide-react';

interface ChatWindowProps {
  chatId: string | null | undefined;
  firstName: string;
  lastName: string | null | undefined;
  photo: string | null | undefined;
}

function ChatWindow({ chatId, firstName, lastName, photo }: ChatWindowProps) {
  /* ------------------------------------------------------------------ */
  /*                              state                                 */
  /* ------------------------------------------------------------------ */
  const authUser = useAuthStore((s) => s.user);
  const userId = authUser?._id;

  const location = useLocation();
  const routeState = location.state || {};
  const displayFirstName = firstName || routeState.firstName || '';
  const displayLastName = lastName || routeState.lastName || '';
  const displayPhoto = photo || routeState.photo || '';

  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeight = useRef(0);
  const shouldScrollToBottom = useRef(true);

  /* ------------------------------------------------------------------ */
  /*                            apollo                                  */
  /* ------------------------------------------------------------------ */
  const { data, loading, fetchMore } = useQuery(GET_MESSAGES_FOR_CHAT, {
    variables: { chatId, page: 1, limit: 10 },
    fetchPolicy: 'cache-and-network',
    skip: !chatId,
    notifyOnNetworkStatusChange: true,
  });

  const client = useApolloClient();

  /* ------------------------------------------------------------------ */
  /*                mutations – keep cache DESCENDING                   */
  /* ------------------------------------------------------------------ */
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    update(cache, { data }) {
      if (!data?.sendMessage) return;
      const newMsg = data.sendMessage;

      const existing = cache.readQuery<{ getMessagesForChat: any[] }>({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
      });

      const current = existing?.getMessagesForChat ?? [];
      if (current.some((m) => m._id === newMsg._id)) return;

      cache.writeQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
        data: {
          // newest first (descending by created_at)
          getMessagesForChat: [newMsg, ...current],
        },
      });
    },
  });

  const [markMessagesAsRead] = useMutation(MARK_MESSAGES_AS_READ);

  /* ------------------------------------------------------------------ */
  /*                     auto-scroll helpers                            */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (shouldScrollToBottom.current && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isLoadingMore && prevScrollHeight.current && scrollAreaRef.current) {
      const el = scrollAreaRef.current;
      el.scrollTop =
        el.scrollHeight - prevScrollHeight.current + el.scrollTop;
      prevScrollHeight.current = 0;
    }
  }, [isLoadingMore]);

  /* ------------------------------------------------------------------ */
  /*                    load older messages (infinite)                  */
  /* ------------------------------------------------------------------ */
  const loadMoreMessages = useCallback(async () => {
    if (isLoadingMore || !hasMore || loading) return;

    if (scrollAreaRef.current) {
      prevScrollHeight.current = scrollAreaRef.current.scrollHeight;
    }
    setIsLoadingMore(true);

    try {
      const res = await fetchMore({
        variables: { chatId, page: page + 1, limit: 10 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.getMessagesForChat.length) return prev;
          return {
            // keep DESC order: newer (prev) first, older (fetchMoreResult) last
            getMessagesForChat: [
              ...prev.getMessagesForChat,
              ...fetchMoreResult.getMessagesForChat,
            ],
          };
        },
      });

      if (res.data.getMessagesForChat.length < 10) setHasMore(false);
      setPage((p) => p + 1);
      shouldScrollToBottom.current = false;
    } catch (err) {
      console.error('Error loading older messages:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [chatId, fetchMore, hasMore, isLoadingMore, loading, page]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const atTop = el.scrollTop <= 100;

      if (atTop && hasMore && !isLoadingMore) loadMoreMessages();

      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
      shouldScrollToBottom.current = atBottom;
    },
    [hasMore, isLoadingMore, loadMoreMessages],
  );

  /* ------------------------------------------------------------------ */
  /*                           sockets                                  */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!chatId) return;

    setPage(1);
    setHasMore(true);
    shouldScrollToBottom.current = true;

    markMessagesAsRead({ variables: { chatId } });
    useNotificationStore.getState().updateChatUnread(chatId, 0);

    const sock = socket;
    sock.emit('joinChat', chatId);

    const updateCache = (msg: any, type: 'add' | 'update' | 'delete') => {
      const existing = client.readQuery<{ getMessagesForChat: any[] }>({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
      });

      if (!existing) return;
      let updated = existing.getMessagesForChat;

      switch (type) {
        case 'add':
          if (!updated.some((m) => m._id === msg._id)) {
            // prepend – newest first
            updated = [msg, ...updated];
            shouldScrollToBottom.current = true;
          }
          break;
        case 'update':
          updated = updated.map((m) =>
            m._id === msg._id ? { ...m, ...msg } : m,
          );
          break;
        case 'delete':
          updated = updated.filter((m) => m._id !== msg._id);
          break;
      }

      client.writeQuery({
        query: GET_MESSAGES_FOR_CHAT,
        variables: { chatId, page: 1, limit: 10 },
        data: { getMessagesForChat: updated },
      });
    };

    sock.on('receiveMessage', (msg: any) => {
      if (
        msg.chat_id === chatId &&
        String(msg.sender_id) !== String(userId)
      ) {
        updateCache(msg, 'add');
        markMessagesAsRead({ variables: { chatId } });
      }
    });
    sock.on(
      'updateMessage',
      (msg: any) => msg.chat_id === chatId && updateCache(msg, 'update'),
    );
    sock.on(
      'deleteMessage',
      (msg: any) => msg.chat_id === chatId && updateCache(msg, 'delete'),
    );

    return () => {
      sock.emit('leaveChat', chatId);
      sock.off('receiveMessage');
      sock.off('updateMessage');
      sock.off('deleteMessage');
    };
  }, [chatId, client, markMessagesAsRead, userId]);

  /* ------------------------------------------------------------------ */
  /*                              send                                  */
  /* ------------------------------------------------------------------ */
  const handleSend = async () => {
    if (!message.trim()) return;
    shouldScrollToBottom.current = true;

    try {
      await sendMessage({ variables: { chatId, content: message } });
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                              render                                */
  /* ------------------------------------------------------------------ */
  const name = `${displayFirstName} ${displayLastName}`.trim();

  // flip once for display (old → new)
  const messages = [...(data?.getMessagesForChat ?? [])].reverse();

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 max-w-full">
      {/* header */}
      <div className="p-4 border-b bg-card flex items-center gap-3 flex-shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={displayPhoto || '/placeholder.svg'} />
          <AvatarFallback>
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">{name}</h3>
      </div>

      {/* messages */}
      <ScrollAreaPrimitive.Root className="flex-1 min-h-0 w-full">
        <ScrollAreaPrimitive.Viewport
          ref={scrollAreaRef}
          onScroll={handleScroll}
          className="h-full w-full"
        >
          <div className="p-4 space-y-4">
            {!hasMore && (
              <div className="text-center py-2 text-xs text-muted-foreground">
                No more messages
              </div>
            )}

            {isLoadingMore && (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Loading more messages…
              </div>
            )}

            {loading && messages.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Loading messages…
              </div>
            ) : (
              messages.map((msg: any) => (
                <MessageBubble
                  key={msg._id}
                  message={msg}
                  isMe={String(msg.sender_id) === String(userId)}
                />
              ))
            )}

            {/* dummy div so we can scrollTo bottom */}
            <div style={{ height: 1 }} />
          </div>
        </ScrollAreaPrimitive.Viewport>

        <ScrollAreaPrimitive.Scrollbar orientation="vertical" />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>

      {/* input */}
      <div className="p-4 border-t bg-card flex items-center gap-2 flex-shrink-0">
        <Input
          placeholder="Type a message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        />
        <Button onClick={handleSend} size="icon" disabled={!message.trim()}>
          <Send/>
        </Button>
      </div>
    </div>
  );
}

export default ChatWindow;

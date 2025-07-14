import { useEffect } from 'react';
import useAuthStore from '@/stores/userAuthStore';
import useNotificationStore from '@/stores/notificationStore';
import socket from '@/lib/socket';

export default function useSocket() {
  const user = useAuthStore((state) => state.user);
  const notificationStore = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    // Single place for all socket listeners
    socket.on('initialCounts', notificationStore.initializeCounts);
    socket.on('chatUnreadUpdate', ({ chatId, count }) => {
      notificationStore.updateChatUnread(chatId, count);
    });
    socket.on('totalUnreadUpdate', ({ count }) => {
      notificationStore.setTotalUnread(count);
    });
    // NEW: Listen for friend request count updates
    socket.on('friendRequestUpdate', ({ count }) => {
      notificationStore.setFriendRequestCount(count);
    });
    socket.on('friendRequestIncrement', () => {
      notificationStore.incrementFriendRequestCount();
    });
    socket.on('friendRequestDecrement', () => {
      notificationStore.decrementFriendRequestCount();
    });

    return () => {
      socket.off('initialCounts', notificationStore.initializeCounts);
      socket.off('chatUnreadUpdate');
      socket.off('totalUnreadUpdate');
      socket.off('friendRequestUpdate');
      socket.off('friendRequestIncrement');
      socket.off('friendRequestDecrement');
    };
  }, [user, notificationStore]);
} 
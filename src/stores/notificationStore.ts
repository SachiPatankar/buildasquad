// import { create } from 'zustand';

// interface NotificationState {
//   unreadCount: number;
//   setUnreadCount: (count: number) => void;
//   incrementUnread: () => void;
//   clearUnread: () => void;
//   // Per-chat unread counts
//   chatUnreadCounts: { [chatId: string]: number };
//   setChatUnreadCounts: (counts: { [chatId: string]: number }) => void;
//   setChatUnreadCount: (chatId: string, count: number) => void;
//   clearChatUnreadCount: (chatId: string) => void;
// }

// const useNotificationStore = create<NotificationState>((set) => ({
//   unreadCount: 0,
//   setUnreadCount: (count) => set({ unreadCount: count }),
//   incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
//   clearUnread: () => set({ unreadCount: 0 }),
//   // Per-chat unread counts
//   chatUnreadCounts: {},
//   setChatUnreadCounts: (counts) => set({ chatUnreadCounts: counts }),
//   setChatUnreadCount: (chatId, count) => set((state) => ({ chatUnreadCounts: { ...state.chatUnreadCounts, [chatId]: count } })),
//   clearChatUnreadCount: (chatId) => set((state) => {
//     const newCounts = { ...state.chatUnreadCounts };
//     delete newCounts[chatId];
//     return { chatUnreadCounts: newCounts };
//   }),
// }));

// export default useNotificationStore; 

import { create } from 'zustand';

interface NotificationState {
  // Total unread count
  totalUnread: number;
  setTotalUnread: (count: number) => void;
  
  // Per-chat unread counts
  chatUnreadCounts: { [chatId: string]: number };
  setChatUnreadCounts: (counts: { [chatId: string]: number }) => void;
  updateChatUnread: (chatId: string, count: number) => void;
  
  // Friend request count
  friendRequestCount: number;
  setFriendRequestCount: (count: number) => void;
  incrementFriendRequestCount: () => void;
  decrementFriendRequestCount: () => void;
  
  // Initialize all counts
  initializeCounts: (data: {
    totalUnread: number;
    chatCounts: { [chatId: string]: number };
    friendRequestCount: number;
  }) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  totalUnread: 0,
  setTotalUnread: (count) => set({ totalUnread: count }),
  
  chatUnreadCounts: {},
  setChatUnreadCounts: (counts) => set({ chatUnreadCounts: counts }),
  updateChatUnread: (chatId, count) => set((state) => ({ 
    chatUnreadCounts: { ...state.chatUnreadCounts, [chatId]: count } 
  })),
  
  friendRequestCount: 0,
  setFriendRequestCount: (count) => set({ friendRequestCount: count }),
  incrementFriendRequestCount: () => set((state) => ({ 
    friendRequestCount: state.friendRequestCount + 1 
  })),
  decrementFriendRequestCount: () => set((state) => ({ 
    friendRequestCount: Math.max(0, state.friendRequestCount - 1) 
  })),
  
  initializeCounts: (data) => set({
    totalUnread: data.totalUnread,
    chatUnreadCounts: data.chatCounts,
    friendRequestCount: data.friendRequestCount
  }),
}));

export default useNotificationStore;
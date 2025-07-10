import { create } from 'zustand';

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnread: () => void;
  clearUnread: () => void;
  // Per-chat unread counts
  chatUnreadCounts: { [chatId: string]: number };
  setChatUnreadCounts: (counts: { [chatId: string]: number }) => void;
  setChatUnreadCount: (chatId: string, count: number) => void;
  clearChatUnreadCount: (chatId: string) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  clearUnread: () => set({ unreadCount: 0 }),
  // Per-chat unread counts
  chatUnreadCounts: {},
  setChatUnreadCounts: (counts) => set({ chatUnreadCounts: counts }),
  setChatUnreadCount: (chatId, count) => set((state) => ({ chatUnreadCounts: { ...state.chatUnreadCounts, [chatId]: count } })),
  clearChatUnreadCount: (chatId) => set((state) => {
    const newCounts = { ...state.chatUnreadCounts };
    delete newCounts[chatId];
    return { chatUnreadCounts: newCounts };
  }),
}));

export default useNotificationStore; 
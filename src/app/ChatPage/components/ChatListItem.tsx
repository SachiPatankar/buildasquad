import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import useNotificationStore from '@/stores/notificationStore';

interface ChatListItemProps {
  chat: any;
  chatId: string | null | undefined;
  onClick?: () => void;
}

export default function ChatListItem({ chat, chatId, onClick }: ChatListItemProps) {
  const navigate = useNavigate();
  const name = `${chat.first_name} ${chat.last_name}`.trim();
  const chatUnreadCounts = useNotificationStore((s) => s.chatUnreadCounts);
  const unread = chatUnreadCounts[chat._id] || 0;
  return (
    <div
      className={`cursor-pointer px-4 py-3 border-b hover:bg-muted/40 transition-colors ${chatId === chat._id ? 'bg-muted' : ''}`}
      onClick={onClick ? onClick : () => navigate(`/chat/${chat._id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.photo || '/placeholder.svg'} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {unread}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium truncate">{name}</h4>
            <span className="text-xs text-muted-foreground">{chat.last_message_at ? new Date(chat.last_message_at).toLocaleString() : ''}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate mt-1">{chat.last_message_content || <i>No messages yet</i>}</p>
        </div>
      </div>
    </div>
  );
} 
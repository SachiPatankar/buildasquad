import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { LOAD_CONNECTIONS_LIST, GET_CHAT_LIST_FOR_USER } from '@/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ContactListDrawerProps {
  open: boolean;
  onClose: () => void;
  onStartChat: (connection: any) => void;
}

export default function ContactListDrawer({ open, onClose, onStartChat }: ContactListDrawerProps) {
  const { data: connectionsData, loading: loadingConnections } = useQuery(LOAD_CONNECTIONS_LIST, { fetchPolicy: 'cache-and-network' });
  const { data: chatsData, loading: loadingChats } = useQuery(GET_CHAT_LIST_FOR_USER, { fetchPolicy: 'cache-and-network' });
  const connections = (connectionsData?.loadConnectionsList || []).filter((c: any) => c.status === 'accepted');
  const chatUserIds = new Set((chatsData?.getChatListForUser || []).map((chat: any) => {
    // Find the other participant
    return chat.participant_ids.find((id: string) => id !== c._id);
  }));
  // Only show connections not already in a chat
  const availableConnections = connections.filter((c: any) => !chatUserIds.has(c.requester_user_id === c._id ? c.addressee_user_id : c.requester_user_id));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
      <div className="w-80 bg-card h-full shadow-lg p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        {loadingConnections || loadingChats ? (
          <div>Loading...</div>
        ) : availableConnections.length === 0 ? (
          <div className="text-muted-foreground">No contacts available.</div>
        ) : (
          <div className="space-y-2">
            {availableConnections.map((conn: any) => {
              const name = `${conn.first_name} ${conn.last_name}`.trim();
              return (
                <div key={conn._id} className="flex items-center gap-3 p-2 rounded hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={conn.photo || '/placeholder.svg'} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{name}</div>
                  </div>
                  <Button size="sm" onClick={() => onStartChat(conn)}>Chat</Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
} 
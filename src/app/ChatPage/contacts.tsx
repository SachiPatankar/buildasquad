import React from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_CONNECTIONS_LIST } from '@/graphql';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(LOAD_CONNECTIONS_LIST, {
    variables: {},
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div>Error loading contacts: {error.message}</div>;

  const connections = data?.loadConnectionsList || [];

  return (
    <div className="max-w-lg mx-auto p-4">
      <div
        className="flex items-center justify-between p-3 mb-4 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => navigate('/contacts/requests')}
      >
        <span className="font-semibold">See pending requests</span>
        <ChevronRight size={20} />
      </div>
      
      <ul>
        {connections.length === 0 ? (
          <li className="text-gray-500">No connections found.</li>
        ) : (
          connections.map((conn: any) => (
            <li key={conn._id} className="flex items-center gap-3 p-2 border-b">
              <img src={conn.photo || '/default-avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="font-medium">{conn.first_name} {conn.last_name}</div>
                <div className="text-xs text-gray-500">{conn.status}</div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="ml-2"
                onClick={() => navigate(`/chat/${conn.chat_id}`)}
              >
                Chat
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="ml-2"
                // TODO: Add remove connection handler
              >
                Remove Connection
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ContactsPage; 
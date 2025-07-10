import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_PENDING_FRIEND_REQUESTS, ACCEPT_FRIEND_REQ, DECLINE_FRIEND_REQ } from '@/graphql';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ContactsRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(LOAD_PENDING_FRIEND_REQUESTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [acceptFriendReq, { loading: accepting }] = useMutation(ACCEPT_FRIEND_REQ, {
    onCompleted: () => refetch(),
  });
  const [declineFriendReq, { loading: declining }] = useMutation(DECLINE_FRIEND_REQ, {
    onCompleted: () => refetch(),
  });

  const [_isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>Error loading requests: {error.message}</div>;

  const requests = data?.loadPendingFriendRequests || [];

  return (
    <div className="max-w-lg mx-auto p-4">

      <div className='flex gap-2 mb-6'>
        <button
          className="text-sm flex items-center mr-2 mt-1"
          onClick={() => navigate('/contacts')}
        >
          <span className="material-icons"><ArrowLeft/></span>
        </button>
      
      <h2 className="text-xl font-bold">Pending Connection Requests</h2>
      </div>
      <ul>
        {requests.length === 0 ? (
          <li className="text-gray-500">No pending requests.</li>
        ) : (
          requests.map((req: any) => (
            <li key={req._id} className="flex items-center gap-3 p-2 border-b">
              <img src={req.photo || '/default-avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="font-medium">{req.first_name} {req.last_name}</div>
                <div className="text-xs text-gray-500">{req.status}</div>
              </div>
              <Button
                className="mr-2"
                variant="default"
                disabled={accepting}
                onClick={() => acceptFriendReq({ variables: { connectionId: req._id } })}
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                disabled={declining}
                onClick={() => declineFriendReq({ variables: { connectionId: req._id } })}
              >
                Decline
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ContactsRequestsPage; 
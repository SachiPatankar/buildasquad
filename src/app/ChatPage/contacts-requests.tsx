import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LOAD_PENDING_FRIEND_REQUESTS, ACCEPT_FRIEND_REQ, DECLINE_FRIEND_REQ } from '@/graphql';

const ContactsRequestsPage: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(LOAD_PENDING_FRIEND_REQUESTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [acceptFriendReq, { loading: accepting }] = useMutation(ACCEPT_FRIEND_REQ, {
    onCompleted: () => refetch(),
  });
  const [declineFriendReq, { loading: declining }] = useMutation(DECLINE_FRIEND_REQ, {
    onCompleted: () => refetch(),
  });

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>Error loading requests: {error.message}</div>;

  const requests = data?.loadPendingFriendRequests || [];

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Pending Connection Requests</h2>
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
              <button
                className="px-3 py-1 bg-green-500 text-white rounded mr-2 disabled:opacity-50"
                disabled={accepting}
                onClick={() => acceptFriendReq({ variables: { connectionId: req._id } })}
              >
                Accept
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                disabled={declining}
                onClick={() => declineFriendReq({ variables: { connectionId: req._id } })}
              >
                Decline
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ContactsRequestsPage; 
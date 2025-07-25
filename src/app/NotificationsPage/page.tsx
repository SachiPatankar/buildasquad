import { useQuery, useMutation } from '@apollo/client';
import { LOAD_PENDING_FRIEND_REQUESTS, ACCEPT_FRIEND_REQ, DECLINE_FRIEND_REQ } from '@/graphql';
import ConnectionRequestItem from './components/ConnectionRequestItem';
import useNotificationStore from '@/stores/notificationStore';
import { useEffect } from 'react';

export default function NotificationsPage() {
  const { data, loading, error, refetch } = useQuery(LOAD_PENDING_FRIEND_REQUESTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [acceptFriendReq] = useMutation(ACCEPT_FRIEND_REQ);
  const [declineFriendReq] = useMutation(DECLINE_FRIEND_REQ);
  const requests = data?.loadPendingFriendRequests || [];
  const setFriendRequestCount = useNotificationStore((state) => state.setFriendRequestCount);

  // Mark notifications as read on mount
  useEffect(() => {
    setFriendRequestCount(0);
  }, []);

  const handleAccept = async (connectionId: string) => {
    await acceptFriendReq({ variables: { connectionId } });
    refetch();
  };
  const handleDecline = async (connectionId: string) => {
    await declineFriendReq({ variables: { connectionId } });
    refetch();
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl font-bold mb-4 sm:mb-6">Notifications</h1>
      <div className="bg-card rounded-lg shadow divide-y overflow-hidden">
        <h2 className="text-lg font-semibold p-4">Connection Requests</h2>
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : error ? (
          <div className="p-4 text-red-500">Error loading requests</div>
        ) : requests.length === 0 ? (
          <div className="p-4 text-muted-foreground">No pending connection requests.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {requests.map((req: any) => (
              <ConnectionRequestItem
                key={req._id}
                request={req}
                onAccept={() => handleAccept(req._id)}
                onDecline={() => handleDecline(req._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, MessageCircle, User} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LOAD_APPLICATIONS_BY_POST_ID, LOAD_POST_BY_ID, UPDATE_APPLICATION_STATUS, SEND_FRIEND_REQ } from "@/graphql"
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns'

// Separate component for each applicant card
function ApplicantCard({ applicant, onAccept, onReject, acceptLoading, rejectLoading }: { applicant: any, onAccept: (id: string) => void, onReject: (id: string) => void, acceptLoading?: boolean, rejectLoading?: boolean }) {
  const [connectionStatus, setConnectionStatus] = useState(applicant.is_connection);
  const [sendFriendReq, { loading: connectLoading }] = useMutation(SEND_FRIEND_REQ);

  const handleConnect = async () => {
    try {
      await sendFriendReq({ variables: { addresseeUserId: applicant.applicant_id } });
      setConnectionStatus('pending');
      toast.success('Connection request sent');
    } catch (_e) {
      toast.error('Failed to send connection request');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        {/* Photo */}
        <Avatar className="h-14 w-14 border-2 border-background shadow-lg">
          <AvatarImage src={applicant.photo || "/placeholder.svg"} />
          <AvatarFallback className="text-lg font-semibold">
            {applicant.first_name?.[0] || ''}{applicant.last_name?.[0] || ''}
          </AvatarFallback>
        </Avatar>
        {/* Name, Title, and Actions Row */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base truncate">{applicant.first_name} {applicant.last_name}</h3>
              <p className="text-sm text-primary font-medium truncate">{applicant.title || ''}</p>
            </div>
            <div className="flex gap-2 ml-2">
              <Link to={`/profile/${applicant.applicant_id}`}>
                <Button variant="outline" size="icon" className="h-8 w-auto px-2 flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="text-xs font-medium">View Profile</span>
                </Button>
              </Link>
              {connectionStatus === 'accepted' ? (
                <Button variant="outline" size="icon" className="h-8 w-auto px-2 flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Message</span>
                </Button>
              ) : connectionStatus === 'pending' ? (
                <Button variant="outline" size="icon" className="h-8 w-auto px-2 flex items-center gap-1" disabled>
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Pending</span>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-auto px-2 flex items-center gap-1" 
                  onClick={handleConnect} 
                  disabled={connectLoading}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">{connectLoading ? 'Connecting...' : 'Connect'}</span>
                </Button>
              )}
            </div>
          </div>
          {/* Application Message */}
          <div className="bg-muted/50 rounded-lg p-3 mt-2">
            <p className="text-sm text-muted-foreground leading-relaxed mb-1">{applicant.message}</p>
            <div className="text-xs text-muted-foreground">
              Applied {formatDistanceToNow(new Date(applicant.created_at), { addSuffix: true })}
            </div>
          </div>
        </div>
        {/* Accept/Reject Buttons */}
        <div className="flex flex-col gap-2 items-end min-w-[100px] ml-2">
          <Button
            size="sm"
            className="w-full"
            onClick={() => onAccept(applicant._id)}
            disabled={acceptLoading || applicant.status === 'accepted'}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white"
            onClick={() => onReject(applicant._id)}
            disabled={rejectLoading || applicant.status === 'rejected'}
          >
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PostApplicantsPage() {
  const { postId } = useParams()
  const { data: postData, loading: postLoading } = useQuery(LOAD_POST_BY_ID, { variables: { postId } });
  const { data: appsData, loading: appsLoading, refetch } = useQuery(LOAD_APPLICATIONS_BY_POST_ID, { variables: { postId } });
  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS);

  const post = postData?.loadPostById;
  const applicants = appsData?.loadApplicationsByPostId || [];

  const handleAcceptApplicant = async (applicationId: string) => {
    try {
      await updateStatus({ variables: { applicationId, status: 'accepted' } });
      toast.success('Applicant accepted');
      refetch();
    } catch {
      toast.error('Failed to accept applicant');
    }
  };

  const handleRejectApplicant = async (applicationId: string) => {
    try {
      await updateStatus({ variables: { applicationId, status: 'rejected' } });
      toast.success('Applicant rejected');
      refetch();
    } catch {
      toast.error('Failed to reject applicant');
    }
  };

  if (postLoading || appsLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!post) return <div className="p-8 text-center text-red-500">Project not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/myposts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground mt-1">{applicants.length} applicants for this position</p>
          </div>
        </div>

        {/* Post Summary */}
        {/* <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tech_stack?.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Location: {post.location_id || '-'}</div>
          </CardContent>
        </Card> */}

        {/* Applicants */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Applicants ({applicants.length})</h2>

          {applicants.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No applicants yet</h3>
                    <p className="text-muted-foreground">Your post is live and people can start applying</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applicants.map((applicant: any) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  onAccept={handleAcceptApplicant}
                  onReject={handleRejectApplicant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
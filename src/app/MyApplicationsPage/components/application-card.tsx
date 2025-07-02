import { useMutation } from '@apollo/client';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { APPLY_TO_POST, SAVE_POST, UNSAVE_POST, CANCEL_APPLY_TO_POST } from '@/graphql';

interface ApplicationCardProps {
  post: {
    _id: string;
    first_name: string;
    last_name?: string;
    photo?: string;
    title: string;
    tech_stack: string[];
    work_mode?: string;
    experience_level?: string;
    applications_count?: number;
    views_count?: number;
    created_at: string;
    description?: string;
    is_applied?: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | null;
    is_saved?: boolean;
  };
  application: {
    _id: string;
    post_id: string;
    applicant_id: string;
    message: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export function ApplicationCard({ post, application }: ApplicationCardProps) {
  const creatorName = `${post.first_name} ${post.last_name}`;
  const creatorAvatar = post.photo;
  const skills = post.tech_stack || [];
  const interestedCount = post.applications_count ?? 0;
  const viewCount = post.views_count ?? 0;
  const difficulty = post.experience_level || 'Beginner';
  const isRemote = post.work_mode?.toLowerCase() === 'remote';
  const datePosted = new Date(post.created_at).toLocaleDateString();

  const [isSaved, setIsSaved] = useState(post.is_saved || false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(application.status);
  const [canceling, setCanceling] = useState(false);

  const [savePost] = useMutation(SAVE_POST, {
    variables: { postId: post._id },
    onCompleted: () => setIsSaved(true),
  });

  const [unsavePost] = useMutation(UNSAVE_POST, {
    variables: { postId: post._id },
    onCompleted: () => {
      setIsSaved(false);
    },
  });

  const [applyToPost, { loading: applying }] = useMutation(APPLY_TO_POST, {
    variables: {
      postId: post._id,
      message: 'Looking forward to this opportunity!',
    },
    onCompleted: (data) => setApplicationStatus(data.applyToPost.status),
  });

  const [cancelApplyToPost] = useMutation(CANCEL_APPLY_TO_POST, {
    variables: { applicationId: application._id },
    onCompleted: () => {
      setApplicationStatus('withdrawn');
      setCanceling(false);
    },
  });

  const handleSaveToggle = () => {
    if (isSaved) {
      unsavePost();
    } else {
      savePost();
    }
  };

  const handleApply = () => {
    if (!applicationStatus || applicationStatus === 'withdrawn') {
      applyToPost();
    }
  };

  const handleCancelApplication = () => {
    setCanceling(true);
    cancelApplyToPost();
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getApplyButtonLabel = () => {
    if (!applicationStatus || applicationStatus === 'withdrawn') return 'Apply';
    return applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1);
  };

  return (
    <Card className="w-full hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
              <AvatarImage src={creatorAvatar || '/placeholder.svg'} />
              <AvatarFallback className="font-semibold">
                {creatorName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold">{creatorName}</h4>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="sr-only">Posted on</span>
                  <span>{datePosted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="sr-only">Views</span>
                  <span>{viewCount} views</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
            {isRemote && (
              <Badge
                variant="outline"
                className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
              >
                Remote
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl mb-2 leading-tight">{post.title}</h3>
            {post.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{post.description}</p>
            )}
          </div>

          <div className="">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{interestedCount} applications</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

   

      {/* Application details section */}
      <CardContent className="">
        <div className="bg-muted rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Your Application</span>
            <Badge variant="outline" className="capitalize">
              {applicationStatus}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mb-1">
            <span className="font-medium">Message:</span> {application.message || <span className="italic">No message</span>}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Applied on:</span> {new Date(application.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>


      <CardFooter className="">
        <div className="flex items-center justify-between w-full gap-3">
          <Link to={`/post/${post._id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full gap-2">
              View Post
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isSaved ? 'secondary' : 'ghost'}
              size="sm"
              onClick={handleSaveToggle}
              className={`gap-1 ${isSaved ? 'text-blue-600' : ''}`}
              title={isSaved ? 'Unsave Post' : 'Save Post'}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>

            <Button
              variant={applicationStatus && applicationStatus !== 'withdrawn' ? 'secondary' : 'outline'}
              size="sm"
              className={`gap-1 px-6 py-2 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950 ${applicationStatus && applicationStatus !== 'withdrawn' ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={!!applicationStatus && applicationStatus !== 'withdrawn' || applying}
              onClick={handleApply}
            >
              {getApplyButtonLabel()}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="gap-1"
              disabled={applicationStatus === 'withdrawn' || canceling}
              onClick={handleCancelApplication}
            >
              {canceling ? 'Cancelling...' : 'Cancel Application'}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

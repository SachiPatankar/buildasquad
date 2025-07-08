"use client"

import { useState, useEffect } from "react"
import { Plus, Eye, Users, MoreVertical, Edit, UserX, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LOAD_POSTS_BY_USER_ID, CLOSE_POST, OPEN_POST, DELETE_POST } from "@/graphql"
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import type { PostSummary } from "@/graphql/generated"

export default function MyPostsPage() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(LOAD_POSTS_BY_USER_ID, { fetchPolicy: 'network-only' });
  const [closePost] = useMutation(CLOSE_POST);
  const [openPost] = useMutation(OPEN_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; postId: string | null; action: 'open' | 'close' | 'delete' | null }>({ open: false, postId: null, action: null });
  const client = useApolloClient();

  const posts = data?.loadPostsByUserId || [];

  // Always refetch posts on mount (e.g., after create/update)
  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  const getStatusColor = (status: string) => {
    return status === "accepting"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }

  const handleCloseRecruitment = (postId: string) => {
    setConfirmDialog({ open: true, postId, action: 'close' });
  }

  const handleOpenRecruitment = (postId: string) => {
    setConfirmDialog({ open: true, postId, action: 'open' });
  }

  const handleDeletePost = (postId: string) => {
    setConfirmDialog({ open: true, postId, action: 'delete' });
  }

  const handleConfirmAction = async () => {
    if (!confirmDialog.postId || !confirmDialog.action) return;
    try {
      if (confirmDialog.action === 'close') {
        await closePost({ variables: { postId: confirmDialog.postId } });
        toast.success('Post closed successfully');
      } else if (confirmDialog.action === 'open') {
        await openPost({ variables: { postId: confirmDialog.postId } });
        toast.success('Post opened successfully');
      } else if (confirmDialog.action === 'delete') {
        await deletePost({ variables: { postId: confirmDialog.postId } });
        toast.success('Post deleted successfully');
      }
      await client.refetchQueries({ include: [LOAD_POSTS_BY_USER_ID] });
    } catch (_err) {
      toast.error('Failed to update post');
    }
    setConfirmDialog({ open: false, postId: null, action: null });
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading posts</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">My Posts</h1>
            <p className="text-muted-foreground mt-1">Manage your project posts and view applicants</p>
          </div>
          <Link to="/post/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first project post to start building your team
                  </p>
                  <Link to="/post/new">
                    <Button>Create Your First Post</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post: PostSummary) => (
              <Card key={post._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/post/edit/${post._id}`}>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Post
                          </DropdownMenuItem>
                        </Link>
                        {post.status === "open" && (
                          <DropdownMenuItem onClick={() => handleCloseRecruitment(post._id)}>
                            <UserX className="h-4 w-4 mr-2" />
                            Close Recruitment
                          </DropdownMenuItem>
                        )}
                        {post.status === "closed" && (
                          <DropdownMenuItem onClick={() => handleOpenRecruitment(post._id)}>
                            <Users className="h-4 w-4 mr-2" />
                            Open Post
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeletePost(post._id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(post.tech_stack) && post.tech_stack.filter((tech): tech is string => !!tech).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {/* Experience Level, Location, Views, Applications, Created At */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Experience:</span> {post.experience_level || '-'}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {post.location_id || '-'}
                      </div>
                      <div>
                        <span className="font-medium">Views:</span> {post.views_count}
                      </div>
                      <div>
                        <span className="font-medium">Applications:</span> {post.applications_count}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {post.created_at}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate(`/post/${post._id}`)}>
                        <Eye className="h-4 w-4" />
                        View Post
                      </Button>
                      <Button size="sm" className="gap-1" onClick={() => navigate(`/myposts/${post._id}`)}>
                        <Users className="h-4 w-4" />
                        View Applicants
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmDialog.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">
                {confirmDialog.action === 'close' ? 'Close Recruitment?' : confirmDialog.action === 'open' ? 'Open Recruitment?' : 'Delete Post?'}
              </h3>
              <p className="mb-6">
                {confirmDialog.action === 'close'
                  ? 'Are you sure you want to close this post? This action cannot be undone.'
                  : confirmDialog.action === 'open'
                  ? 'Are you sure you want to open this post for recruitment?'
                  : 'Are you sure you want to delete this post? This action cannot be undone.'}
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConfirmDialog({ open: false, postId: null, action: null })}>
                  Cancel
                </Button>
                <Button variant={confirmDialog.action === 'delete' ? 'destructive' : confirmDialog.action === 'close' ? 'destructive' : 'default'} onClick={handleConfirmAction}>
                  {confirmDialog.action === 'close' ? 'Close Post' : confirmDialog.action === 'open' ? 'Open Post' : 'Delete Post'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

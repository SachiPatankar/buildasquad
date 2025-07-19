import { useQuery } from '@apollo/client';
import { GET_SAVED_POSTS } from '@/graphql';
import { ProjectCard } from '../HomePage/components/project-card';
import { useEffect } from 'react';

export default function SavedPostsPage() {
  const { data, loading, error, refetch } = useQuery(GET_SAVED_POSTS);
  const posts = data?.getSavedPosts || [];

  // Callback to trigger refetch after unsaving
  const handleUnsave = () => {
    refetch();
  };

  // Refetch when window regains focus (e.g., after navigating from projects)
  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Saved Posts</h1>
      <p className="text-muted-foreground mb-8">All the posts you have saved for later. You can unsave them or apply directly from here.</p>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error loading saved posts.</div>}
      {!loading && posts.length === 0 && (
        <div className="text-muted-foreground">You have no saved posts yet.</div>
      )}
      <div className="space-y-6">
        {posts.map((post: any) => (
          <ProjectCard key={post._id} project={post} onUnsave={handleUnsave} />
        ))}
      </div>
    </div>
  );
}

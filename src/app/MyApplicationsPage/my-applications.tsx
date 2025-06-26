import { useQuery } from '@apollo/client';
import { GET_APPLICATIONS_BY_USER } from '@/graphql';
import { ApplicationCard } from './components/application-card';

export default function MyApplicationsPage() {
  const { data, loading, error } = useQuery(GET_APPLICATIONS_BY_USER);
  const applications = data?.getApplicationsByUser || [];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">My Applications</h1>
      <p className="text-muted-foreground mb-8">All the posts you have applied to. You can view, save, or cancel your application from here.</p>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error loading applications.</div>}
      {!loading && applications.length === 0 && (
        <div className="text-muted-foreground">You have not applied to any posts yet.</div>
      )}
      <div className="space-y-6">
        {applications.map((item: any) => (
          <ApplicationCard key={item.application._id} post={item.post} application={item.application} />
        ))}
      </div>
    </div>
  );
}

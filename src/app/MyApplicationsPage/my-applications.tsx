import { useQuery } from '@apollo/client';
import { GET_APPLICATIONS_BY_USER } from '@/graphql';
import { ApplicationCard } from './components/application-card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MyApplicationsPage() {
  const { data, loading, error } = useQuery(GET_APPLICATIONS_BY_USER);
  const applications = data?.getApplicationsByUser || [];
  const [search, setSearch] = useState('');

  const filteredApplications = applications.filter((item: any) =>
    item.post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">My Applications</h1>
      <p className="text-muted-foreground mb-8">All the posts you have applied to. You can view, save, or cancel your application from here.</p>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by project title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error loading applications.</div>}
      {!loading && filteredApplications.length === 0 && (
        <div className="text-muted-foreground">No applications found.</div>
      )}
      <div className="space-y-6">
        {filteredApplications.map((item: any) => (
          <ApplicationCard key={item.application._id} post={item.post} application={item.application} />
        ))}
      </div>
    </div>
  );
}

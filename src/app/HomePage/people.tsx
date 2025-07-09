import { useState, useCallback, useRef, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { UserCard } from "@/app/HomePage/components/user-card"
import { LOAD_PEOPLE, LOAD_PEOPLE_BY_FILTER } from "@/graphql"

interface PeopleFilterState {
  selectedSkills: string[];
  selectedTitles: string[];
}

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<PeopleFilterState>({
    selectedSkills: [],
    selectedTitles: [],
  })
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  // Build PeopleFilterInput for GraphQL
  const peopleFilterInput: any = {}
  if (filter.selectedSkills.length > 0) {
    peopleFilterInput.skills = filter.selectedSkills
  }
  if (filter.selectedTitles.length > 0) {
    peopleFilterInput.title = filter.selectedTitles[0]
  }

  const filterActive = Object.keys(peopleFilterInput).length > 0
  const { data, loading, fetchMore, refetch } = useQuery(
    filterActive ? LOAD_PEOPLE_BY_FILTER : LOAD_PEOPLE,
    filterActive
      ? { variables: { filter: peopleFilterInput, page: 1, limit: 4 }, notifyOnNetworkStatusChange: true }
      : { variables: { page: 1, limit: 4 }, notifyOnNetworkStatusChange: true }
  )

  // Reset on filter/search change
  useEffect(() => {
    setPage(1)
    setUsers([])
    setHasMore(true)
    refetch()
  }, [filterActive, JSON.stringify(peopleFilterInput), searchQuery])

  // When data changes (first page), set users
  useEffect(() => {
    if (data) {
      const newUsers = filterActive
        ? data.loadPeopleByFilter ?? []
        : data.loadPeople ?? []
      if (page === 1) {
        setUsers(newUsers)
        setHasMore(newUsers.length === 4)
      }
    }
  }, [data, page, filterActive])

  // Infinite scroll handler
  const lastUserRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchMore({
              variables: {
                page: nextPage,
                limit: 4,
                ...(filterActive ? { filter: peopleFilterInput } : {}),
              },
            }).then(fetchMoreResult => {
              const newUsers = filterActive
                ? fetchMoreResult.data.loadPeopleByFilter ?? []
                : fetchMoreResult.data.loadPeople ?? [];
              setUsers(prev =>
                [...prev, ...newUsers].filter(
                  (item, idx, arr) => arr.findIndex(i => i._id === item._id) === idx
                )
              );
              setHasMore(newUsers.length === 4);
            });
            return nextPage;
          });
        }
      });
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, fetchMore, filterActive, peopleFilterInput]
  )

  const handleFilterChange = useCallback((newFilter: PeopleFilterState) => {
    setFilter(newFilter)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Sidebar (responsive) */}
        <FilterSidebar type="people" filter={filter} onFilterChange={handleFilterChange} />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Search */}
          <div className="px-2 sm:px-4 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Find People</h1>
                <SearchBar placeholder="Search by name or skills..." value={searchQuery} onChange={setSearchQuery} />
              </div>
              {/* Remove mobile FilterSidebar here */}
            </div>
          </div>
          {/* People Content */}
          <div className="p-2 sm:p-4 lg:p-6">
            {users.length === 0 && !loading && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-40">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">No people found</h2>
                <p className="text-sm">Try adjusting your filters or search to find more people.</p>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {users.map((user: any, idx: number) => {
                if (!user || !user._id || !user.first_name) return null;
                const isLast = idx === users.length - 1;
                return (
                  <div key={user._id} ref={isLast ? lastUserRef : null}>
                    <UserCard
                      user={{
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name ?? "",
                        photo: user.photo,
                        location_id: user.location_id,
                        title: user.title,
                        bio: user.bio,
                        top_skills: Array.isArray(user.top_skills) ? user.top_skills : [],
                        is_connection: user.is_connection,
                        chat_id: user.chat_id,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {loading && <div className="col-span-full">Loading...</div>}
            {!loading && !hasMore && users.length > 0 && (
              <div className="col-span-full text-center text-muted-foreground py-4">No more people.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
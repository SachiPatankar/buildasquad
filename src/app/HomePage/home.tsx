import { useState, useCallback, useRef, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { ProjectCard } from "@/app/HomePage/components/project-card"
import { LOAD_POST_BY_FILTER, LOAD_POSTS, SEARCH_PROJECTS } from "@/graphql"

interface FilterState {
  selectedSkills: string[]
  selectedRoles: string[]
  selectedProjectTypes: string[]
  selectedWorkModes: string[]
  selectedExperienceLevels: string[]
}

// Helper to check if any filter is active
function isFilterActive(filter: FilterState) {
  return (
    filter.selectedSkills.length > 0 ||
    filter.selectedRoles.length > 0 ||
    filter.selectedProjectTypes.length > 0 ||
    filter.selectedWorkModes.length > 0 ||
    filter.selectedExperienceLevels.length > 0
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterState>({
    selectedSkills: [],
    selectedRoles: [],
    selectedProjectTypes: [],
    selectedWorkModes: [],
    selectedExperienceLevels: [],
  })
  const [page, setPage] = useState(1)
  const [projects, setProjects] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  // Build PostFilterInput for GraphQL
  const postFilterInput = {
    tech_stack: filter.selectedSkills,
    desired_roles: filter.selectedRoles,
    project_type: filter.selectedProjectTypes,
    work_mode: filter.selectedWorkModes,
    experience_level: filter.selectedExperienceLevels,
  }

  const filterActive = isFilterActive(filter);
  const useSearch = searchQuery && !filterActive;
  const { data, loading, fetchMore, refetch } = useQuery(
    useSearch ? SEARCH_PROJECTS : filterActive ? LOAD_POST_BY_FILTER : LOAD_POSTS,
    useSearch
      ? { variables: { search: searchQuery }, notifyOnNetworkStatusChange: true }
      : filterActive
        ? { variables: { filter: postFilterInput, page: 1, limit: 4 }, notifyOnNetworkStatusChange: true }
        : { variables: { page: 1, limit: 4 }, notifyOnNetworkStatusChange: true }
  )

  // Reset on filter/search change
  useEffect(() => {
    setPage(1)
    setProjects([])
    setHasMore(true)
    refetch()
  }, [filterActive, JSON.stringify(postFilterInput), searchQuery])

  // When data changes (first page), set projects
  useEffect(() => {
    if (data) {
      let newProjects = [];
      if (useSearch) {
        newProjects = data.searchProjects ?? [];
      } else if (filterActive) {
        newProjects = data.loadPostByFilter ?? [];
      } else {
        newProjects = data.loadPosts ?? [];
      }
      if (page === 1) {
        setProjects(newProjects)
        setHasMore(newProjects.length === 4)
      }
    }
  }, [data, page, filterActive, useSearch])

  // Infinite scroll handler
  const lastProjectRef = useCallback(
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
                ...(filterActive ? { filter: postFilterInput } : {}),
              },
            }).then(fetchMoreResult => {
              const newProjects = filterActive
                ? fetchMoreResult.data.loadPostByFilter ?? []
                : fetchMoreResult.data.loadPosts ?? [];
              setProjects(prev =>
                [...prev, ...newProjects].filter(
                  (item, idx, arr) => arr.findIndex(i => i._id === item._id) === idx
                )
              );
              setHasMore(newProjects.length === 4);
            });
            return nextPage;
          });
        }
      });
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, fetchMore, filterActive, postFilterInput]
  )

  const handleFilterChange = useCallback((newFilter: FilterState) => {
    setFilter(newFilter)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row h-fit">
        {/* Sidebar (responsive) */}
        <FilterSidebar type="projects" filter={filter} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Search */}
          <div className="px-4 sm:px-4 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Discover Projects</h1>
                <SearchBar
                  placeholder="Search by skill, branch, or domain..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              {/* Remove mobile FilterSidebar here */}
            </div>
          </div>

          {/* Projects Content */}
          <div className="p-2 sm:p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              {projects.map((project: any, idx: number) => {
                const isLast = idx === projects.length - 1;
                return (
                  <div key={project._id} ref={isLast ? lastProjectRef : null} className="h-full flex flex-col">
                    <ProjectCard project={project} />
                  </div>
                );
              })}
              {loading && <div className="col-span-full">Loading...</div>}
              {!loading && !hasMore && projects.length > 0 && (
                <div className="col-span-full text-center text-muted-foreground py-4">No more projects.</div>
              )}
              {!loading && !hasMore && projects.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-semibold mb-2">No posts found</h2>
                  <p className="text-sm">Try adjusting your filters or search to find more projects.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

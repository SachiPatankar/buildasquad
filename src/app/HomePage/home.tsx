import { useState, useCallback } from "react"
import { useQuery } from "@apollo/client"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { ProjectCard } from "@/app/HomePage/components/project-card"
import { LOAD_POST_BY_FILTER } from "@/graphql"

interface FilterState {
  selectedSkills: string[]
  selectedRoles: string[]
  selectedProjectTypes: string[]
  selectedWorkModes: string[]
  selectedExperienceLevels: string[]
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

  // Build PostFilterInput for GraphQL
  const postFilterInput = {
    tech_stack: filter.selectedSkills,
    desired_roles: filter.selectedRoles,
    project_type: filter.selectedProjectTypes,
    work_mode: filter.selectedWorkModes,
    experience_level: filter.selectedExperienceLevels,
  }

  const { data, loading, error } = useQuery(LOAD_POST_BY_FILTER, {
    variables: { filter: postFilterInput },
  })

  const projects = data?.loadPostByFilter ?? []

  const handleFilterChange = useCallback((newFilter: FilterState) => {
    setFilter(newFilter)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <FilterSidebar type="projects" filter={filter} onFilterChange={handleFilterChange} />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Search */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Discover Projects</h1>
                <SearchBar
                  placeholder="Search by skill, branch, or domain..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <div className="lg:hidden">
                <FilterSidebar type="projects" filter={filter} onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>

          {/* Projects Content */}
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading && <div className="col-span-full">Loading...</div>}
              {error && <div className="col-span-full">Error loading projects.</div>}
              {!loading && !error && projects.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-semibold mb-2">No posts found</h2>
                  <p className="text-sm">Try adjusting your filters or search to find more projects.</p>
                </div>
              )}
              {!loading && !error && projects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

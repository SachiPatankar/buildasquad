import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { ProjectCard } from "@/app/HomePage/components/project-card"
import { LOAD_POSTS } from "@/graphql"


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data, loading, error } = useQuery(LOAD_POSTS, {
    variables: { page: 1, limit: 10 },
  })

  const projects = data?.loadPosts ?? []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <FilterSidebar type="projects" />

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
                <FilterSidebar type="projects" />
              </div>
            </div>
          </div>

          {/* Projects Content */}
          <div className="p-4 lg:p-6">
            <div className="space-y-6">
              {loading && <div>Loading...</div>}
              {error && <div>Error loading projects.</div>}
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

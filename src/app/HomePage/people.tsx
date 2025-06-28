import { useState, useCallback } from "react"
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

  // Build PeopleFilterInput for GraphQL
  const peopleFilterInput: any = {}
  if (filter.selectedSkills.length > 0) {
    peopleFilterInput.skills = filter.selectedSkills
  }
  if (filter.selectedTitles.length > 0) {
    // Use the first title as the filter (or adapt as needed)
    peopleFilterInput.title = filter.selectedTitles[0]
  }

  const { data, loading, error } = useQuery(
    Object.keys(peopleFilterInput).length > 0 ? LOAD_PEOPLE_BY_FILTER : LOAD_PEOPLE,
    {
      variables: Object.keys(peopleFilterInput).length > 0
        ? { filter: peopleFilterInput, page: 1, limit: 20 }
        : { page: 1, limit: 20 },
    }
  )

  // Get users array from the correct field
  const users = Object.keys(peopleFilterInput).length > 0
    ? data?.loadPeopleByFilter || []
    : data?.loadPeople || []

  const handleFilterChange = useCallback((newFilter: PeopleFilterState) => {
    setFilter(newFilter)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <FilterSidebar type="people" filter={filter} onFilterChange={handleFilterChange} />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Search */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">Find People</h1>
                <SearchBar placeholder="Search by name or skills..." value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="lg:hidden">
                <FilterSidebar type="people" filter={filter} onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
          {/* People Content */}
          <div className="p-4 lg:p-6">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading people.</div>
            ) : (
              <>
                {users.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-40">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold mb-2">No people found</h2>
                    <p className="text-sm">Try adjusting your filters or search to find more people.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {users.map((user: any) => {
                      if (!user || !user._id || !user.first_name) return null;
                      return (
                        <UserCard
                          key={user._id}
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
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
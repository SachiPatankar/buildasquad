import { useState } from "react"
import { useQuery } from "@apollo/client"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { UserCard } from "@/app/HomePage/components/user-card"
import { LOAD_PEOPLE, LOAD_PEOPLE_BY_FILTER } from "@/graphql"

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Choose query and variables based on searchQuery
  const { data, loading, error } = useQuery(
    searchQuery.trim() ? LOAD_PEOPLE_BY_FILTER : LOAD_PEOPLE,
    {
      variables: searchQuery.trim()
        ? { filter: { search: searchQuery }, page: 1, limit: 20 }
        : { page: 1, limit: 20 },
    }
  )

  // Get users array from the correct field
  const users = searchQuery.trim()
    ? data?.loadPeopleByFilter || []
    : data?.loadPeople || []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <FilterSidebar type="people" />
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
                <FilterSidebar type="people" />
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
                    }}
                  />
                );
              })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
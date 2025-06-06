import { useState } from "react"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { UserCard } from "@/app/HomePage/components/user-card"

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Ananya Singh",
    year: "Third Year",
    branch: "Computer Science",
    skills: ["React", "Node.js", "Python", "UI/UX Design"],
    isAvailable: true,
  },
  {
    id: "2",
    name: "Vikram Mehta",
    year: "Final Year",
    branch: "Information Technology",
    skills: ["Java", "Spring Boot", "MySQL", "DevOps", "Docker", "Kubernetes"],
    isAvailable: false,
  },
  {
    id: "3",
    name: "Sneha Reddy",
    year: "Second Year",
    branch: "Electronics",
    skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
    isAvailable: true,
  },
  {
    id: "4",
    name: "Rohit Gupta",
    year: "Third Year",
    branch: "Computer Science",
    skills: ["React Native", "Flutter", "Firebase", "Mobile Development"],
    isAvailable: true,
  },
  {
    id: "5",
    name: "Kavya Nair",
    year: "Final Year",
    branch: "Information Technology",
    skills: ["Blockchain", "Solidity", "Web3", "Ethereum"],
    isAvailable: false,
  },
  {
    id: "6",
    name: "Aditya Joshi",
    year: "Second Year",
    branch: "Computer Science",
    skills: ["JavaScript", "TypeScript", "Vue.js", "Express.js"],
    isAvailable: true,
  },
]

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState("")

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
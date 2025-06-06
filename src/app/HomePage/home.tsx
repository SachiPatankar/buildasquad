import { useState } from "react"
import { SearchBar } from "@/app/HomePage/layout/search-bar"
import { FilterSidebar } from "@/app/HomePage/layout/sidebar-filter"
import { ProjectCard } from "@/app/HomePage/components/project-card"

// Mock data
const mockProjects = [
  {
    id: "1",
    creatorName: "Rahul Sharma",
    creatorYear: "TE",
    title: "E-commerce Mobile App Development",
    skills: ["React Native", "Node.js", "MongoDB"],
    duration: "3 months",
    datePosted: "2 days ago",
    description:
      "Looking for developers to build a complete e-commerce mobile application with payment integration and real-time notifications.",
  },
  {
    id: "2",
    creatorName: "Priya Patel",
    creatorYear: "BE",
    title: "AI-Powered Study Assistant",
    skills: ["Python", "Machine Learning", "React"],
    duration: "4 months",
    datePosted: "1 week ago",
    description:
      "Building an AI assistant that helps students with personalized study plans and doubt resolution using NLP.",
  },
  {
    id: "3",
    creatorName: "Arjun Kumar",
    creatorYear: "SE",
    title: "Blockchain Voting System",
    skills: ["Solidity", "Web3", "JavaScript"],
    duration: "2 months",
    datePosted: "3 days ago",
    description: "Developing a secure and transparent voting system using blockchain technology for college elections.",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

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
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Plus, Eye, Users, Calendar, MoreVertical, Edit, UserX, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for user's posts
const mockPosts = [
  {
    id: "1",
    title: "AI-Powered Study Assistant",
    description:
      "Building an intelligent study companion that helps students with personalized learning paths and doubt resolution using NLP.",
    status: "accepting",
    createdOn: "2 weeks ago",
    applicantCount: 8,
    skills: ["Python", "Machine Learning", "React"],
    projectType: "Academic",
    teamSize: 4,
  },
  {
    id: "2",
    title: "E-commerce Mobile App",
    description: "Full-stack mobile application with payment integration and real-time notifications.",
    status: "closed",
    createdOn: "1 month ago",
    applicantCount: 12,
    skills: ["React Native", "Node.js", "MongoDB"],
    projectType: "Startup-level",
    teamSize: 3,
  },
  {
    id: "3",
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology for college elections.",
    status: "accepting",
    createdOn: "5 days ago",
    applicantCount: 3,
    skills: ["Solidity", "Web3", "JavaScript"],
    projectType: "Open Source",
    teamSize: 5,
  },
]

export default function MyPostsPage() {
  const [posts] = useState(mockPosts)

  const getStatusColor = (status: string) => {
    return status === "accepting"
      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }

  const handleCloseRecruitment = (postId: string) => {
    // Handle closing recruitment
    console.log("Closing recruitment for post:", postId)
  }

  const handleDeletePost = (postId: string) => {
    // Handle deleting post
    console.log("Deleting post:", postId)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">My Posts</h1>
            <p className="text-muted-foreground mt-1">Manage your project posts and view applicants</p>
          </div>
          <Link to="/post/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first project post to start building your team
                  </p>
                  <Link to="/post/new">
                    <Button>Create Your First Post</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status === "accepting" ? "Accepting Applications" : "Closed"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">{post.description}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/post/${post.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Post
                          </DropdownMenuItem>
                        </Link>
                        {post.status === "accepting" && (
                          <DropdownMenuItem onClick={() => handleCloseRecruitment(post.id)}>
                            <UserX className="h-4 w-4 mr-2" />
                            Close Recruitment
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeletePost(post.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {post.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {post.createdOn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Team of {post.teamSize}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {post.projectType}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {post.applicantCount} applicant{post.applicantCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/post/${post.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View Post
                          </Button>
                        </Link>
                        <Link to={`/myposts/${post.id}`}>
                          <Button size="sm" className="gap-1">
                            <Users className="h-4 w-4" />
                            View Applicants
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

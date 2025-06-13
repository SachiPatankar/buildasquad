"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, MessageCircle, User, Star, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock data for post and applicants
const mockPost = {
  id: "1",
  title: "AI-Powered Study Assistant",
  description:
    "Building an intelligent study companion that helps students with personalized learning paths and doubt resolution using NLP.",
  skills: ["Python", "Machine Learning", "React", "FastAPI"],
  teamSize: 4,
  applicantCount: 8,
}

const mockApplicants = [
  {
    id: "1",
    name: "Ananya Singh",
    year: "Third Year",
    branch: "Computer Science",
    skills: ["Python", "Machine Learning", "TensorFlow", "React"],
    avatar: "/placeholder.svg",
    rating: 4.8,
    projectsCompleted: 6,
    location: "Mumbai, India",
    message:
      "Hi! I'm really excited about this project. I have experience with ML models and have worked on similar NLP projects. I'd love to contribute to the AI algorithms and help with the React frontend.",
    appliedOn: "2 days ago",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Vikram Mehta",
    year: "Final Year",
    branch: "Information Technology",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    avatar: "/placeholder.svg",
    rating: 4.6,
    projectsCompleted: 8,
    location: "Delhi, India",
    message:
      "I have strong backend development skills and experience with FastAPI. I can help build robust APIs and handle the database architecture for the study assistant.",
    appliedOn: "1 day ago",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Priya Sharma",
    year: "Second Year",
    branch: "Computer Science",
    skills: ["React", "TypeScript", "UI/UX Design", "Figma"],
    avatar: "/placeholder.svg",
    rating: 4.5,
    projectsCompleted: 4,
    location: "Bangalore, India",
    message:
      "I'm passionate about creating intuitive user experiences. I can handle the frontend development and ensure the study assistant has a clean, user-friendly interface.",
    appliedOn: "3 days ago",
    isAvailable: false,
  },
]

export default function PostApplicantsPage() {
  const { postId } = useParams()
  const [applicants] = useState(mockApplicants)
  const [post] = useState(mockPost)

  const handleAcceptApplicant = (applicantId: string) => {
    // Handle accepting applicant
    console.log("Accepting applicant:", applicantId)
  }

  const handleRejectApplicant = (applicantId: string) => {
    // Handle rejecting applicant
    console.log("Rejecting applicant:", applicantId)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/myposts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground mt-1">{applicants.length} applicants for this position</p>
          </div>
        </div>

        {/* Post Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Looking for {post.teamSize} team members</div>
          </CardContent>
        </Card>

        {/* Applicants */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Applicants ({applicants.length})</h2>

          {applicants.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No applicants yet</h3>
                    <p className="text-muted-foreground">Your post is live and people can start applying</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applicants.map((applicant) => (
                <Card key={applicant.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Applicant Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                              <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg font-semibold">
                                {applicant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {applicant.isAvailable && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{applicant.name}</h3>
                              {applicant.isAvailable && (
                                <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                  Available
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-primary font-medium mb-2">
                              {applicant.year} • {applicant.branch}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {applicant.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                {applicant.rating}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {applicant.projectsCompleted} projects
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {applicant.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Application Message */}
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium mb-2">Application Message</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{applicant.message}</p>
                          <div className="text-xs text-muted-foreground mt-2">Applied {applicant.appliedOn}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:w-48 flex lg:flex-col gap-2">
                        <Link to={`/profile/${applicant.id}`} className="flex-1 lg:flex-none">
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <User className="h-4 w-4" />
                            View Profile
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                        <Separator className="lg:my-2" />
                        <Button
                          size="sm"
                          className="flex-1 lg:flex-none"
                          onClick={() => handleAcceptApplicant(applicant.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none text-destructive border-destructive hover:bg-destructive hover:text-white"
                          onClick={() => handleRejectApplicant(applicant.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

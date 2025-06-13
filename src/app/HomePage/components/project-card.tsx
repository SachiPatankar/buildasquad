"use client"

import { Heart, Users, MessageCircle, Calendar, Clock, Eye, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

interface ProjectCardProps {
  project: {
    id: string
    creatorName: string
    creatorYear: string
    creatorAvatar?: string
    title: string
    skills: string[]
    duration: string
    datePosted: string
    description?: string
    isRemote?: boolean
    teamSize?: number
    interestedCount?: number
    viewCount?: number
    difficulty?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const teamSize = project.teamSize || Math.floor(Math.random() * 5) + 2
  const interestedCount = project.interestedCount || Math.floor(Math.random() * 15) + 3
  const viewCount = project.viewCount || Math.floor(Math.random() * 50) + 10
  const difficulty = project.difficulty || ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)]
  const isRemote = project.isRemote ?? Math.random() > 0.5

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <Card className="w-full hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
              <AvatarImage src={project.creatorAvatar || "/placeholder.svg"} />
              <AvatarFallback className="font-semibold">
                {project.creatorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold">{project.creatorName}</h4>
                <Badge variant="secondary" className="text-xs">
                  {project.creatorYear}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.datePosted}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {project.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {viewCount} views
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
            {isRemote && (
              <Badge
                variant="outline"
                className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
              >
                Remote
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl mb-2 leading-tight">{project.title}</h3>
            {project.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{project.description}</p>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Team of {teamSize}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{interestedCount} interested</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Separator className="mx-6" />

      <CardFooter className="pt-4">
        <div className="flex items-center justify-between w-full gap-3">
          <Link to={`/post/${project.id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
            >
              <Users className="h-4 w-4" />
              Join
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

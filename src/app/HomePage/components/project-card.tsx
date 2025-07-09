"use client"
import {
  MessageCircle,
  Calendar,
  Eye,
  BookmarkPlus,
  BookmarkCheck,
} from "lucide-react"
import {  useMutation } from "@apollo/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { APPLY_TO_POST, SAVE_POST, UNSAVE_POST } from "@/graphql"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow, parseISO } from "date-fns"
import useAuthStore from "@/stores/userAuthStore"

interface ProjectCardProps {
  project: {
    _id: string
    first_name: string
    last_name: string
    photo?: string
    title: string
    tech_stack: string[]
    work_mode?: string
    experience_level?: string
    applications_count?: number
    views_count?: number
    created_at: string
    description?: string
    is_applied?: "pending" | "accepted" | "rejected" | "withdrawn" | null
    is_saved?: boolean
    posted_by: string
    requirements?: {
      desired_roles: string[];
    };
  };
  onUnsave?: () => void; // Optional callback for unsave
}

export function ProjectCard({ project, onUnsave }: ProjectCardProps) {
  const creatorName = `${project.first_name} ${project.last_name}`
  const creatorAvatar = project.photo
  const skills = project.tech_stack || []
  const roles = project.requirements?.desired_roles || []
  const interestedCount = project.applications_count ?? 0
  const viewCount = project.views_count ?? 0
  const difficulty = project.experience_level || "Beginner"
  const isRemote = project.work_mode?.toLowerCase() === "remote"
  const datePosted = formatDistanceToNow(parseISO(project.created_at), { addSuffix: true })

  // ✅ Local state for UI updates after mutation
  const [isSaved, setIsSaved] = useState(project.is_saved || false)
  const [applicationStatus, setApplicationStatus] = useState<
    "pending" | "accepted" | "rejected" | "withdrawn" | null
  >(project.is_applied ?? null)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // ✅ Sync local state with props changes
  useEffect(() => {
    setApplicationStatus(project.is_applied ?? null)
  }, [project.is_applied])

  useEffect(() => {
    setIsSaved(project.is_saved || false)
  }, [project.is_saved])

  // ✅ Mutations
  const [savePost] = useMutation(SAVE_POST, {
    variables: { postId: project._id },
    onCompleted: () => setIsSaved(true),
    onError: (error) => {
      console.error('Save failed:', error)
    }
  })

  const [unsavePost] = useMutation(UNSAVE_POST, {
    variables: { postId: project._id },
    onCompleted: () => {
      setIsSaved(false);
      if (onUnsave) onUnsave();
    },
    onError: (error) => {
      console.error('Unsave failed:', error)
    }
  })

  const [applyToPost, { loading: applying }] = useMutation(APPLY_TO_POST, {
    variables: {
      postId: project._id,
      message: applicationMessage,
    },
    onCompleted: (data) => {
      setApplicationStatus(data.applyToPost.status)
      setDialogOpen(false)
      setApplicationMessage("")
    },
    onError: (error) => {
      console.error('Application failed:', error)
      // Keep dialog open on error so user can retry
      // Optionally show error message to user
    }
  })

  const handleSaveToggle = () => {
    if (isSaved) {
      unsavePost()
    } else {
      savePost()
    }
  }

  const handleApply = () => {
    if (!applicationStatus) {
      setDialogOpen(true)
    }
  }

  const handleDialogApply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicationStatus && !applying) {
      applyToPost()
    }
  }

  const handleDialogClose = () => {
    if (!applying) {
      setDialogOpen(false)
      setApplicationMessage("")
    }
  }

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

  const getApplyButtonLabel = () => {
    if (!applicationStatus) return "Apply"
    
    switch(applicationStatus) {
      case "pending":
        return "Pending"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      case "withdrawn":
        return "Withdrawn"
      default:
        return "Apply"
    }
  }

  const currentUser = useAuthStore((s) => s.user)

  return (
    <Card className="w-full min-h-[400px] flex flex-col hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
              <AvatarImage src={creatorAvatar || "/placeholder.svg"} />
              <AvatarFallback className="font-semibold">
                {creatorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold">{creatorName}</h4>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {datePosted}
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

      <CardContent className="pb-2 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 flex flex-col">
          <div>
            <h3 className="font-bold text-xl mb-2 leading-tight line-clamp-1">{project.title}</h3>
            {project.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed min-h-[2.5em]">{project.description}</p>
            )}
            {!project.description && (
              <div className="min-h-[2.5em]" />
            )}
          </div>

          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              {roles.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Roles</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {roles.map((role: string) => (
                      <Badge key={role} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{interestedCount} applications</span>
              </div>
            </div>
            
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className=" mt-auto">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-full md:gap-3">
          <Link to={`/post/${project._id}`} className="flex-1">
            <Button variant="default" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
          </Link>

          <div className="flex flex-row flex-wrap items-stretch gap-2 w-full md:w-auto">
            <Button
              variant={isSaved ? "secondary" : "ghost"}
              size="sm"
              onClick={handleSaveToggle}
              className={`flex-1 min-w-0 md:w-auto gap-1 ${isSaved ? "text-blue-600" : ""}`}
              title={isSaved ? "Unsave Post" : "Save Post"}
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
              {isSaved ? "Saved" : "Save"}
            </Button>
            
            {currentUser?._id !== project.posted_by && (
              <Button
                variant={applicationStatus ? "secondary" : "outline"}
                size="sm"
                className={`flex-1 min-w-0 md:w-auto gap-1 px-6 py-2 ${
                  applicationStatus 
                    ? "opacity-60 cursor-not-allowed" 
                    : "border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
                }`}
                disabled={!!applicationStatus || applying}
                onClick={handleApply}
              >
                {applying ? "Applying..." : getApplyButtonLabel()}
              </Button>
            )}
          </div>
        </div>
      </CardFooter>

      {/* Application Message Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <form onSubmit={handleDialogApply}>
            <DialogHeader>
              <DialogTitle>Apply to Project</DialogTitle>
              <DialogDescription>
                Optionally include a message with your application.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={applicationMessage}
              onChange={e => setApplicationMessage(e.target.value)}
              placeholder="Write a message (optional)"
              className="mt-2"
              rows={4}
              disabled={applying}
            />
            <DialogFooter className="mt-4 flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={applying}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default" disabled={applying}>
                {applying ? "Applying..." : "Send Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
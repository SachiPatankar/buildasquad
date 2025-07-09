"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { ArrowLeft, Calendar, Users, MapPin, BookmarkPlus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LOAD_POST_BY_ID, SAVE_POST, UNSAVE_POST, APPLY_TO_POST, INCREMENT_POST_VIEW } from "@/graphql"
import { toast } from "react-toastify"
import { format, parseISO } from "date-fns"
import useAuthStore from '@/stores/userAuthStore'

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>()
  const { data, loading, error } = useQuery(LOAD_POST_BY_ID, {
    variables: { postId },
    skip: !postId,
  })

  const [savePost] = useMutation(SAVE_POST)
  const [unsavePost] = useMutation(UNSAVE_POST)
  const [applyToPost] = useMutation(APPLY_TO_POST)
  const [incrementPostView] = useMutation(INCREMENT_POST_VIEW)

  const [isSaved, setIsSaved] = useState(false)
  const [isApplied, setIsApplied] = useState<"pending" | "accepted" | "rejected" | "withdrawn" | null>(null)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const currentUser = useAuthStore.getState().user

  const handleApply = async () => {
    if (!postId) {
      alert("Invalid post.")
      return
    }

    try {
      await applyToPost({
        variables: { postId, message: applicationMessage },
      })
      toast("Application sent successfully!")
      setIsApplied("pending") // Update state to applied
      setShowApplicationForm(false)
      setApplicationMessage("") // Reset application message
    } catch (e) {
      console.error("Error applying to post:", e)
      alert("An error occurred while sending your application. Please try again.")
    }
  }

  const handleSave = async () => {
    if (!postId) return
    try {
      if (isSaved) {
        await unsavePost({ variables: { postId } })
        setIsSaved(false)
      } else {
        await savePost({ variables: { postId } })
        setIsSaved(true)
      }
    } catch (e) {
      console.error("Error saving post:", e)
      alert("An error occurred while saving the post. Please try again.")
    }
  }

  const handleConnect = async () => {
    alert('Connect feature coming soon!');
  };

  const handleMessage = () => {
    if (data?.loadPostById?.chat_id) {
      window.location.href = `/chat/${data.loadPostById.chat_id}`;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase?.toLowerCase()) {
      case "idea stage":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      case "planning":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
      case "development":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
      case "testing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "near completion":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  useEffect(() => {
    if (data?.loadPostById) {
      setIsSaved(data.loadPostById.is_saved ?? false)
      setIsApplied(data.loadPostById.is_applied ?? null)
    }
  }, [data])

  // Increment post view count when postId changes, only once per session
  useEffect(() => {
    if (postId) {
      const viewedKey = `viewed_post_${postId}`;
      if (!sessionStorage.getItem(viewedKey)) {
        incrementPostView({ variables: { postId } });
        sessionStorage.setItem(viewedKey, "true");
      }
    }
  }, [postId, incrementPostView]);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading post.</div>
  if (!data?.loadPostById) return <div>Post not found.</div>

  const post = {
    id: data.loadPostById._id,
    posted_by: data.loadPostById.posted_by,
    title: data?.loadPostById?.title || 'Unknown Title',
    description: data?.loadPostById?.description || 'No description available.',
    creatorName: data?.loadPostById?.first_name + " " + data?.loadPostById?.last_name || "Unknown", // Replace with actual data if available
    creatorAvatar: data?.loadPostById?.photo || "",
    datePosted: data?.loadPostById?.created_at
      ? format(parseISO(data.loadPostById.created_at), "PPpp")
      : "Unknown Date",
    location: data?.loadPostById?.location_id || "Unknown Location",
    applicantsCount: data?.loadPostById?.applications_count || 0,
    skills: data?.loadPostById?.requirements?.desired_skills || [],
    roles: data?.loadPostById?.requirements?.desired_roles || [],
    techStack: data?.loadPostById?.tech_stack || [],
    projectType: data?.loadPostById?.project_type || "Unknown",
    projectPhase: data?.loadPostById?.project_phase || "Unknown",
    experienceLevel: data?.loadPostById?.experience_level || "Unknown",
    workMode: data?.loadPostById?.work_mode || "Unknown",
    isSaved: data?.loadPostById?.is_saved ?? false,
    isApplied: data?.loadPostById?.is_applied,
    creatorChatId: data?.loadPostById?.chat_id || null,
    is_connection: data?.loadPostById?.is_connection || null,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold">{post.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Creator Info */}
            <Card>
              <CardContent className="">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-background shadow-lg mx-auto sm:mx-0" >
                    <AvatarImage src={post.creatorAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg font-semibold">
                      {post.creatorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg">{post.creatorName}</h3>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                    {currentUser?._id !== post.posted_by && (
                      post.is_connection === 'accepted' && post.creatorChatId ? (
                        <Button variant="outline" size="sm" onClick={handleMessage}>
                          Message
                        </Button>
                      ) : post.is_connection === 'pending' ? (
                        <Button variant="outline" size="sm" disabled>
                          Pending
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={handleConnect}>
                          Connect
                        </Button>
                      )
                    )}
                    <Link to={`/profile/${post.posted_by}`}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                     {post.datePosted}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {post.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {post.applicantsCount} applicants
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">{post.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>What We're Looking For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2 w-full min-w-0">
                    {post.skills.length ? (
                      post.skills.map((skill: string) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No skills listed.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Desired Roles</h4>
                  <div className="flex flex-wrap gap-2 w-full min-w-0">
                    {post.roles.map((role: string) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 w-full min-w-0">
                    {post.techStack.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="border-primary/20 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            {showApplicationForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Apply to Join This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tell the team why you're interested and what you can contribute
                      </label>
                      <textarea
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        placeholder="Share your relevant experience, skills, and why you want to join this project..."
                        className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleApply} className="gap-2">
                        <Send className="h-4 w-4" />
                        Send Application
                      </Button>
                      <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {/* Only show apply button if user is not the post creator */}
                  {currentUser?._id !== post.posted_by ? (
                    isApplied === null ? (
                      <Button
                        onClick={() => {
                          setShowApplicationForm(true)
                        }}
                        className="w-full gap-2"
                        disabled={showApplicationForm}
                      >
                        <Send className="h-4 w-4" />
                        {showApplicationForm ? "Fill Application Below" : "Apply to Join"}
                      </Button>
                    ) : (
                      <Button
                        className="w-full gap-2 opacity-60 cursor-not-allowed"
                        variant="secondary"
                        disabled
                      >
                        <Send className="h-4 w-4" />
                        Applied ({isApplied.charAt(0).toUpperCase() + isApplied.slice(1)})
                      </Button>
                    )
                  ) : null}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={handleSave}>
                      <BookmarkPlus className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-y-2">
                  <span className="text-sm text-muted-foreground">Project Type</span>
                  <Badge variant="secondary" className="text-xs md:text-sm">{post.projectType}</Badge>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-y-2">
                  <span className="text-sm text-muted-foreground">Phase</span>
                  <Badge className={getPhaseColor(post.projectPhase) + ' text-xs md:text-sm'}>{post.projectPhase}</Badge>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-y-2">
                  <span className="text-sm text-muted-foreground">Experience Level</span>
                  <Badge className={getDifficultyColor(post.experienceLevel) + ' text-xs md:text-sm'}>{post.experienceLevel}</Badge>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-y-2">
                  <span className="text-sm text-muted-foreground">Work Mode</span>
                  <Badge variant="outline" className="text-xs md:text-sm">{post.workMode}</Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="text-sm font-medium">{post.applicantsCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

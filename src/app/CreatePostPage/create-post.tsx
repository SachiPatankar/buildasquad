import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { CREATE_POST, UPDATE_POST, LOAD_POST_BY_ID, LOAD_POSTS_BY_USER_ID } from '@/graphql';
import { toast } from 'react-toastify';

const skillOptions = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "Machine Learning",
  "Data Science",
  "Mobile Development",
  "DevOps",
 
]

const workModes = ["Remote", "In-person", "Hybrid"]

const experience_level = ["Beginner", "Intermediate", "Advanced", "Any level"]

export default function CreatePostPage() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const isEdit = Boolean(postId)

  // Initial form state matching backend schema
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: {
      desired_skills: [] as string[],
      desired_roles: [] as string[],
    },
    tech_stack: [] as string[],
    project_phase: "",
    project_type: "",
    work_mode: "",
    experience_level: "",
    location_id: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [roleInput, setRoleInput] = useState("")
  const [techInput, setTechInput] = useState("")

  // Apollo hooks
  const { data: postData, loading: postLoading } = useQuery(LOAD_POST_BY_ID, {
    variables: { postId },
    skip: !isEdit,
  })
  const [createPost] = useMutation(CREATE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const client = useApolloClient();

  // Prefill form in edit mode
  useEffect(() => {
    if (isEdit && postData?.loadPostById) {
      const post = postData.loadPostById
      setFormData({
        title: post.title || "",
        description: post.description || "",
        requirements: {
          desired_skills: post.requirements?.desired_skills?.filter(Boolean) || [],
          desired_roles: post.requirements?.desired_roles?.filter(Boolean) || [],
        },
        tech_stack: post.tech_stack?.filter(Boolean) || [],
        project_phase: post.project_phase || "",
        project_type: post.project_type || "",
        work_mode: post.work_mode || "",
        experience_level: post.experience_level || "",
        location_id: post.location_id || "",
      })
    }
  }, [isEdit, postData])

  // Handlers for requirements
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.requirements.desired_skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          desired_skills: [...prev.requirements.desired_skills, skillInput.trim()],
        },
      }))
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        desired_skills: prev.requirements.desired_skills.filter((s) => s !== skill),
      },
    }))
  }

  const handleAddRole = () => {
    if (roleInput.trim() && !formData.requirements.desired_roles.includes(roleInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          desired_roles: [...prev.requirements.desired_roles, roleInput.trim()],
        },
      }))
      setRoleInput("")
    }
  }

  const handleRemoveRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        desired_roles: prev.requirements.desired_roles.filter((r) => r !== role),
      },
    }))
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tech_stack: [...prev.tech_stack, techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((t) => t !== tech),
    }))
  }

  // Form validation
  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.requirements.desired_skills.length > 0 &&
      formData.project_type &&
      formData.work_mode
    )
  }

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      title: formData.title,
      description: formData.description,
      requirements: {
        desired_skills: formData.requirements.desired_skills,
        desired_roles: formData.requirements.desired_roles,
      },
      tech_stack: formData.tech_stack,
      project_phase: formData.project_phase,
      project_type: formData.project_type,
      work_mode: formData.work_mode,
      experience_level: formData.experience_level,
      location_id: formData.location_id,
    }
    try {
      if (isEdit) {
        await updatePost({ variables: { postId, input } })
        toast.success("Post updated successfully")
      } else {
        await createPost({ variables: { input } })
        toast.success("Post created successfully")
      }
      navigate("/myposts")
    } catch (err) {
      toast.error("Failed to submit post")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/myposts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground mt-1">Share your project and find the perfect team members</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your project title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description *</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your project, its goals, and what you're looking to build"
                  className="mt-1 w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Team Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skills */}
              <div>
                <Label>Required Skills *</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    />
                    <Button type="button" onClick={handleAddSkill} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.requirements.desired_skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (formData.requirements.desired_skills.includes(skill)) {
                            handleRemoveSkill(skill);
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              requirements: {
                                ...prev.requirements,
                                desired_skills: [...prev.requirements.desired_skills, skill],
                              },
                            }));
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {formData.requirements.desired_skills.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm">Selected Skills:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.requirements.desired_skills.map((skill) => (
                          <Badge key={skill} className="gap-1">
                            {skill}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Roles */}
              <div>
                <Label>Desired Roles</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      placeholder="e.g., Frontend Developer, UI/UX Designer"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddRole())}
                    />
                    <Button type="button" onClick={handleAddRole} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.requirements.desired_roles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.requirements.desired_roles.map((role) => (
                        <Badge key={role} variant="secondary" className="gap-1">
                          {role}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveRole(role)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <Label>Preferred Experience Level</Label>
                <div className="flex gap-2 mt-2">
                  {[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                    { value: "any", label: "Any level" },
                  ].map((level) => (
                    <Button
                      key={level.value}
                      type="button"
                      variant={formData.experience_level === level.value ? "default" : "outline"}
                      onClick={() => setFormData((prev) => ({ ...prev, experience_level: level.value }))}
                    >
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tech Stack */}
              <div>
                <Label>Tech Stack</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="Add technology"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                    />
                    <Button type="button" onClick={handleAddTech} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tech_stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="gap-1">
                          {tech}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTech(tech)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <Label htmlFor="project_type">Project Type *</Label>
                <Input
                  id="project_type"
                  value={formData.project_type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, project_type: e.target.value }))}
                  placeholder="Enter the project type"
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Examples: Hackathon, Startup, Open Source, School Project
                </div>
              </div>

              {/* Project Phase */}
              <div>
                <Label htmlFor="project_phase">Project Phase</Label>
                <Input
                  id="project_phase"
                  value={formData.project_phase}
                  onChange={(e) => setFormData((prev) => ({ ...prev, project_phase: e.target.value }))}
                  placeholder="Enter the project phase"
                  className="mt-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Examples: Ideation, Development, MVP, Launched
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <Label>Work Mode *</Label>
                <div className="flex gap-2 mt-2">
                  {workModes.map((mode) => (
                    <Button
                      key={mode}
                      type="button"
                      variant={formData.work_mode === mode.toLowerCase() ? "default" : "outline"}
                      onClick={() => setFormData((prev) => ({ ...prev, work_mode: mode.toLowerCase() }))}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location_id">Location</Label>
                <Input
                  id="location_id"
                  value={formData.location_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location_id: e.target.value }))}
                  placeholder="Enter the location"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <Link to="/myposts" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={!isFormValid()}>
              {isEdit ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

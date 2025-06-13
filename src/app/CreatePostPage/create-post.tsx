"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const skillOptions = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Mobile Development",
  "DevOps",
  "Blockchain",
  "Cybersecurity",
  "Cloud Computing",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "Vue.js",
  "Angular",
  "Flutter",
  "React Native",
  "Django",
  "Flask",
  "Spring Boot",
]

const projectTypes = ["Academic", "Startup-level", "Hackathon", "Open Source", "Research", "Personal"]

const projectPhases = ["Idea stage", "Planning", "Development", "Testing", "Near completion", "Maintenance"]

const workModes = ["Remote", "In-person", "Hybrid"]

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [] as string[],
    roles: [] as string[],
    techStack: [] as string[],
    projectType: "",
    projectPhase: "",
    teamSize: "",
    workMode: "",
    experienceLevel: "",
    duration: "",
    additionalInfo: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [roleInput, setRoleInput] = useState("")
  const [techInput, setTechInput] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const handleAddRole = () => {
    if (roleInput.trim() && !formData.roles.includes(roleInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, roleInput.trim()],
      }))
      setRoleInput("")
    }
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleRemoveRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== role),
    }))
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating post:", formData)
    navigate("/myposts")
  }

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.skills.length > 0 &&
      formData.projectType &&
      formData.teamSize &&
      formData.workMode
    )
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
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (formData.skills.includes(skill)) {
                            handleRemoveSkill(skill)
                          } else {
                            setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm">Selected Skills:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
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
                  {formData.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="gap-1">
                          {role}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveRole(role)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Team Size */}
              <div>
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.teamSize}
                  onChange={(e) => setFormData((prev) => ({ ...prev, teamSize: e.target.value }))}
                  placeholder="How many people do you need?"
                  className="mt-1"
                />
              </div>

              {/* Experience Level */}
              <div>
                <Label>Preferred Experience Level</Label>
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any">Any level</Label>
                  </div>
                </RadioGroup>
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
                  {formData.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.techStack.map((tech) => (
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
                <Label>Project Type *</Label>
                <RadioGroup
                  value={formData.projectType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                  className="mt-2"
                >
                  {projectTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.toLowerCase()} id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Project Phase */}
              <div>
                <Label>Project Phase</Label>
                <RadioGroup
                  value={formData.projectPhase}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, projectPhase: value }))}
                  className="mt-2"
                >
                  {projectPhases.map((phase) => (
                    <div key={phase} className="flex items-center space-x-2">
                      <RadioGroupItem value={phase.toLowerCase()} id={phase} />
                      <Label htmlFor={phase}>{phase}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Work Mode */}
              <div>
                <Label>Work Mode *</Label>
                <RadioGroup
                  value={formData.workMode}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, workMode: value }))}
                  className="mt-2"
                >
                  {workModes.map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <RadioGroupItem value={mode.toLowerCase()} id={mode} />
                      <Label htmlFor={mode}>{mode}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration">Expected Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 3 months, 6 weeks"
                  className="mt-1"
                />
              </div>

              {/* Additional Info */}
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any additional details, requirements, or expectations"
                  className="mt-1 w-full min-h-[80px] px-3 py-2 border border-input rounded-md bg-transparent text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
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
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

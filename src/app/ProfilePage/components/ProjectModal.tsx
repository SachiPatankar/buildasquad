import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_PROJECT, UPDATE_PROJECT, GET_PROJECTS_BY_USER } from "@/graphql"
import { useParams } from "react-router-dom"

export type Project = {
  _id?: string
  user_id?: string
  title: string
  description?: string
  technologies?: string[]
  project_url?: string
  github_url?: string
  start_date?: string
  end_date?: string
  is_current?: boolean
  order?: number
}

export default function ProjectModal({
  open,
  onClose,
  userId: userIdProp,
  project,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  project?: Project | null
}) {
  const { userId: userIdFromParams } = useParams<{ userId?: string }>()
  const userId = userIdProp || userIdFromParams
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [technologies, setTechnologies] = useState<string[]>([])
  const [techInput, setTechInput] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [isCurrent, setIsCurrent] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (project) {
      setTitle(project.title || "")
      setDescription(project.description || "")
      setTechnologies(project.technologies || [])
      setGithubUrl(project.github_url || "")
      setProjectUrl(project.project_url || "")
      setIsCurrent(!!project.is_current)
      setStartDate(project.start_date || "")
      setEndDate(project.end_date || "")
    } else {
      setTitle("")
      setDescription("")
      setTechnologies([])
      setGithubUrl("")
      setProjectUrl("")
      setIsCurrent(false)
      setStartDate("")
      setEndDate("")
    }
    setTechInput("")
  }, [project, open])

  // Handle isCurrent toggle - clear endDate when current
  const handleIsCurrentChange = (checked: boolean) => {
    setIsCurrent(checked)
    if (checked) {
      setEndDate("")
    }
  }

  const [createProject, { loading: creating, error: createError }] = useMutation(CREATE_PROJECT, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_PROJECTS_BY_USER, variables: { userId } }],
  })
  const [updateProject, { loading: updating, error: updateError }] = useMutation(UPDATE_PROJECT, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_PROJECTS_BY_USER, variables: { userId } }],
  })
  // Remove deleteProject mutation, handleDelete, and related logic

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      title,
      description: description || null,
      technologies: technologies.length > 0 ? technologies : null,
      github_url: githubUrl || null,
      project_url: projectUrl || null,
      is_current: isCurrent,
      start_date: startDate || null,
      end_date: isCurrent ? null : (endDate || null),
    }
    if (project && project._id) {
      updateProject({ variables: { projectId: project._id, input } })
    } else {
      createProject({ variables: { userId, input } })
    }
  }

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()])
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech))
  }

  const error = createError || updateError
  const loading = creating || updating

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add technology"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTech()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTech}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => (
                <span key={tech} className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1">
                  {tech}
                  <button type="button" onClick={() => handleRemoveTech(tech)} className="text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>
          <Input
            placeholder="GitHub URL (optional)"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            type="url"
          />
          <Input
            placeholder="Project URL (optional)"
            value={projectUrl}
            onChange={e => setProjectUrl(e.target.value)}
            type="url"
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            max={endDate || undefined}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={e => handleIsCurrentChange(e.target.checked)}
              id="projIsCurrent"
            />
            <label htmlFor="projIsCurrent">Ongoing project</label>
          </div>
          {!isCurrent && (
            <Input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
          )}
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : project ? "Update" : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

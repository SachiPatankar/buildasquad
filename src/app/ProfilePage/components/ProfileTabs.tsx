import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import EducationModal from "./EducationModal"
import ExperienceModal from "./ExperienceModal"
import ProjectModal from "./ProjectModal"
import SkillModal from "./SkillModal"

type Education = {
  _id: string
  institution_name: string
  degree: string
  field_of_study: string
  grade?: string
  description?: string
}

type Experience = {
  _id: string
  position: string
  company_name: string
    start_date: string
    end_date?: string
    employment_type?: string
    description?: string
    is_current: boolean
}

type Project = {
  _id: string
  title: string
  description?: string
  technologies?: string[]
  github_url?: string
    project_url?: string
    is_current?: boolean
    
}

type Skill = {
  _id: string
  skill_name: string
  proficiency_level: string
}

interface ProfileTabsProps {
  isOwnProfile: boolean
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
}

export default function ProfileTabs({
  isOwnProfile,
  education,
  experience,
  projects,
  skills,
}: ProfileTabsProps) {
  const [showEduModal, setShowEduModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)
  const [showProjModal, setShowProjModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        })
    } 

  return (
    <>
      <Tabs defaultValue="education" className="space-y-6">
        <TabsList className="flex overflow-x-auto space-x-2 sm:justify-center">
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Education</CardTitle>
              {isOwnProfile && (
                <Button variant="ghost" size="sm" onClick={() => setShowEduModal(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((e) => (
                <div key={e._id} className="p-4 border rounded-lg space-y-1">
                <h4 className="font-semibold">{e.institution_name}</h4>
                <p className="text-muted-foreground">{e.degree} — {e.field_of_study}</p>
                {e.grade && <p className="text-sm text-muted-foreground">Grade: {e.grade}</p>}
                {e.description && <p className="text-sm">{e.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Experience</CardTitle>
              {isOwnProfile && (
                <Button variant="ghost" size="sm" onClick={() => setShowExpModal(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {experience.map((e) => (
                <div key={e._id} className="p-4 border rounded-lg space-y-1">
                <h4 className="font-semibold">{e.position}</h4>
                <p className="text-muted-foreground">{e.company_name}</p>
                <p className="text-sm text-muted-foreground">
                    {formatDate(e.start_date)} - {e.is_current ? 'Present' : e.end_date ? formatDate(e.end_date) : 'N/A'}
                    {e.employment_type && ` • ${e.employment_type}`}
                </p>
                {e.description && <p className="text-sm">{e.description}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Projects</CardTitle>
              {isOwnProfile && (
                <Button variant="ghost" size="sm" onClick={() => setShowProjModal(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((p) => (
                <div key={p._id} className="p-4 border rounded-lg space-y-1">
                <h4 className="font-semibold">{p.title}</h4>
                {p.description && <p className="text-muted-foreground">{p.description}</p>}
                {p.technologies?.length > 0 && (
                    <p className="text-sm">Tech: {p.technologies.join(', ')}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-1">
                    {p.github_url && (
                    <a href={p.github_url} target="_blank" className="text-blue-600 text-sm underline">
                        GitHub
                    </a>
                    )}
                    {p.project_url && (
                    <a href={p.project_url} target="_blank" className="text-blue-600 text-sm underline">
                        Live
                    </a>
                    )}
                    {p.is_current && <Badge>Ongoing</Badge>}
                </div>
                </div>

              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Skills</CardTitle>
              {isOwnProfile && (
                <Button variant="ghost" size="sm" onClick={() => setShowSkillModal(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((s) => (
                <div key={s._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <span>{s.skill_name}</span>
                  <Badge className={getSkillColor(s.proficiency_level)}>
                    {s.proficiency_level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EducationModal open={showEduModal} onClose={() => setShowEduModal(false)} />
      <ExperienceModal open={showExpModal} onClose={() => setShowExpModal(false)} />
      <ProjectModal open={showProjModal} onClose={() => setShowProjModal(false)} />
      <SkillModal open={showSkillModal} onClose={() => setShowSkillModal(false)} />
    </>
  )
}

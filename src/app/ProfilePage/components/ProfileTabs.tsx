import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, MoreVertical, GripVertical } from "lucide-react"
import EducationModal from "./EducationModal"
import ExperienceModal from "./ExperienceModal"
import ProjectModal from "./ProjectModal"
import SkillModal from "./SkillModal"
import AchievementModal from "./AchievementModal"
import type { Education } from "./EducationModal"
import type { Experience } from "./ExperienceModal"
import type { Project } from "./ProjectModal"
import type { Skill } from "./SkillModal"
import type { Achievement } from "./AchievementModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMutation } from "@apollo/client"
import { DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_PROJECT, DELETE_USER_SKILL, GET_EDUCATION_BY_USER, GET_EXPERIENCE_BY_USER, GET_PROJECTS_BY_USER, GET_SKILLS_BY_USER, DELETE_ACHIEVEMENT, GET_ACHIEVEMENTS_BY_USER, UPDATE_EDUCATION, UPDATE_EXPERIENCE, UPDATE_PROJECT, UPDATE_USER_SKILL, UPDATE_ACHIEVEMENT } from "@/graphql"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ReactSortable } from 'react-sortablejs'
import { useSearchParams, useParams } from "react-router-dom"

interface ProfileTabsProps {
  isOwnProfile: boolean
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  achievements: Achievement[]
}

export default function ProfileTabs({
  isOwnProfile,
  education,
  experience,
  projects,
  skills, 
  achievements,
}: ProfileTabsProps) {
  const { userId } = useParams<{ userId?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get('tab')
    const validTabs = ['education', 'experience', 'projects', 'skills', 'achievements']
    return validTabs.includes(tabParam || '') ? (tabParam as string) : 'education'
  })

  const [showEduModal, setShowEduModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)
  const [showProjModal, setShowProjModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showAchievementModal, setShowAchievementModal] = useState(false)
  const [showOrderDialog, setShowOrderDialog] = useState<null | 'education' | 'experience' | 'projects' | 'skills' | 'achievements'>(null)
  const [orderList, setOrderList] = useState<any[]>([])
  const [savingOrder, setSavingOrder] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  // Track which item is being edited or deleted
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)

  const [deleting, setDeleting] = useState<{
    type: "education" | "experience" | "project" | "skill" | "achievement" | null
    item: any
  }>({ type: null, item: null })

  // Delete mutations with refetchQueries
  const [deleteEducationMutation] = useMutation(DELETE_EDUCATION, {
    refetchQueries: [{ query: GET_EDUCATION_BY_USER, variables: { userId } }],
  })
  const [deleteExperienceMutation] = useMutation(DELETE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCE_BY_USER, variables: { userId } }],
  })
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS_BY_USER, variables: { userId } }],
  })
  const [deleteSkillMutation] = useMutation(DELETE_USER_SKILL, {
    refetchQueries: [{ query: GET_SKILLS_BY_USER, variables: { userId } }],
  })
  const [deleteAchievementMutation] = useMutation(DELETE_ACHIEVEMENT, {
    refetchQueries: [{ query: GET_ACHIEVEMENTS_BY_USER, variables: { userId } }],
  })

  // Update mutations with refetchQueries
  const [updateEducationMutation] = useMutation(UPDATE_EDUCATION, { 
    refetchQueries: [{ query: GET_EDUCATION_BY_USER, variables: { userId } }] 
  })
  const [updateExperienceMutation] = useMutation(UPDATE_EXPERIENCE, { 
    refetchQueries: [{ query: GET_EXPERIENCE_BY_USER, variables: { userId } }] 
  })
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT, { 
    refetchQueries: [{ query: GET_PROJECTS_BY_USER, variables: { userId } }] 
  })
  const [updateUserSkillMutation] = useMutation(UPDATE_USER_SKILL, { 
    refetchQueries: [{ query: GET_SKILLS_BY_USER, variables: { userId } }] 
  })
  const [updateAchievementMutation] = useMutation(UPDATE_ACHIEVEMENT, { 
    refetchQueries: [{ query: GET_ACHIEVEMENTS_BY_USER, variables: { userId } }] 
  })

  // Delete handlers (to be implemented with GraphQL mutations)
  const handleDelete = async () => {
    if (!deleting.type || !deleting.item) return
    try {
      if (deleting.type === "education" && deleting.item._id) {
        await deleteEducationMutation({ variables: { educationId: deleting.item._id } })
      } else if (deleting.type === "experience" && deleting.item._id) {
        await deleteExperienceMutation({ variables: { experienceId: deleting.item._id } })
      } else if (deleting.type === "project" && deleting.item._id) {
        await deleteProjectMutation({ variables: { projectId: deleting.item._id } })
      } else if (deleting.type === "skill" && deleting.item._id) {
        await deleteSkillMutation({ variables: { userSkillId: deleting.item._id } })
      } else if (deleting.type === "achievement" && deleting.item._id) {
        await deleteAchievementMutation({ variables: { achievementId: deleting.item._id } })
      }
      // Optionally refetch or update state here
    } catch (err) {
      // Optionally show error
      // eslint-disable-next-line no-console
      console.error(err)
    }
    setDeleting({ type: null, item: null })
  }

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

  const openOrderDialog = (type: typeof showOrderDialog) => {
    setShowOrderDialog(type)
    let arr: any[] = []
    switch(type) {
      case 'education': arr = [...education].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); break;
      case 'experience': arr = [...experience].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); break;
      case 'projects': arr = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); break;
      case 'skills': arr = [...skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); break;
      case 'achievements': arr = [...achievements].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); break;
    }
    setOrderList(arr.map(item => ({ ...item })))
  }
  const closeOrderDialog = () => { setShowOrderDialog(null); setOrderList([]); setOrderError(null); }

  const handleOrderChange = (newOrder: any[]) => {
    setOrderList(newOrder.map(item => ({ ...item })))
  }

  const handleSaveOrder = async () => {
    setSavingOrder(true)
    setOrderError(null)
    try {
      for (let i = 0; i < orderList.length; i++) {
        const item = orderList[i]
        if (showOrderDialog === 'education') {
          await updateEducationMutation({ variables: { educationId: item._id, input: { order: i } } })
        } else if (showOrderDialog === 'experience') {
          await updateExperienceMutation({ variables: { experienceId: item._id, input: { order: i } } })
        } else if (showOrderDialog === 'projects') {
          await updateProjectMutation({ variables: { projectId: item._id, input: { order: i } } })
        } else if (showOrderDialog === 'skills') {
          await updateUserSkillMutation({ variables: { userSkillId: item._id, input: { order: i } } })
        } else if (showOrderDialog === 'achievements') {
          await updateAchievementMutation({ variables: { achievementId: item._id, input: { order: i } } })
        }
      }
      closeOrderDialog()
    } catch (_err: any) {
      setOrderError('Failed to save order')
    }
    setSavingOrder(false)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSearchParams({ tab: value })
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
    
<TabsList className="flex flex-wrap justify-center gap-1 h-auto p-2">
  <TabsTrigger value="education" className="flex-shrink-1 flex-grow-0">Education</TabsTrigger>
  <TabsTrigger value="experience" className="flex-shrink-1 flex-grow-0">Experience</TabsTrigger>
  <TabsTrigger value="projects" className="flex-shrink-1 flex-grow-0">Projects</TabsTrigger>
  <TabsTrigger value="skills" className="flex-shrink-1 flex-grow-0">Skills</TabsTrigger>
  <TabsTrigger value="achievements" className="flex-shrink-1 flex-grow-0">Achievements</TabsTrigger>
</TabsList>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Education</CardTitle>
              {isOwnProfile && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingEducation(null); setShowEduModal(true) }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openOrderDialog('education')}>Edit Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {education
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((e) => (
                  <div key={e._id} className="p-4 border rounded-lg space-y-1 flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{e.institution_name}</h4>
                      <p className="text-muted-foreground">{e.degree} — {e.field_of_study}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(e.start_date)} - {e.is_current ? 'Present' : e.end_date ? formatDate(e.end_date) : 'N/A'}
                      </p>
                      {e.grade && <p className="text-sm text-muted-foreground">Grade: {e.grade}</p>}
                      {e.description && <p className="text-sm">{e.description}</p>}
                    </div>
                    {isOwnProfile && (
                      <div className="flex flex-col gap-2 ml-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingEducation(e); setShowEduModal(true) }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleting({ type: "education", item: e })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    )}
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
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingExperience(null); setShowExpModal(true) }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openOrderDialog('experience')}>Edit Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {experience
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((e) => (
                  <div key={e._id} className="p-4 border rounded-lg space-y-1 flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{e.position}</h4>
                      <p className="text-muted-foreground">{e.company_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(e.start_date)} - {e.is_current ? 'Present' : e.end_date ? formatDate(e.end_date) : 'N/A'}
                        {e.employment_type && ` • ${e.employment_type}`}
                      </p>
                      {e.description && <p className="text-sm">{e.description}</p>}
                    </div>
                    {isOwnProfile && (
                      <div className="flex flex-col gap-2 ml-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingExperience(e); setShowExpModal(true) }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleting({ type: "experience", item: e })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    )}
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
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingProject(null); setShowProjModal(true) }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openOrderDialog('projects')}>Edit Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {projects
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((p) => (
                  <div key={p._id} className="p-4 border rounded-lg space-y-1 flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      {p.description && <p className="text-muted-foreground">{p.description}</p>}
                      {p.technologies && p.technologies.length > 0 && (
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
                    {isOwnProfile && (
                      <div className="flex flex-col gap-2 ml-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingProject(p); setShowProjModal(true) }}><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleting({ type: "project", item: p })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    )}
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
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingSkill(null); setShowSkillModal(true) }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openOrderDialog('skills')}>Edit Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((s) => (
                  <div key={s._id} className="flex justify-between items-center p-3 border rounded-lg">
                    <span>{s.skill_name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={getSkillColor(s.proficiency_level)}>
                        {s.proficiency_level}
                      </Badge>
                      {isOwnProfile && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => { setEditingSkill(s); setShowSkillModal(true) }}><Pencil className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleting({ type: "skill", item: s })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Achievements</CardTitle>
              {isOwnProfile && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => {
                    setEditingAchievement(null);
                    setShowAchievementModal(true);
                  }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openOrderDialog('achievements')}>Edit Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((a) => (
                  <div
                    key={a._id}
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">{a.title}</h4>
                      {a.description && (
                        <p className="text-sm text-muted-foreground">{a.description}</p>
                      )}
                    </div>
                    {isOwnProfile && (
                      <div className="flex flex-col gap-2 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingAchievement(a);
                            setShowAchievementModal(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setDeleting({ type: "achievement", item: a })
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Modals */}
      <EducationModal open={showEduModal} onClose={() => { setShowEduModal(false); setEditingEducation(null) }} education={editingEducation as Education | null | undefined} />
      <ExperienceModal open={showExpModal} onClose={() => { setShowExpModal(false); setEditingExperience(null) }} experience={editingExperience as Experience | null | undefined} />
      <ProjectModal open={showProjModal} onClose={() => { setShowProjModal(false); setEditingProject(null) }} project={editingProject as Project | null | undefined} />
      <SkillModal open={showSkillModal} onClose={() => { setShowSkillModal(false); setEditingSkill(null) }} skill={editingSkill as Skill | null | undefined} />
      <AchievementModal open={showAchievementModal} onClose={() => { setShowAchievementModal(false); setEditingAchievement(null) }} achievement={editingAchievement as Achievement | null | undefined} />
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleting.type} onOpenChange={open => { if (!open) setDeleting({ type: null, item: null }) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete this {deleting.type}?</div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleting({ type: null, item: null })}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
      {showOrderDialog && (
        <Dialog open={!!showOrderDialog} onOpenChange={open => { if (!open) closeOrderDialog() }}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle>Edit Order</DialogTitle>
            </DialogHeader>
            <div className="py-2">
              <ReactSortable
                tag="div"
                list={orderList}
                setList={handleOrderChange}
                animation={200}
                handle=".drag-handle"
              >
                {orderList.map((item, _idx) => (
                  <div key={item._id} className="flex items-center justify-between p-2 border rounded mb-2 bg-muted">
                    <span>{item.title || item.institution_name || item.position || item.skill_name}</span>
                    <GripVertical className="drag-handle cursor-grab" />
                  </div>
                ))}
              </ReactSortable>
            </div>
            {orderError && <div className="text-red-500 text-sm mb-2">{orderError}</div>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={closeOrderDialog} disabled={savingOrder}>Cancel</Button>
              <Button variant="default" onClick={handleSaveOrder} disabled={savingOrder}>{savingOrder ? 'Saving...' : 'Save Order'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

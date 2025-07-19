import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER_SKILL, UPDATE_USER_SKILL, DELETE_USER_SKILL, GET_SKILLS_BY_USER } from "@/graphql"
import { Trash2 } from "lucide-react"
import { useParams } from "react-router-dom"

export type Skill = {
  _id?: string
  user_id?: string
  skill_name: string
  proficiency_level: string
  years_experience?: number
  is_top?: boolean
  order?: number
}

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function SkillModal({
  open,
  onClose,
  userId: userIdProp,
  skill,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  skill?: Skill | null
}) {
  const { userId: userIdFromParams } = useParams<{ userId?: string }>()
  const userId = userIdProp || userIdFromParams
  const [skillName, setSkillName] = useState("")
  const [proficiencyLevel, setProficiencyLevel] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [isTop, setIsTop] = useState(false)

  useEffect(() => {
    if (skill) {
      setSkillName(skill.skill_name || "")
      setProficiencyLevel(skill.proficiency_level || "")
      setYearsExperience(skill.years_experience?.toString() || "")
      setIsTop(skill.is_top || false)
    } else {
      setSkillName("")
      setProficiencyLevel("")
      setYearsExperience("")
      setIsTop(false)
    }
  }, [skill, open])

  const [createSkill, { loading: creating, error: createError }] = useMutation(CREATE_USER_SKILL, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_SKILLS_BY_USER, variables: { userId } }],
  })
  const [updateSkill, { loading: updating, error: updateError }] = useMutation(UPDATE_USER_SKILL, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_SKILLS_BY_USER, variables: { userId } }],
  })
  const [deleteSkill, { loading: deleting, error: deleteError }] = useMutation(DELETE_USER_SKILL, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_SKILLS_BY_USER, variables: { userId } }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      skill_name: skillName,
      proficiency_level: proficiencyLevel.toLowerCase(),
      years_experience: yearsExperience ? Number(yearsExperience) : null,
      is_top: isTop,
    }
    if (skill && skill._id) {
      updateSkill({ variables: { userSkillId: skill._id, input } })
    } else {
      createSkill({ variables: { userId, input } })
    }
  }

  const handleDelete = () => {
    if (skill && skill._id) {
      deleteSkill({ variables: { userSkillId: skill._id } })
    }
  }

  const error = createError || updateError || deleteError
  const loading = creating || updating || deleting

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{skill ? "Edit Skill" : "Add Skill"}</DialogTitle>
          {skill && skill._id && (
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={deleting}>
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          )}
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Skill Name"
            value={skillName}
            onChange={e => setSkillName(e.target.value)}
            required
          />
          <div>
            <label className="block mb-1">Proficiency Level</label>
            <select
              className="w-full border rounded px-2 py-1"
              value={proficiencyLevel}
              onChange={e => setProficiencyLevel(e.target.value)}
              required
            >
              <option value="" disabled>Select level</option>
              {PROFICIENCY_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <Input
            placeholder="Years of Experience (optional)"
            type="number"
            min="0"
            value={yearsExperience}
            onChange={e => setYearsExperience(e.target.value)}
          />
          {/* Add Top Skill Checkbox */}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={isTop}
                onChange={e => setIsTop(e.target.checked)}
              />
              Mark as Top Skill
            </label>
            <div className="text-xs text-muted-foreground mt-1">
              This skill will be shown on your profile
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : skill ? "Update" : "Save"}
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

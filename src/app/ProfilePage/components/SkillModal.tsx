import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER_SKILL, UPDATE_USER_SKILL, DELETE_USER_SKILL } from "@/graphql"
import { Trash2 } from "lucide-react"

export type Skill = {
  _id?: string
  skill_name: string
  proficiency_level: string
  years_experience?: number
}

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced"]

export default function SkillModal({
  open,
  onClose,
  userId,
  skill,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  skill?: Skill | null
}) {
  const [skillName, setSkillName] = useState("")
  const [proficiencyLevel, setProficiencyLevel] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")

  useEffect(() => {
    if (skill) {
      setSkillName(skill.skill_name || "")
      setProficiencyLevel(skill.proficiency_level || "")
      setYearsExperience(skill.years_experience?.toString() || "")
    } else {
      setSkillName("")
      setProficiencyLevel("")
      setYearsExperience("")
    }
  }, [skill, open])

  const [createSkill, { loading: creating, error: createError }] = useMutation(CREATE_USER_SKILL, {
    onCompleted: onClose,
  })
  const [updateSkill, { loading: updating, error: updateError }] = useMutation(UPDATE_USER_SKILL, {
    onCompleted: onClose,
  })
  const [deleteSkill, { loading: deleting, error: deleteError }] = useMutation(DELETE_USER_SKILL, {
    onCompleted: onClose,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      skill_name: skillName,
      proficiency_level: proficiencyLevel,
      years_experience: yearsExperience ? Number(yearsExperience) : undefined,
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

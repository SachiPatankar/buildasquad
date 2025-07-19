import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, GET_EXPERIENCE_BY_USER } from "@/graphql"
import { useParams } from "react-router-dom"

export type Experience = {
  _id?: string
  position: string
  company_name: string
  start_date: string
  end_date?: string
  employment_type?: string
  description?: string
  is_current: boolean
  location_id?: string
  order?: number
}

export default function ExperienceModal({
  open,
  onClose,
  userId: userIdProp,
  experience,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  experience?: Experience | null
}) {
  const { userId: userIdFromParams } = useParams<{ userId?: string }>()
  const userId = userIdProp || userIdFromParams
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isCurrent, setIsCurrent] = useState(false)
  const [description, setDescription] = useState("")
  const [employmentType, setEmploymentType] = useState("")

  useEffect(() => {
    if (experience) {
      setCompanyName(experience.company_name || "")
      setPosition(experience.position || "")
      setStartDate(experience.start_date || "")
      setEndDate(experience.end_date || "")
      setIsCurrent(!!experience.is_current)
      setDescription(experience.description || "")
      setEmploymentType(experience.employment_type || "")
    } else {
      setCompanyName("")
      setPosition("")
      setStartDate("")
      setEndDate("")
      setIsCurrent(false)
      setDescription("")
      setEmploymentType("")
    }
  }, [experience, open])

  // Handle isCurrent toggle - clear endDate when current
  const handleIsCurrentChange = (checked: boolean) => {
    setIsCurrent(checked)
    if (checked) {
      setEndDate("")
    }
  }

  const [createExperience, { loading: creating, error: createError }] = useMutation(CREATE_EXPERIENCE, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_EXPERIENCE_BY_USER, variables: { userId } }],
  })
  const [updateExperience, { loading: updating, error: updateError }] = useMutation(UPDATE_EXPERIENCE, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_EXPERIENCE_BY_USER, variables: { userId } }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      company_name: companyName,
      position,
      start_date: startDate,
      end_date: isCurrent ? null : (endDate || null),
      is_current: isCurrent,
      description: description || null,
      employment_type: employmentType || null,
    }
    if (experience && experience._id) {
      updateExperience({ variables: { experienceId: experience._id, input } })
    } else {
      createExperience({ variables: { userId, input } })
    }
  }

  const error = createError || updateError
  const loading = creating || updating

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{experience ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            required
          />
          <Input
            placeholder="Position"
            value={position}
            onChange={e => setPosition(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            max={endDate || undefined}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={e => handleIsCurrentChange(e.target.checked)}
              id="isCurrent"
            />
            <label htmlFor="isCurrent">I currently work here</label>
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
          <Input
            placeholder="Employment Type (e.g. Full-time, Part-time)"
            value={employmentType}
            onChange={e => setEmploymentType(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={300}
          />
          <div className="text-xs text-muted-foreground text-right mb-2">{description.length}/300</div>
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : experience ? "Update" : "Save"}
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

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_EDUCATION, UPDATE_EDUCATION, DELETE_EDUCATION, GET_EDUCATION_BY_USER } from "@/graphql"
import { Trash2 } from "lucide-react"
import { useParams } from "react-router-dom"

export type Education = {
  _id?: string
  institution_name: string
  degree: string
  field_of_study: string
  grade?: string
  description?: string
  start_date: string
  end_date?: string
  is_current: boolean
  order?: number
}

export default function EducationModal({
  open,
  onClose,
  education,
}: {
  open: boolean
  onClose: () => void
  education?: Education | null
}) {
  const { userId } = useParams<{ userId?: string }>()
  const [institutionName, setInstitutionName] = useState("")
  const [degree, setDegree] = useState("")
  const [fieldOfStudy, setFieldOfStudy] = useState("")
  const [grade, setGrade] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    if (education) {
      setInstitutionName(education.institution_name || "")
      setDegree(education.degree || "")
      setFieldOfStudy(education.field_of_study || "")
      setGrade(education.grade || "")
      setDescription(education.description || "")
      setStartDate(education.start_date || "")
      setEndDate(education.end_date || "")
      setIsCurrent(!!education.is_current)
    } else {
      setInstitutionName("")
      setDegree("")
      setFieldOfStudy("")
      setGrade("")
      setDescription("")
      setStartDate("")
      setEndDate("")
      setIsCurrent(false)
    }
  }, [education, open])

  // Handle isCurrent toggle - clear endDate when current
  const handleIsCurrentChange = (checked: boolean) => {
    setIsCurrent(checked)
    if (checked) {
      setEndDate("")
    }
  }

  const [createEducation, { loading: creating, error: createError }] = useMutation(CREATE_EDUCATION, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_EDUCATION_BY_USER, variables: { userId } }],
  })
  const [updateEducation, { loading: updating, error: updateError }] = useMutation(UPDATE_EDUCATION, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_EDUCATION_BY_USER, variables: { userId } }],
  })
  const [deleteEducation, { loading: deleting, error: deleteError }] = useMutation(DELETE_EDUCATION, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_EDUCATION_BY_USER, variables: { userId } }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      institution_name: institutionName,
      degree,
      field_of_study: fieldOfStudy,
      grade: grade || null, // Send null instead of empty string
      description: description || null, // Send null instead of empty string
      start_date: startDate,
      end_date: isCurrent ? null : (endDate || null), // Send null instead of empty string
      is_current: isCurrent,
    }
    if (education && education._id) {
      updateEducation({ variables: { educationId: education._id, input } })
    } else {
      createEducation({ variables: {  input } })
    }
  }

  const handleDelete = () => {
    if (education && education._id) {
      deleteEducation({ variables: { educationId: education._id } })
    }
  }

  const error = createError || updateError || deleteError
  const loading = creating || updating || deleting

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{education ? "Edit Education" : "Add Education"}</DialogTitle>
          {education && education._id && (
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={deleting}>
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          )}
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Institution Name"
            value={institutionName}
            onChange={e => setInstitutionName(e.target.value)}
            required
          />
          <Input
            placeholder="Degree"
            value={degree}
            onChange={e => setDegree(e.target.value)}
            required
          />
          <Input
            placeholder="Field of Study"
            value={fieldOfStudy}
            onChange={e => setFieldOfStudy(e.target.value)}
            required
          />
          <Input
            placeholder="Grade (optional)"
            value={grade}
            onChange={e => setGrade(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={e => handleIsCurrentChange(e.target.checked)}
              id="eduIsCurrent"
            />
            <label htmlFor="eduIsCurrent">I currently study here</label>
          </div>
          {!isCurrent && (
            <Input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          )}
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : education ? "Update" : "Save"}
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

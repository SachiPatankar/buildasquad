import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_EXPERIENCE } from "@/graphql" // adjust import path if needed

export default function ExperienceModal({
  open,
  onClose,
  userId,
}: {
  open: boolean
  onClose: () => void
  userId?: string
}) {
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isCurrent, setIsCurrent] = useState(false)
  const [description, setDescription] = useState("")
  const [employmentType, setEmploymentType] = useState("")

  const [createExperience, { loading, error }] = useMutation(CREATE_EXPERIENCE, {
    onCompleted: () => {
      setCompanyName("")
      setPosition("")
      setStartDate("")
      setEndDate("")
      setIsCurrent(false)
      setDescription("")
      setEmploymentType("")
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createExperience({
      variables: {
        userId,
        input: {
          company_name: companyName,
          position,
          start_date: startDate,
          end_date: isCurrent ? null : endDate,
          is_current: isCurrent,
          description,
          employment_type: employmentType,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
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
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={e => setIsCurrent(e.target.checked)}
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
          />
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
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

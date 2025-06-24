import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_ACHIEVEMENT, UPDATE_ACHIEVEMENT, DELETE_ACHIEVEMENT } from "@/graphql"
import { Trash2 } from "lucide-react"

export type Achievement = {
  _id?: string
  title: string
  description?: string
}

export default function AchievementModal({
  open,
  onClose,
  userId,
  achievement,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  achievement?: Achievement | null
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (achievement) {
      setTitle(achievement.title || "")
      setDescription(achievement.description || "")
    } else {
      setTitle("")
      setDescription("")
    }
  }, [achievement, open])

  const [createAchievement, { loading: creating, error: createError }] = useMutation(CREATE_ACHIEVEMENT, {
    onCompleted: onClose,
  })
  const [updateAchievement, { loading: updating, error: updateError }] = useMutation(UPDATE_ACHIEVEMENT, {
    onCompleted: onClose,
  })
  const [deleteAchievement, { loading: deleting, error: deleteError }] = useMutation(DELETE_ACHIEVEMENT, {
    onCompleted: onClose,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      title,
      description: description || undefined,
    }
    if (achievement && achievement._id) {
      updateAchievement({ variables: { achievementId: achievement._id, input } })
    } else {
      createAchievement({ variables: { userId, input } })
    }
  }

  const handleDelete = () => {
    if (achievement && achievement._id) {
      deleteAchievement({ variables: { achievementId: achievement._id } })
    }
  }

  const error = createError || updateError || deleteError
  const loading = creating || updating || deleting

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{achievement ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
          {achievement && achievement._id && (
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={deleting}>
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          )}
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
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : achievement ? "Update" : "Save"}
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

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_ACHIEVEMENT, UPDATE_ACHIEVEMENT, GET_ACHIEVEMENTS_BY_USER } from "@/graphql"
import { useParams } from "react-router-dom"

export type Achievement = {
  _id?: string
  title: string
  description?: string
  user_id?: string
  order?: number
}

export default function AchievementModal({
  open,
  onClose,
  userId: userIdProp,
  achievement,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  achievement?: Achievement | null
}) {
  const { userId: userIdFromParams } = useParams<{ userId?: string }>()
  const userId = userIdProp || userIdFromParams
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
    refetchQueries: [{ query: GET_ACHIEVEMENTS_BY_USER, variables: { userId } }],
  })
  const [updateAchievement, { loading: updating, error: updateError }] = useMutation(UPDATE_ACHIEVEMENT, {
    onCompleted: onClose,
    refetchQueries: [{ query: GET_ACHIEVEMENTS_BY_USER, variables: { userId } }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = {
      title,
      description: description || null,
    }
    if (achievement && achievement._id) {
      updateAchievement({ variables: { achievementId: achievement._id, input } })
    } else {
      createAchievement({ variables: { userId, input } })
    }
  }

  const error = createError || updateError
  const loading = creating || updating

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{achievement ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
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
            maxLength={300}
          />
          <div className="text-xs text-muted-foreground text-right mb-2">{description.length}/300</div>
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

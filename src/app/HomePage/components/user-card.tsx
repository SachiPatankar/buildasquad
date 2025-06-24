import { MessageCircle, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

interface UserCardProps {
  user: {
    id: string
    first_name: string
    last_name?: string
    photo?: string
    location_id?: string
    title?: string
    bio?: string
    top_skills?: {
      _id: string
      skill_name: string
      proficiency_level: string
    }[]
  }
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate()
  const name = `${user.first_name} ${user.last_name ?? ""}`.trim()
  const avatar = user.photo || "/placeholder.svg"
  const skills = Array.isArray(user.top_skills) ? user.top_skills : []
  const location = user.location_id || "Unknown location"
  const title = user.title || "No title"
  const bio = user.bio || ""

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300">
      <CardHeader className="">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-lg font-semibold">
              {(user.first_name?.[0] ?? "") + (user.last_name?.[0] ?? "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">{name}</h3>
            <p className="text-sm text-primary font-medium">{title}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-1">
          {/* Bio section */}
          {bio && (
            <div className="text-sm text-muted-foreground line-clamp-3">
              {bio}
            </div>
          )}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 4).map((skill) => (
                <Badge key={skill._id} variant="secondary" className="text-xs">
                  {skill.skill_name}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 gap-2">
      
        <Button
          variant="default"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => {
            navigate(`/profile/${user.id}`);
          }}
        >
          <User className="h-4 w-4" />
          View Profile
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <MessageCircle className="h-4 w-4" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  )
}

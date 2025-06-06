
import { MessageCircle, User, MapPin, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserCardProps {
  user: {
    id: string
    name: string
    year: string
    branch: string
    skills: string[]
    avatar?: string
    isAvailable?: boolean
    rating?: number
    projectsCompleted?: number
    location?: string
    lastSeen?: string
  }
}

export function UserCard({ user }: UserCardProps) {
  const rating = user.rating || 4.5
  const projectsCompleted = user.projectsCompleted || Math.floor(Math.random() * 10) + 1
  const location = user.location || "Mumbai, India"
  const lastSeen = user.lastSeen || "2 hours ago"

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {user.isAvailable && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg truncate">{user.name}</h3>
                <p className="text-sm text-primary font-medium">
                  {user.year} • {user.branch}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{location}</span>
                </div>
              </div>
              
              {user.isAvailable && (
                <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  Available
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{projectsCompleted} projects</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.slice(0, 4).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {user.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{user.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Last seen {lastSeen}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button variant="default" size="sm" className="flex-1 gap-2">
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
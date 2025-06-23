import {
  MapPin, Calendar, Users, Mail, Link as LinkIcon, Edit
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
  profileData: {
    name: string
    avatar: string
    title: string
    location: string
    year: number
    connections: number
    email: string
    portfolio?: string
    bio: string
  }
  isOwnProfile: boolean
}

export default function ProfileHeader({ profileData, isOwnProfile }: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col sm:flex-row flex-1 gap-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback>
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">{profileData.name}</h1>
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-2">{profileData.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{profileData.location}</div>
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{profileData.year}</div>
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{profileData.connections} connections</div>
              </div>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </div>
          </div>

          <div className="space-y-2">
            {!isOwnProfile && (
              <>
                <Button className="w-full"><Users className="h-4 w-4 mr-2" />Connect</Button>
                <Button variant="outline" className="w-full">Message</Button>
              </>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${profileData.email}`} className="hover:text-primary">{profileData.email}</a>
            </div>
            {profileData.portfolio && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

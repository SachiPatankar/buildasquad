import { MessageCircle, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { SEND_FRIEND_REQ } from '@/graphql';
import { useState } from 'react';
import useAuthStore from "@/stores/userAuthStore"

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
    is_connection?: string | null
    chat_id?: string
  }
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate()
  const [sendFriendReq, { loading }] = useMutation(SEND_FRIEND_REQ);
  const [connectionStatus, setConnectionStatus] = useState(user.is_connection);
  const name = `${user.first_name} ${user.last_name ?? ""}`.trim()
  const avatar = user.photo || "/placeholder.svg"
  const skills = Array.isArray(user.top_skills) ? user.top_skills : []
  const location = user.location_id || "Unknown location"
  const title = user.title || "No title"
  const bio = user.bio || ""
  const currentUser = useAuthStore((s) => s.user)
  const isOwnProfile = currentUser?._id === user.id;

  const handleConnect = async () => {
    try {
      await sendFriendReq({ variables: { addresseeUserId: user.id } });
      setConnectionStatus('pending');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleMessage = () => {
    if (user.chat_id) {
      navigate(`/chat/${user.chat_id}`);
    }
  };

  return (
    <Card className="w-full min-h-[90px] h-full flex flex-col hover:shadow-lg transition-all duration-300">
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
      <CardContent className="flex flex-col">
        {/* Only show bio if present */}
        {bio && (
          <div className="text-sm text-muted-foreground line-clamp-3 mb-1 min-h-[3.5em]">{bio}</div>
        )}
        {/* Only show skills if present */}
        {skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Skills</h4>
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
        )}
      </CardContent>
      <CardFooter className="pt-0 gap-2 mt-auto">
        {!isOwnProfile && (
          connectionStatus === 'accepted' && user.chat_id ? (
            <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={handleMessage}>
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          ) : connectionStatus === 'pending' ? (
            <Button variant="outline" size="sm" className="flex-1 gap-2" disabled>
              <MessageCircle className="h-4 w-4" />
              Pending
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={handleConnect} disabled={loading}>
              <MessageCircle className="h-4 w-4" />
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          )
        )}
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
      </CardFooter>
    </Card>
  )
}

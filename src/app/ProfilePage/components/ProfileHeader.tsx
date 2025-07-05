import {
  MapPin, Calendar, Users, Mail, Link as LinkIcon, Edit, Pencil
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfoModal, { type UserInfo } from "./UserInfoModal"
import { useState } from "react"
import AvatarCropDialog from "./AvatarCropDialog"
import { useMutation, useLazyQuery } from "@apollo/client"
import { UPDATE_USER, GET_PRESIGNED_URL } from "@/graphql"

interface Props {
  profileData: {
    name: string
    avatar: string
    title: string
    location: string
    year: number
    connections: number
    email: string
    bio: string
    links?: { name: string; url: string }[]
  }
  isOwnProfile: boolean
  onUserDataUpdate?: () => Promise<any>
}

export default function ProfileHeader({ profileData, isOwnProfile, onUserDataUpdate }: Props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [avatar, setAvatar] = useState(profileData.avatar)
  const [updateUser] = useMutation(UPDATE_USER)
  const [getPresignedUrl] = useLazyQuery(GET_PRESIGNED_URL)
  const [avatarLoading, setAvatarLoading] = useState(false)

  // Convert profileData to UserInfo type for the modal
  const userInfo: UserInfo = {
    first_name: profileData.name.split(" ")[0] || "",
    last_name: profileData.name.split(" ").slice(1).join(" ") || "",
    title: profileData.title,
    bio: profileData.bio,
    location_id: profileData.location,
    links: profileData.links
    // photo, links can be added if needed
  }

  const handleAvatarUpload = async (blob: Blob) => {
    setAvatarLoading(true)
    try {
      // 1. Get presigned URL
      const fileType = blob.type
      const { data } = await getPresignedUrl({ variables: { fileType, folder: "profile-picture" } })
      const { upload_url, file_url } = data.getPresignedUrl
      // 2. Upload to S3
      await fetch(upload_url, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": fileType },
      })
      // 3. Update user profile with new photo URL
      await updateUser({ variables: { input: { photo: file_url } } })
      setAvatar(file_url)
      // 4. Refetch user data to update the profile
      if (onUserDataUpdate) {
        await onUserDataUpdate()
      }
    } catch (err) {
      console.error("Avatar upload failed", err)
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleAvatarRemove = async () => {
    try {
      await updateUser({ variables: { input: { photo: null } } })
      setAvatar("")
      // Refetch user data to update the profile
      if (onUserDataUpdate) {
        await onUserDataUpdate()
      }
    } catch (err) {
      console.error("Avatar removal failed", err)
    }
  }

  const handleUserInfoUpdate = async () => {
    setShowEditModal(false)
    // Refetch user data to update the profile
    if (onUserDataUpdate) {
      await onUserDataUpdate()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col sm:flex-row flex-1 gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg"
                onClick={isOwnProfile ? () => setShowAvatarDialog(true) : undefined}
                style={isOwnProfile ? { cursor: 'pointer' } : {}}
              >
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
                {avatarLoading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                    <span className="text-white text-xs">Uploading...</span>
                  </div>
                )}
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">{profileData.name}</h1>
                {isOwnProfile && (
                  <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-2">{profileData.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {profileData.year}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {profileData.connections} connections
                </div>
              </div>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </div>
          </div>

          <div className="space-y-2">
            {!isOwnProfile && (
              <>
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                <Button variant="outline" className="w-full">
                  Message
                </Button>
              </>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${profileData.email}`} className="hover:text-primary">
                {profileData.email}
              </a>
            </div>
            {Array.isArray(profileData.links) && profileData.links.length > 0 && profileData.links.map((link, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      {isOwnProfile && (
        <>
          <UserInfoModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            initialData={userInfo}
            onUpdated={handleUserInfoUpdate}
          />
          <AvatarCropDialog
            open={showAvatarDialog}
            onClose={() => setShowAvatarDialog(false)}
            initialImage={avatar}
            onUpload={handleAvatarUpload}
            onRemove={handleAvatarRemove}
          />
        </>
      )}
    </Card>
  )
}
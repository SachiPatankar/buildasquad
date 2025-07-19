import {
  MapPin, Calendar, Users, Mail, Link as LinkIcon, Edit, Github, Linkedin, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfoModal, { type UserInfo } from "./UserInfoModal"
import { useState, useEffect } from "react"
import AvatarCropDialog from "./AvatarCropDialog"
import { useMutation, useLazyQuery } from "@apollo/client"
import { UPDATE_USER, GET_PRESIGNED_URL, SEND_FRIEND_REQ } from "@/graphql"

// LeetCode SVG Icon
const LeetCodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5 text-muted-foreground"
    fill="currentColor"
  >
    <path d="M22,14.355c0-0.742-0.564-1.346-1.26-1.346H10.676c-0.696,0-1.26,0.604-1.26,1.346s0.563,1.346,1.26,1.346H20.74C21.436,15.702,22,15.098,22,14.355z"></path>
    <path d="M3.482,18.187l4.313,4.361C8.768,23.527,10.113,24,11.598,24c1.485,0,2.83-0.512,3.805-1.494l2.588-2.637c0.51-0.514,0.492-1.365-0.039-1.9c-0.531-0.535-1.375-0.553-1.884-0.039l-2.676,2.607c-0.462,0.467-1.102,0.662-1.809,0.662s-1.346-0.195-1.81-0.662l-4.298-4.363c-0.463-0.467-0.696-1.15-0.696-1.863c0-0.713,0.233-1.357,0.696-1.824l4.285-4.38c0.463-0.467,1.116-0.645,1.822-0.645s1.346,0.195,1.809,0.662l2.676,2.606c0.51,0.515,1.354,0.497,1.885-0.038c0.531-0.536,0.549-1.387,0.039-1.901l-2.588-2.636c-0.649-0.646-1.471-1.116-2.392-1.33l-0.034-0.007l2.447-2.503c0.512-0.514,0.494-1.366-0.037-1.901c-0.531-0.535-1.376-0.552-1.887-0.038L3.482,10.476C2.509,11.458,2,12.813,2,14.311C2,15.809,2.509,17.207,3.482,18.187z"></path>
  </svg>
);
// Codeforces SVG Icon
const CodeforcesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5 text-muted-foreground"
    fill="currentColor"
  >
    <path d="M24 19.5V12c0-.828-.672-1.5-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5v7.5c0 .828.672 1.5 1.5 1.5h3C23.328 21 24 20.328 24 19.5zM13.5 21c.828 0 1.5-.672 1.5-1.5v-15C15 3.672 14.328 3 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5H13.5zM0 19.5C0 20.328.673 21 1.5 21h3C5.328 21 6 20.328 6 19.5V9c0-.828-.672-1.5-1.5-1.5h-3C.673 7.5 0 8.172 0 9V19.5z"></path>
  </svg>
);

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
    is_connection?: string
    chat_id?: string
  }
  isOwnProfile: boolean
  onUserDataUpdate?: () => Promise<any>
  userId: string // <-- add this
}

export default function ProfileHeader({ profileData, isOwnProfile, onUserDataUpdate, userId }: Props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  const [avatar, setAvatar] = useState(profileData.avatar)
  const [updateUser] = useMutation(UPDATE_USER)
  const [getPresignedUrl] = useLazyQuery(GET_PRESIGNED_URL)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [sendFriendReq, { loading: connectLoading }] = useMutation(SEND_FRIEND_REQ);
  const [connectionStatus, setConnectionStatus] = useState(profileData.is_connection);

  // Sync local avatar state with prop changes
  useEffect(() => {
    console.log('Avatar prop changed:', profileData.avatar)
    setAvatar(profileData.avatar)
  }, [profileData.avatar])

  // Convert profileData to UserInfo type for the modal
  const userInfo: UserInfo = {
    first_name: profileData.name.split(" ")[0] || "",
    last_name: profileData.name.split(" ").slice(1).join(" ") || "",
    title: profileData.title,
    bio: profileData.bio,
    location_id: profileData.location,
    links: profileData.links,
    photo: profileData.avatar
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
      
      // 4. Update local state immediately
      setAvatar(file_url)
      
      // 5. Refetch user data to update the profile
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

  const handleConnect = async () => {
    try {
      await sendFriendReq({ variables: { addresseeUserId: userId } });
      setConnectionStatus('pending');
    } catch (e: any) {
      alert(e.message || 'Failed to send connection request.');
    }
  };

  const handleMessage = () => {
    if (profileData.chat_id) {
      window.location.href = `/chat/${profileData.chat_id}`;
    }
  };

  // Helper to get icon for a link (same as in UserInfoModal)
  function getLinkIcon(url: string) {
    if (/github\.com/i.test(url)) return <Github className="h-4 w-4 text-muted-foreground" />;
    if (/linkedin\.com/i.test(url)) return <Linkedin className="h-4 w-4 text-muted-foreground" />;
    if (/leetcode\.com/i.test(url)) return <LeetCodeIcon />;
    if (/codeforces\.com/i.test(url)) return <CodeforcesIcon />;
    // CodeChef and others
    if (url) return <Globe className="h-4 w-4 text-muted-foreground" />;
    return <LinkIcon className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <Card>
      <CardContent className="pt-4">
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
              </div>
              <p className="text-lg text-foreground mb-2 mr-1">{profileData.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
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
                {connectionStatus === 'accepted' && profileData.chat_id ? (
                  <Button variant="outline" className="w-full" onClick={handleMessage}>
                    Message
                  </Button>
                ) : connectionStatus === 'pending' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Pending
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleConnect} disabled={connectLoading}>
                    {connectLoading ? 'Connecting...' : 'Connect'}
                  </Button>
                )}
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
                {getLinkIcon(link.url)}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {/* Move Edit Profile button to bottom right */}
      {isOwnProfile && (
        <div className="flex pl-4 lg:pl-34 pr-6 pb-5 md:pb-0">
          <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      )}
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
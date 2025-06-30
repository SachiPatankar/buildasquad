import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { LOAD_USER_BY_ID } from "@/graphql"
import {
  GET_EDUCATION_BY_USER,
  GET_EXPERIENCE_BY_USER,
  GET_PROJECTS_BY_USER,
  GET_SKILLS_BY_USER,
  GET_ACHIEVEMENTS_BY_USER
} from "@/graphql"
import { useMemo } from "react"
import ProfileHeader from "./components/ProfileHeader"
import ProfileTabs from "./components/ProfileTabs"

export default function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>()
  const isOwnProfile = !userId

  const { data: userData } = useQuery(LOAD_USER_BY_ID, {
    variables: userId ? { userId } : undefined,
    skip: !isOwnProfile && !userId,
  })

  const { data: educationData } = useQuery(GET_EDUCATION_BY_USER, {
    variables: userId ? { userId } : undefined,
  })

  const { data: experienceData } = useQuery(GET_EXPERIENCE_BY_USER, {
    variables: userId ? { userId } : undefined,
  })

  const { data: projectsData } = useQuery(GET_PROJECTS_BY_USER, {
    variables: userId ? { userId } : undefined,
  })

  const { data: skillsData } = useQuery(GET_SKILLS_BY_USER, {
    variables: userId ? { userId } : undefined,
  })

  const { data: achievementsData } = useQuery(GET_ACHIEVEMENTS_BY_USER, {
    variables: userId ? { userId } : undefined,
  })

  const profile = useMemo(() => {
    const user = userData?.loadUserById
    return {
      name: `${user?.first_name} ${user?.last_name ?? ""}`,
      avatar: user?.photo ?? "/placeholder.svg",
      title: user?.title ?? "No title",
      location: user?.location_id ?? "Unknown",
      year: new Date(user?.created_at).getFullYear(),
      connections: user?.connections_count ?? 0,
      email: user?.email,
      links: user?.links,
      bio: user?.bio ?? "",
    }
  }, [userData])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        <ProfileHeader profileData={profile} isOwnProfile={isOwnProfile} />
        <ProfileTabs
          isOwnProfile={isOwnProfile}
          education={educationData?.getEducationByUser ?? []}
          experience={experienceData?.getExperienceByUser ?? []}
          projects={projectsData?.getProjectsByUser ?? []}
          skills={skillsData?.getSkillsByUser ?? []}
          achievements={achievementsData?.getAchievementsByUser ?? []}
        />
      </div>
    </div>
  )
}

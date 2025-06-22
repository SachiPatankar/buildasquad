import { useState } from "react"
import {
  MapPin, Calendar, Users, Mail, Link as LinkIcon,
  Edit, Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock profile data
const profileData = {
  name: "Rahul Sharma",
  title: "Full Stack Developer & AI Enthusiast",
  college: "Indian Institute of Technology, Bombay",
  year: "Third Year (TE)",
  bio: "Passionate about building innovative solutions using modern technologies. Currently focusing on AI/ML applications and full-stack web development. Always eager to collaborate on exciting projects and learn new things.",
  location: "Mumbai, Maharashtra",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  portfolio: "https://rahulsharma.dev",
  connections: 142,
  projects: 8,
  avatar: "/placeholder.svg"
}

const education = [
  {
    id: "1",
    institution: "Indian Institute of Technology, Bombay",
    degree: "Bachelor of Technology in Computer Science",
    duration: "2022 - 2026",
    gpa: "8.7/10",
    achievements: ["Dean's List", "Coding Club President"]
  },
  {
    id: "2",
    institution: "Delhi Public School",
    degree: "Higher Secondary Education",
    duration: "2020 - 2022",
    gpa: "95.2%",
    achievements: ["Science Olympiad Gold Medal", "Mathematics Competition Winner"]
  }
]

const workExperience = [
  {
    id: "1",
    company: "Tech Innovations Pvt Ltd",
    position: "Software Development Intern",
    duration: "Jun 2024 - Aug 2024",
    location: "Mumbai, Maharashtra",
    description: "Developed and maintained web applications using React and Node.js. Implemented RESTful APIs and worked on database optimization.",
    skills: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Frontend Developer Intern",
    duration: "Dec 2023 - Feb 2024",
    location: "Remote",
    description: "Built responsive user interfaces and improved application performance by 40%. Collaborated with design team to implement pixel-perfect designs.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma"]
  }
]

const pastProjects = [
  {
    id: "1",
    title: "AI-Powered Study Assistant",
    description: "An intelligent study companion that helps students with personalized learning paths and doubt resolution.",
    skills: ["Python", "Machine Learning", "React", "FastAPI"],
    status: "Completed",
    duration: "4 months",
    team: "4 members"
  },
  {
    id: "2",
    title: "E-commerce Mobile App",
    description: "Full-stack mobile application with payment integration and real-time notifications.",
    skills: ["React Native", "Node.js", "MongoDB", "Stripe"],
    status: "Completed",
    duration: "3 months",
    team: "3 members"
  },
  {
    id: "3",
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology for college elections.",
    skills: ["Solidity", "Web3", "JavaScript", "Ethereum"],
    status: "In Progress",
    duration: "2 months",
    team: "5 members"
  }
]

const skills = [
  { name: "React", level: "Advanced" },
  { name: "Node.js", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
  { name: "Machine Learning", level: "Intermediate" },
  { name: "MongoDB", level: "Advanced" },
  { name: "TypeScript", level: "Advanced" },
  { name: "AWS", level: "Beginner" },
  { name: "Docker", level: "Intermediate" },
  { name: "GraphQL", level: "Intermediate" },
  { name: "React Native", level: "Advanced" }
]

export default function ProfilePage() {
  const [isOwnProfile] = useState(true)

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "Advanced": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default: return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col sm:flex-row flex-1 gap-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-lg">
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
                    <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Portfolio</a>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="flex overflow-x-auto no-scrollbar space-x-2 sm:justify-center">
            <TabsTrigger value="about" className="min-w-max">Education</TabsTrigger>
            <TabsTrigger value="experience" className="min-w-max">Experience</TabsTrigger>
            <TabsTrigger value="projects" className="min-w-max">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="min-w-max">Skills</TabsTrigger>
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-primary">Education</CardTitle>
                {isOwnProfile && (
                  <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{edu.institution}</h4>
                        <p className="text-muted-foreground">{edu.degree}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{edu.duration}</p>
                        <p>GPA: {edu.gpa}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {edu.achievements.map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-primary">Work Experience</CardTitle>
                {isOwnProfile && <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
              </CardHeader>
              <CardContent className="space-y-6">
                {workExperience.map((work) => (
                  <div key={work.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{work.position}</h4>
                        <p className="text-primary">{work.company}</p>
                        <p className="text-sm text-muted-foreground">{work.location}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{work.duration}</p>
                    </div>
                    <p className="text-muted-foreground mb-3">{work.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {work.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-primary">Past Projects</CardTitle>
                {isOwnProfile && <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
              </CardHeader>
              <CardContent className="space-y-6">
                {pastProjects.map((proj) => (
                  <div key={proj.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{proj.title}</h4>
                          <Badge variant={proj.status === "Completed" ? "default" : "secondary"} className="text-xs">{proj.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{proj.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <p>{proj.duration}</p>
                        <p>{proj.team}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-primary">Skills & Technologies</CardTitle>
                {isOwnProfile && <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skills.map(skill => (
                    <div key={skill.name} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{skill.name}</span>
                      <Badge className={getSkillColor(skill.level)}>{skill.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

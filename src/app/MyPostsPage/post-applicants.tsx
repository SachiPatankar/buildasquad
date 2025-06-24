"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, MessageCircle, User, Star, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LOAD_APPLICATIONS_BY_POST_ID, LOAD_POST_BY_ID, UPDATE_APPLICATION_STATUS } from "@/graphql"
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

export default function PostApplicantsPage() {
  const { postId } = useParams()
  const { data: postData, loading: postLoading } = useQuery(LOAD_POST_BY_ID, { variables: { postId } });
  const { data: appsData, loading: appsLoading, refetch } = useQuery(LOAD_APPLICATIONS_BY_POST_ID, { variables: { postId } });
  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS);

  const post = postData?.loadPostById;
  const applicants = appsData?.loadApplicationsByPostId || [];

  const handleAcceptApplicant = async (applicationId: string) => {
    try {
      await updateStatus({ variables: { applicationId, status: 'accepted' } });
      toast.success('Applicant accepted');
      refetch();
    } catch {
      toast.error('Failed to accept applicant');
    }
  };

  const handleRejectApplicant = async (applicationId: string) => {
    try {
      await updateStatus({ variables: { applicationId, status: 'rejected' } });
      toast.success('Applicant rejected');
      refetch();
    } catch {
      toast.error('Failed to reject applicant');
    }
  };

  if (postLoading || appsLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!post) return <div className="p-8 text-center text-red-500">Project not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/myposts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground mt-1">{applicants.length} applicants for this position</p>
          </div>
        </div>

        {/* Post Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tech_stack?.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Location: {post.location_id || '-'}</div>
          </CardContent>
        </Card>

        {/* Applicants */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Applicants ({applicants.length})</h2>

          {applicants.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">No applicants yet</h3>
                    <p className="text-muted-foreground">Your post is live and people can start applying</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {applicants.map((applicant: any) => (
                <Card key={applicant._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Applicant Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                              <AvatarImage src={applicant.photo || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg font-semibold">
                                {applicant.first_name?.[0] || ''}{applicant.last_name?.[0] || ''}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{applicant.first_name} {applicant.last_name}</h3>
                              <Badge className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">
                                {applicant.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-primary font-medium mb-2">
                              {applicant.title || ''}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {applicant.location_id || '-'}
                              </div>
                            </div>
                            {/* Skills */}
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {applicant.top_skills?.map((skill: any) => (
                                  <Badge key={skill._id} variant="secondary" className="text-xs">
                                    {skill.skill_name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Application Message */}
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium mb-2">Application Message</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{applicant.message}</p>
                          <div className="text-xs text-muted-foreground mt-2">Applied: {applicant.created_at}</div>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="lg:w-48 flex lg:flex-col gap-2">
                        <Link to={`/profile/${applicant.applicant_id}`} className="flex-1 lg:flex-none">
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <User className="h-4 w-4" />
                            View Profile
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                        <Separator className="lg:my-2" />
                        <Button
                          size="sm"
                          className="flex-1 lg:flex-none"
                          onClick={() => handleAcceptApplicant(applicant._id)}
                          disabled={applicant.status === 'accepted'}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none text-destructive border-destructive hover:bg-destructive hover:text-white"
                          onClick={() => handleRejectApplicant(applicant._id)}
                          disabled={applicant.status === 'rejected'}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

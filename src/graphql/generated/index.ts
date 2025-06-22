import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Achievement = {
  __typename?: 'Achievement';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['String']['output'];
  applicant_id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  message?: Maybe<Scalars['String']['output']>;
  post_id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  last_message_at?: Maybe<Scalars['Date']['output']>;
  last_message_id?: Maybe<Scalars['String']['output']>;
  participant_ids: Array<Scalars['String']['output']>;
  updated_at: Scalars['Date']['output'];
};

export type Connection = {
  __typename?: 'Connection';
  _id: Scalars['String']['output'];
  addressee_user_id: Scalars['String']['output'];
  chat_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Date']['output'];
  message?: Maybe<Scalars['String']['output']>;
  requester_user_id: Scalars['String']['output'];
  responded_at?: Maybe<Scalars['Date']['output']>;
  status: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type CreateAchievementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateEducationInput = {
  degree: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  end_date: Scalars['Date']['input'];
  field_of_study: Scalars['String']['input'];
  grade?: InputMaybe<Scalars['String']['input']>;
  institution_name: Scalars['String']['input'];
  is_current: Scalars['Boolean']['input'];
  location_id?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['Date']['input'];
};

export type CreateExperienceInput = {
  company_name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  employment_type?: InputMaybe<Scalars['String']['input']>;
  end_date: Scalars['Date']['input'];
  is_current: Scalars['Boolean']['input'];
  location_id?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
  start_date: Scalars['Date']['input'];
};

export type CreatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  project_phase?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<RequirementInput>;
  tech_stack?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  work_mode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  github_url?: InputMaybe<Scalars['String']['input']>;
  is_current?: InputMaybe<Scalars['Boolean']['input']>;
  project_url?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  technologies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  githubId?: InputMaybe<Scalars['String']['input']>;
  googleId?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserSkillInput = {
  proficiency_level: Scalars['String']['input'];
  skill_name: Scalars['String']['input'];
  years_experience?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteMessageInput = {
  messageId: Scalars['String']['input'];
};

export type EditMessageInput = {
  content: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};

export type Education = {
  __typename?: 'Education';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  degree: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_date: Scalars['Date']['output'];
  field_of_study: Scalars['String']['output'];
  grade?: Maybe<Scalars['String']['output']>;
  institution_name: Scalars['String']['output'];
  is_current: Scalars['Boolean']['output'];
  location_id?: Maybe<Scalars['String']['output']>;
  start_date: Scalars['Date']['output'];
  updated_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
};

export type Experience = {
  __typename?: 'Experience';
  _id: Scalars['String']['output'];
  company_name: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employment_type?: Maybe<Scalars['String']['output']>;
  end_date: Scalars['Date']['output'];
  is_current: Scalars['Boolean']['output'];
  location_id?: Maybe<Scalars['String']['output']>;
  position: Scalars['String']['output'];
  start_date: Scalars['Date']['output'];
  updated_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
};

export type Link = {
  __typename?: 'Link';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type LinkInput = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String']['output'];
  chat_id: Scalars['String']['output'];
  content: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  deleted_for?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  edited_at?: Maybe<Scalars['Date']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  read_by?: Maybe<Array<Maybe<ReadStatus>>>;
  reply_to_message_id?: Maybe<Scalars['String']['output']>;
  sender_id: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  acceptFriendReq: Connection;
  applyToPost: Application;
  blockUser: Connection;
  cancelApplyToPost: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  closePost: Post;
  createAchievement: Achievement;
  createEducation: Education;
  createExperience: Experience;
  createPost: Post;
  createProject: Project;
  createUser: User;
  createUserSkill: UserSkill;
  declineFriendReq: Scalars['Boolean']['output'];
  deleteAchievement: Scalars['Boolean']['output'];
  deleteEducation: Scalars['Boolean']['output'];
  deleteExperience: Scalars['Boolean']['output'];
  deleteMessage: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteProfilePhoto: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteUserSkill: Scalars['Boolean']['output'];
  editMessage: Message;
  incrementPostView: Post;
  removeConnection: Scalars['Boolean']['output'];
  savePost: SavedPost;
  sendFriendReq: Connection;
  sendMessage: Message;
  unsavePost: Scalars['Boolean']['output'];
  updateAchievement: Achievement;
  updateApplicationStatus: Application;
  updateEducation: Education;
  updateExperience: Experience;
  updatePost: Post;
  updateProject: Project;
  updateUser: User;
  updateUserSkill: UserSkill;
};


export type MutationAcceptFriendReqArgs = {
  connectionId: Scalars['String']['input'];
};


export type MutationApplyToPostArgs = {
  message?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  addresseeUserId: Scalars['String']['input'];
  requesterUserId: Scalars['String']['input'];
};


export type MutationCancelApplyToPostArgs = {
  applicationId: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationClosePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationCreateAchievementArgs = {
  input: CreateAchievementInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateEducationArgs = {
  input: CreateEducationInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserSkillArgs = {
  input: CreateUserSkillInput;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeclineFriendReqArgs = {
  connectionId: Scalars['String']['input'];
};


export type MutationDeleteAchievementArgs = {
  achievementId: Scalars['String']['input'];
};


export type MutationDeleteEducationArgs = {
  educationId: Scalars['String']['input'];
};


export type MutationDeleteExperienceArgs = {
  experienceId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationDeleteProfilePhotoArgs = {
  photoUrl: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDeleteUserSkillArgs = {
  userSkillId: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  content: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationIncrementPostViewArgs = {
  postId: Scalars['String']['input'];
};


export type MutationRemoveConnectionArgs = {
  connectionId: Scalars['String']['input'];
};


export type MutationSavePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationSendFriendReqArgs = {
  addresseeUserId: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  requesterUserId: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type MutationUnsavePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationUpdateAchievementArgs = {
  achievementId: Scalars['String']['input'];
  input: UpdateAchievementInput;
};


export type MutationUpdateApplicationStatusArgs = {
  applicationId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateEducationArgs = {
  educationId: Scalars['String']['input'];
  input: UpdateEducationInput;
};


export type MutationUpdateExperienceArgs = {
  experienceId: Scalars['String']['input'];
  input: UpdateExperienceInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  postId: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
  projectId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserSkillArgs = {
  input: UpdateUserSkillInput;
  userSkillId: Scalars['String']['input'];
};

export type PeopleFilterInput = {
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  top_skills?: Maybe<Array<Maybe<UserSkill>>>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String']['output'];
  applications_count: Scalars['Int']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  experience_level?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  posted_by: Scalars['String']['output'];
  project_phase?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Requirement>;
  status: Scalars['String']['output'];
  tech_stack?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  views_count: Scalars['Int']['output'];
  work_mode?: Maybe<Scalars['String']['output']>;
};

export type PostDetails = {
  __typename?: 'PostDetails';
  _id: Scalars['String']['output'];
  applications_count: Scalars['Int']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  experience_level?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  is_applied?: Maybe<Scalars['String']['output']>;
  is_saved: Scalars['Boolean']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  posted_by: Scalars['String']['output'];
  project_phase?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Requirement>;
  status: Scalars['String']['output'];
  tech_stack?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  views_count: Scalars['Int']['output'];
  work_mode?: Maybe<Scalars['String']['output']>;
};

export type PostFilterInput = {
  project_phase?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tech_stack?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  work_mode?: InputMaybe<Scalars['String']['input']>;
};

export type PostSummary = {
  __typename?: 'PostSummary';
  _id: Scalars['String']['output'];
  applications_count: Scalars['Int']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  experience_level?: Maybe<Scalars['String']['output']>;
  first_name: Scalars['String']['output'];
  is_applied?: Maybe<Scalars['String']['output']>;
  is_saved: Scalars['Boolean']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  posted_by: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tech_stack?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  views_count: Scalars['Int']['output'];
  work_mode?: Maybe<Scalars['String']['output']>;
};

export type PresignedUrlResult = {
  __typename?: 'PresignedUrlResult';
  file_url: Scalars['String']['output'];
  upload_url: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['Date']['output']>;
  github_url?: Maybe<Scalars['String']['output']>;
  is_current?: Maybe<Scalars['Boolean']['output']>;
  project_url?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['Date']['output']>;
  technologies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  checkConnectionStatus: Scalars['String']['output'];
  getAchievementsByUser: Array<Maybe<Achievement>>;
  getApplicationsByUser: Array<Maybe<Application>>;
  getChatListForUser: Array<Maybe<Chat>>;
  getEducationByUser: Array<Maybe<Education>>;
  getExperienceByUser: Array<Maybe<Experience>>;
  getMessagesForChat: Array<Maybe<Message>>;
  getPresignedUrl: PresignedUrlResult;
  getProjectsByUser: Array<Maybe<Project>>;
  getSavedPosts: Array<Maybe<SavedPost>>;
  getSkillsByUser: Array<Maybe<UserSkill>>;
  getUnreadCountForChats: Array<Maybe<UnreadChatCount>>;
  loadApplicationsByPostId: Array<Maybe<Application>>;
  loadConnectionsList: Array<Maybe<Connection>>;
  loadPendingFriendRequests: Array<Maybe<Connection>>;
  loadPeople: Array<Maybe<Person>>;
  loadPeopleByFilter: Array<Maybe<Person>>;
  loadPostByFilter: Array<Maybe<PostSummary>>;
  loadPostById?: Maybe<PostDetails>;
  loadPosts: Array<Maybe<PostSummary>>;
  loadSentFriendRequests: Array<Maybe<Connection>>;
  loadUserById?: Maybe<User>;
};


export type QueryCheckConnectionStatusArgs = {
  addresseeUserId: Scalars['String']['input'];
  requesterUserId: Scalars['String']['input'];
};


export type QueryGetAchievementsByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChatListForUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetEducationByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetExperienceByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMessagesForChatArgs = {
  chatId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetPresignedUrlArgs = {
  fileType: Scalars['String']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProjectsByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSkillsByUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUnreadCountForChatsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoadApplicationsByPostIdArgs = {
  postId: Scalars['String']['input'];
};


export type QueryLoadConnectionsListArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoadPendingFriendRequestsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoadPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoadPeopleByFilterArgs = {
  filter: PeopleFilterInput;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoadPostByFilterArgs = {
  filter: PostFilterInput;
};


export type QueryLoadPostByIdArgs = {
  postId: Scalars['String']['input'];
};


export type QueryLoadPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoadSentFriendRequestsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoadUserByIdArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ReadStatus = {
  __typename?: 'ReadStatus';
  read_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
};

export type Requirement = {
  __typename?: 'Requirement';
  desired_roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  desired_skills?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type RequirementInput = {
  desired_roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  desired_skills?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  preferred_experience?: InputMaybe<Scalars['String']['input']>;
};

export type SavedPost = {
  __typename?: 'SavedPost';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  post_id: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

export type SendMessageInput = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type UnreadChatCount = {
  __typename?: 'UnreadChatCount';
  chat_id: Scalars['String']['output'];
  unread_count: Scalars['Int']['output'];
};

export type UpdateAchievementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEducationInput = {
  degree?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  field_of_study?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  institution_name?: InputMaybe<Scalars['String']['input']>;
  is_current?: InputMaybe<Scalars['Boolean']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateExperienceInput = {
  company_name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  employment_type?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  is_current?: InputMaybe<Scalars['Boolean']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdatePostInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  project_phase?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<RequirementInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  tech_stack?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  work_mode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  github_url?: InputMaybe<Scalars['String']['input']>;
  is_current?: InputMaybe<Scalars['Boolean']['input']>;
  project_url?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  technologies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Array<InputMaybe<LinkInput>>>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserSkillInput = {
  proficiency_level?: InputMaybe<Scalars['String']['input']>;
  skill_name?: InputMaybe<Scalars['String']['input']>;
  years_experience?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  connections_count?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  is_online?: Maybe<Scalars['Boolean']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  last_seen?: Maybe<Scalars['Date']['output']>;
  links?: Maybe<Array<Maybe<Link>>>;
  location_id?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Date']['output'];
};

export type UserSkill = {
  __typename?: 'UserSkill';
  _id: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  proficiency_level: Scalars['String']['output'];
  skill_name: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
  user_id: Scalars['String']['output'];
  years_experience?: Maybe<Scalars['Int']['output']>;
};

export type LoadPostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LoadPostsQuery = { __typename?: 'Query', loadPosts: Array<{ __typename?: 'PostSummary', _id: string, title: string, description?: string | null, posted_by: string, first_name: string, last_name?: string | null, photo?: string | null, tech_stack?: Array<string | null> | null, work_mode?: string | null, experience_level?: string | null, location_id?: string | null, status: string, views_count: number, applications_count: number, is_saved: boolean, is_applied?: string | null, created_at: any, updated_at: any } | null> };

export type LoadPostByIdQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type LoadPostByIdQuery = { __typename?: 'Query', loadPostById?: { __typename?: 'PostDetails', _id: string, title: string, description?: string | null, posted_by: string, first_name: string, last_name?: string | null, photo?: string | null, tech_stack?: Array<string | null> | null, project_phase?: string | null, project_type?: string | null, work_mode?: string | null, experience_level?: string | null, location_id?: string | null, status: string, views_count: number, applications_count: number, is_saved: boolean, is_applied?: string | null, created_at: any, updated_at: any, requirements?: { __typename?: 'Requirement', desired_skills?: Array<string | null> | null, desired_roles?: Array<string | null> | null } | null } | null };

export type LoadPostByFilterQueryVariables = Exact<{
  filter: PostFilterInput;
}>;


export type LoadPostByFilterQuery = { __typename?: 'Query', loadPostByFilter: Array<{ __typename?: 'PostSummary', _id: string, title: string, description?: string | null, posted_by: string, first_name: string, last_name?: string | null, photo?: string | null, tech_stack?: Array<string | null> | null, work_mode?: string | null, experience_level?: string | null, location_id?: string | null, status: string, views_count: number, applications_count: number, is_saved: boolean, is_applied?: string | null, created_at: any, updated_at: any } | null> };

export type GetSavedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSavedPostsQuery = { __typename?: 'Query', getSavedPosts: Array<{ __typename?: 'SavedPost', _id: string, post_id: string, user_id: string, created_at: any } | null> };

export type GetApplicationsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApplicationsByUserQuery = { __typename?: 'Query', getApplicationsByUser: Array<{ __typename?: 'Application', _id: string, post_id: string, applicant_id: string, message?: string | null, status: string, created_at: any } | null> };

export type LoadApplicationsByPostIdQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type LoadApplicationsByPostIdQuery = { __typename?: 'Query', loadApplicationsByPostId: Array<{ __typename?: 'Application', _id: string, message?: string | null, status: string, created_at: any, applicant_id: string } | null> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', _id: string, title: string } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', _id: string, title: string } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type IncrementPostViewMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type IncrementPostViewMutation = { __typename?: 'Mutation', incrementPostView: { __typename?: 'Post', _id: string, views_count: number } };

export type SavePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'SavedPost', _id: string, post_id: string } };

export type UnsavePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type UnsavePostMutation = { __typename?: 'Mutation', unsavePost: boolean };

export type ClosePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type ClosePostMutation = { __typename?: 'Mutation', closePost: { __typename?: 'Post', _id: string, status: string } };

export type ApplyToPostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type ApplyToPostMutation = { __typename?: 'Mutation', applyToPost: { __typename?: 'Application', _id: string, post_id: string, applicant_id: string, message?: string | null, status: string } };

export type CancelApplyToPostMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
}>;


export type CancelApplyToPostMutation = { __typename?: 'Mutation', cancelApplyToPost: boolean };

export type UpdateApplicationStatusMutationVariables = Exact<{
  applicationId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateApplicationStatusMutation = { __typename?: 'Mutation', updateApplicationStatus: { __typename?: 'Application', _id: string, status: string } };

export type GetAchievementsByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAchievementsByUserQuery = { __typename?: 'Query', getAchievementsByUser: Array<{ __typename?: 'Achievement', _id: string, title: string, description?: string | null, user_id: string, created_at: any, updated_at: any } | null> };

export type CreateAchievementMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  input: CreateAchievementInput;
}>;


export type CreateAchievementMutation = { __typename?: 'Mutation', createAchievement: { __typename?: 'Achievement', _id: string, title: string, description?: string | null, user_id: string, created_at: any, updated_at: any } };

export type UpdateAchievementMutationVariables = Exact<{
  achievementId: Scalars['String']['input'];
  input: UpdateAchievementInput;
}>;


export type UpdateAchievementMutation = { __typename?: 'Mutation', updateAchievement: { __typename?: 'Achievement', _id: string, title: string, description?: string | null, updated_at: any } };

export type DeleteAchievementMutationVariables = Exact<{
  achievementId: Scalars['String']['input'];
}>;


export type DeleteAchievementMutation = { __typename?: 'Mutation', deleteAchievement: boolean };

export type GetEducationByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEducationByUserQuery = { __typename?: 'Query', getEducationByUser: Array<{ __typename?: 'Education', _id: string, user_id: string, institution_name: string, location_id?: string | null, degree: string, field_of_study: string, start_date: any, end_date: any, is_current: boolean, grade?: string | null, description?: string | null, created_at: any, updated_at: any } | null> };

export type CreateEducationMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  input: CreateEducationInput;
}>;


export type CreateEducationMutation = { __typename?: 'Mutation', createEducation: { __typename?: 'Education', _id: string, institution_name: string, degree: string, field_of_study: string, start_date: any, end_date: any, is_current: boolean, created_at: any, updated_at: any } };

export type UpdateEducationMutationVariables = Exact<{
  educationId: Scalars['String']['input'];
  input: UpdateEducationInput;
}>;


export type UpdateEducationMutation = { __typename?: 'Mutation', updateEducation: { __typename?: 'Education', _id: string, institution_name: string, updated_at: any } };

export type DeleteEducationMutationVariables = Exact<{
  educationId: Scalars['String']['input'];
}>;


export type DeleteEducationMutation = { __typename?: 'Mutation', deleteEducation: boolean };

export type GetExperienceByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetExperienceByUserQuery = { __typename?: 'Query', getExperienceByUser: Array<{ __typename?: 'Experience', _id: string, user_id: string, company_name: string, position: string, start_date: any, end_date: any, is_current: boolean, description?: string | null, location_id?: string | null, employment_type?: string | null, created_at: any, updated_at: any } | null> };

export type CreateExperienceMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _id: string, company_name: string, position: string, start_date: any, end_date: any, is_current: boolean, created_at: any, updated_at: any } };

export type UpdateExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
  input: UpdateExperienceInput;
}>;


export type UpdateExperienceMutation = { __typename?: 'Mutation', updateExperience: { __typename?: 'Experience', _id: string, position: string, updated_at: any } };

export type DeleteExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type DeleteExperienceMutation = { __typename?: 'Mutation', deleteExperience: boolean };

export type GetProjectsByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProjectsByUserQuery = { __typename?: 'Query', getProjectsByUser: Array<{ __typename?: 'Project', _id: string, user_id: string, title: string, description?: string | null, technologies?: Array<string | null> | null, project_url?: string | null, github_url?: string | null, start_date?: any | null, end_date?: any | null, is_current?: boolean | null, created_at: any, updated_at: any } | null> };

export type CreateProjectMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', _id: string, title: string, technologies?: Array<string | null> | null, created_at: any, updated_at: any } };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', _id: string, title: string, updated_at: any } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type GetSkillsByUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSkillsByUserQuery = { __typename?: 'Query', getSkillsByUser: Array<{ __typename?: 'UserSkill', _id: string, user_id: string, skill_name: string, proficiency_level: string, years_experience?: number | null, created_at: any, updated_at: any } | null> };

export type CreateUserSkillMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  input: CreateUserSkillInput;
}>;


export type CreateUserSkillMutation = { __typename?: 'Mutation', createUserSkill: { __typename?: 'UserSkill', _id: string, skill_name: string, proficiency_level: string, years_experience?: number | null, created_at: any, updated_at: any } };

export type UpdateUserSkillMutationVariables = Exact<{
  userSkillId: Scalars['String']['input'];
  input: UpdateUserSkillInput;
}>;


export type UpdateUserSkillMutation = { __typename?: 'Mutation', updateUserSkill: { __typename?: 'UserSkill', _id: string, skill_name: string, updated_at: any } };

export type DeleteUserSkillMutationVariables = Exact<{
  userSkillId: Scalars['String']['input'];
}>;


export type DeleteUserSkillMutation = { __typename?: 'Mutation', deleteUserSkill: boolean };

export type LoadUserByIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type LoadUserByIdQuery = { __typename?: 'Query', loadUserById?: { __typename?: 'User', _id: string, first_name: string, last_name?: string | null, email: string, photo?: string | null, title?: string | null, bio?: string | null, location_id?: string | null, connections_count?: number | null, is_online?: boolean | null, last_seen?: any | null, created_at: any, updated_at: any, links?: Array<{ __typename?: 'Link', name: string, url: string } | null> | null } | null };


export const LoadPostsDocument = gql`
    query LoadPosts($page: Int, $limit: Int) {
  loadPosts(page: $page, limit: $limit) {
    _id
    title
    description
    posted_by
    first_name
    last_name
    photo
    tech_stack
    work_mode
    experience_level
    location_id
    status
    views_count
    applications_count
    is_saved
    is_applied
    created_at
    updated_at
  }
}
    `;

/**
 * __useLoadPostsQuery__
 *
 * To run a query within a React component, call `useLoadPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadPostsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useLoadPostsQuery(baseOptions?: Apollo.QueryHookOptions<LoadPostsQuery, LoadPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadPostsQuery, LoadPostsQueryVariables>(LoadPostsDocument, options);
      }
export function useLoadPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadPostsQuery, LoadPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadPostsQuery, LoadPostsQueryVariables>(LoadPostsDocument, options);
        }
export function useLoadPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoadPostsQuery, LoadPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadPostsQuery, LoadPostsQueryVariables>(LoadPostsDocument, options);
        }
export type LoadPostsQueryHookResult = ReturnType<typeof useLoadPostsQuery>;
export type LoadPostsLazyQueryHookResult = ReturnType<typeof useLoadPostsLazyQuery>;
export type LoadPostsSuspenseQueryHookResult = ReturnType<typeof useLoadPostsSuspenseQuery>;
export type LoadPostsQueryResult = Apollo.QueryResult<LoadPostsQuery, LoadPostsQueryVariables>;
export const LoadPostByIdDocument = gql`
    query LoadPostById($postId: String!) {
  loadPostById(postId: $postId) {
    _id
    title
    description
    posted_by
    first_name
    last_name
    photo
    requirements {
      desired_skills
      desired_roles
    }
    tech_stack
    project_phase
    project_type
    work_mode
    experience_level
    location_id
    status
    views_count
    applications_count
    is_saved
    is_applied
    created_at
    updated_at
  }
}
    `;

/**
 * __useLoadPostByIdQuery__
 *
 * To run a query within a React component, call `useLoadPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLoadPostByIdQuery(baseOptions: Apollo.QueryHookOptions<LoadPostByIdQuery, LoadPostByIdQueryVariables> & ({ variables: LoadPostByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadPostByIdQuery, LoadPostByIdQueryVariables>(LoadPostByIdDocument, options);
      }
export function useLoadPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadPostByIdQuery, LoadPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadPostByIdQuery, LoadPostByIdQueryVariables>(LoadPostByIdDocument, options);
        }
export function useLoadPostByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoadPostByIdQuery, LoadPostByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadPostByIdQuery, LoadPostByIdQueryVariables>(LoadPostByIdDocument, options);
        }
export type LoadPostByIdQueryHookResult = ReturnType<typeof useLoadPostByIdQuery>;
export type LoadPostByIdLazyQueryHookResult = ReturnType<typeof useLoadPostByIdLazyQuery>;
export type LoadPostByIdSuspenseQueryHookResult = ReturnType<typeof useLoadPostByIdSuspenseQuery>;
export type LoadPostByIdQueryResult = Apollo.QueryResult<LoadPostByIdQuery, LoadPostByIdQueryVariables>;
export const LoadPostByFilterDocument = gql`
    query LoadPostByFilter($filter: PostFilterInput!) {
  loadPostByFilter(filter: $filter) {
    _id
    title
    description
    posted_by
    first_name
    last_name
    photo
    tech_stack
    work_mode
    experience_level
    location_id
    status
    views_count
    applications_count
    is_saved
    is_applied
    created_at
    updated_at
  }
}
    `;

/**
 * __useLoadPostByFilterQuery__
 *
 * To run a query within a React component, call `useLoadPostByFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadPostByFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadPostByFilterQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLoadPostByFilterQuery(baseOptions: Apollo.QueryHookOptions<LoadPostByFilterQuery, LoadPostByFilterQueryVariables> & ({ variables: LoadPostByFilterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>(LoadPostByFilterDocument, options);
      }
export function useLoadPostByFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>(LoadPostByFilterDocument, options);
        }
export function useLoadPostByFilterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>(LoadPostByFilterDocument, options);
        }
export type LoadPostByFilterQueryHookResult = ReturnType<typeof useLoadPostByFilterQuery>;
export type LoadPostByFilterLazyQueryHookResult = ReturnType<typeof useLoadPostByFilterLazyQuery>;
export type LoadPostByFilterSuspenseQueryHookResult = ReturnType<typeof useLoadPostByFilterSuspenseQuery>;
export type LoadPostByFilterQueryResult = Apollo.QueryResult<LoadPostByFilterQuery, LoadPostByFilterQueryVariables>;
export const GetSavedPostsDocument = gql`
    query GetSavedPosts {
  getSavedPosts {
    _id
    post_id
    user_id
    created_at
  }
}
    `;

/**
 * __useGetSavedPostsQuery__
 *
 * To run a query within a React component, call `useGetSavedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSavedPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
      }
export function useGetSavedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
        }
export function useGetSavedPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSavedPostsQuery, GetSavedPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSavedPostsQuery, GetSavedPostsQueryVariables>(GetSavedPostsDocument, options);
        }
export type GetSavedPostsQueryHookResult = ReturnType<typeof useGetSavedPostsQuery>;
export type GetSavedPostsLazyQueryHookResult = ReturnType<typeof useGetSavedPostsLazyQuery>;
export type GetSavedPostsSuspenseQueryHookResult = ReturnType<typeof useGetSavedPostsSuspenseQuery>;
export type GetSavedPostsQueryResult = Apollo.QueryResult<GetSavedPostsQuery, GetSavedPostsQueryVariables>;
export const GetApplicationsByUserDocument = gql`
    query GetApplicationsByUser {
  getApplicationsByUser {
    _id
    post_id
    applicant_id
    message
    status
    created_at
  }
}
    `;

/**
 * __useGetApplicationsByUserQuery__
 *
 * To run a query within a React component, call `useGetApplicationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApplicationsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>(GetApplicationsByUserDocument, options);
      }
export function useGetApplicationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>(GetApplicationsByUserDocument, options);
        }
export function useGetApplicationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>(GetApplicationsByUserDocument, options);
        }
export type GetApplicationsByUserQueryHookResult = ReturnType<typeof useGetApplicationsByUserQuery>;
export type GetApplicationsByUserLazyQueryHookResult = ReturnType<typeof useGetApplicationsByUserLazyQuery>;
export type GetApplicationsByUserSuspenseQueryHookResult = ReturnType<typeof useGetApplicationsByUserSuspenseQuery>;
export type GetApplicationsByUserQueryResult = Apollo.QueryResult<GetApplicationsByUserQuery, GetApplicationsByUserQueryVariables>;
export const LoadApplicationsByPostIdDocument = gql`
    query LoadApplicationsByPostId($postId: String!) {
  loadApplicationsByPostId(postId: $postId) {
    _id
    message
    status
    created_at
    applicant_id
  }
}
    `;

/**
 * __useLoadApplicationsByPostIdQuery__
 *
 * To run a query within a React component, call `useLoadApplicationsByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadApplicationsByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadApplicationsByPostIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLoadApplicationsByPostIdQuery(baseOptions: Apollo.QueryHookOptions<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables> & ({ variables: LoadApplicationsByPostIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>(LoadApplicationsByPostIdDocument, options);
      }
export function useLoadApplicationsByPostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>(LoadApplicationsByPostIdDocument, options);
        }
export function useLoadApplicationsByPostIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>(LoadApplicationsByPostIdDocument, options);
        }
export type LoadApplicationsByPostIdQueryHookResult = ReturnType<typeof useLoadApplicationsByPostIdQuery>;
export type LoadApplicationsByPostIdLazyQueryHookResult = ReturnType<typeof useLoadApplicationsByPostIdLazyQuery>;
export type LoadApplicationsByPostIdSuspenseQueryHookResult = ReturnType<typeof useLoadApplicationsByPostIdSuspenseQuery>;
export type LoadApplicationsByPostIdQueryResult = Apollo.QueryResult<LoadApplicationsByPostIdQuery, LoadApplicationsByPostIdQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    _id
    title
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $input: UpdatePostInput!) {
  updatePost(postId: $postId, input: $input) {
    _id
    title
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const IncrementPostViewDocument = gql`
    mutation IncrementPostView($postId: String!) {
  incrementPostView(postId: $postId) {
    _id
    views_count
  }
}
    `;
export type IncrementPostViewMutationFn = Apollo.MutationFunction<IncrementPostViewMutation, IncrementPostViewMutationVariables>;

/**
 * __useIncrementPostViewMutation__
 *
 * To run a mutation, you first call `useIncrementPostViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementPostViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementPostViewMutation, { data, loading, error }] = useIncrementPostViewMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useIncrementPostViewMutation(baseOptions?: Apollo.MutationHookOptions<IncrementPostViewMutation, IncrementPostViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementPostViewMutation, IncrementPostViewMutationVariables>(IncrementPostViewDocument, options);
      }
export type IncrementPostViewMutationHookResult = ReturnType<typeof useIncrementPostViewMutation>;
export type IncrementPostViewMutationResult = Apollo.MutationResult<IncrementPostViewMutation>;
export type IncrementPostViewMutationOptions = Apollo.BaseMutationOptions<IncrementPostViewMutation, IncrementPostViewMutationVariables>;
export const SavePostDocument = gql`
    mutation SavePost($postId: String!) {
  savePost(postId: $postId) {
    _id
    post_id
  }
}
    `;
export type SavePostMutationFn = Apollo.MutationFunction<SavePostMutation, SavePostMutationVariables>;

/**
 * __useSavePostMutation__
 *
 * To run a mutation, you first call `useSavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePostMutation, { data, loading, error }] = useSavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSavePostMutation(baseOptions?: Apollo.MutationHookOptions<SavePostMutation, SavePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument, options);
      }
export type SavePostMutationHookResult = ReturnType<typeof useSavePostMutation>;
export type SavePostMutationResult = Apollo.MutationResult<SavePostMutation>;
export type SavePostMutationOptions = Apollo.BaseMutationOptions<SavePostMutation, SavePostMutationVariables>;
export const UnsavePostDocument = gql`
    mutation UnsavePost($postId: String!) {
  unsavePost(postId: $postId)
}
    `;
export type UnsavePostMutationFn = Apollo.MutationFunction<UnsavePostMutation, UnsavePostMutationVariables>;

/**
 * __useUnsavePostMutation__
 *
 * To run a mutation, you first call `useUnsavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsavePostMutation, { data, loading, error }] = useUnsavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnsavePostMutation(baseOptions?: Apollo.MutationHookOptions<UnsavePostMutation, UnsavePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsavePostMutation, UnsavePostMutationVariables>(UnsavePostDocument, options);
      }
export type UnsavePostMutationHookResult = ReturnType<typeof useUnsavePostMutation>;
export type UnsavePostMutationResult = Apollo.MutationResult<UnsavePostMutation>;
export type UnsavePostMutationOptions = Apollo.BaseMutationOptions<UnsavePostMutation, UnsavePostMutationVariables>;
export const ClosePostDocument = gql`
    mutation ClosePost($postId: String!) {
  closePost(postId: $postId) {
    _id
    status
  }
}
    `;
export type ClosePostMutationFn = Apollo.MutationFunction<ClosePostMutation, ClosePostMutationVariables>;

/**
 * __useClosePostMutation__
 *
 * To run a mutation, you first call `useClosePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closePostMutation, { data, loading, error }] = useClosePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useClosePostMutation(baseOptions?: Apollo.MutationHookOptions<ClosePostMutation, ClosePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClosePostMutation, ClosePostMutationVariables>(ClosePostDocument, options);
      }
export type ClosePostMutationHookResult = ReturnType<typeof useClosePostMutation>;
export type ClosePostMutationResult = Apollo.MutationResult<ClosePostMutation>;
export type ClosePostMutationOptions = Apollo.BaseMutationOptions<ClosePostMutation, ClosePostMutationVariables>;
export const ApplyToPostDocument = gql`
    mutation ApplyToPost($postId: String!, $message: String!) {
  applyToPost(postId: $postId, message: $message) {
    _id
    post_id
    applicant_id
    message
    status
  }
}
    `;
export type ApplyToPostMutationFn = Apollo.MutationFunction<ApplyToPostMutation, ApplyToPostMutationVariables>;

/**
 * __useApplyToPostMutation__
 *
 * To run a mutation, you first call `useApplyToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyToPostMutation, { data, loading, error }] = useApplyToPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useApplyToPostMutation(baseOptions?: Apollo.MutationHookOptions<ApplyToPostMutation, ApplyToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyToPostMutation, ApplyToPostMutationVariables>(ApplyToPostDocument, options);
      }
export type ApplyToPostMutationHookResult = ReturnType<typeof useApplyToPostMutation>;
export type ApplyToPostMutationResult = Apollo.MutationResult<ApplyToPostMutation>;
export type ApplyToPostMutationOptions = Apollo.BaseMutationOptions<ApplyToPostMutation, ApplyToPostMutationVariables>;
export const CancelApplyToPostDocument = gql`
    mutation CancelApplyToPost($applicationId: String!) {
  cancelApplyToPost(applicationId: $applicationId)
}
    `;
export type CancelApplyToPostMutationFn = Apollo.MutationFunction<CancelApplyToPostMutation, CancelApplyToPostMutationVariables>;

/**
 * __useCancelApplyToPostMutation__
 *
 * To run a mutation, you first call `useCancelApplyToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelApplyToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelApplyToPostMutation, { data, loading, error }] = useCancelApplyToPostMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useCancelApplyToPostMutation(baseOptions?: Apollo.MutationHookOptions<CancelApplyToPostMutation, CancelApplyToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelApplyToPostMutation, CancelApplyToPostMutationVariables>(CancelApplyToPostDocument, options);
      }
export type CancelApplyToPostMutationHookResult = ReturnType<typeof useCancelApplyToPostMutation>;
export type CancelApplyToPostMutationResult = Apollo.MutationResult<CancelApplyToPostMutation>;
export type CancelApplyToPostMutationOptions = Apollo.BaseMutationOptions<CancelApplyToPostMutation, CancelApplyToPostMutationVariables>;
export const UpdateApplicationStatusDocument = gql`
    mutation UpdateApplicationStatus($applicationId: String!, $status: String!) {
  updateApplicationStatus(applicationId: $applicationId, status: $status) {
    _id
    status
  }
}
    `;
export type UpdateApplicationStatusMutationFn = Apollo.MutationFunction<UpdateApplicationStatusMutation, UpdateApplicationStatusMutationVariables>;

/**
 * __useUpdateApplicationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationStatusMutation, { data, loading, error }] = useUpdateApplicationStatusMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateApplicationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApplicationStatusMutation, UpdateApplicationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApplicationStatusMutation, UpdateApplicationStatusMutationVariables>(UpdateApplicationStatusDocument, options);
      }
export type UpdateApplicationStatusMutationHookResult = ReturnType<typeof useUpdateApplicationStatusMutation>;
export type UpdateApplicationStatusMutationResult = Apollo.MutationResult<UpdateApplicationStatusMutation>;
export type UpdateApplicationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateApplicationStatusMutation, UpdateApplicationStatusMutationVariables>;
export const GetAchievementsByUserDocument = gql`
    query GetAchievementsByUser($userId: String) {
  getAchievementsByUser(userId: $userId) {
    _id
    title
    description
    user_id
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetAchievementsByUserQuery__
 *
 * To run a query within a React component, call `useGetAchievementsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchievementsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchievementsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAchievementsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>(GetAchievementsByUserDocument, options);
      }
export function useGetAchievementsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>(GetAchievementsByUserDocument, options);
        }
export function useGetAchievementsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>(GetAchievementsByUserDocument, options);
        }
export type GetAchievementsByUserQueryHookResult = ReturnType<typeof useGetAchievementsByUserQuery>;
export type GetAchievementsByUserLazyQueryHookResult = ReturnType<typeof useGetAchievementsByUserLazyQuery>;
export type GetAchievementsByUserSuspenseQueryHookResult = ReturnType<typeof useGetAchievementsByUserSuspenseQuery>;
export type GetAchievementsByUserQueryResult = Apollo.QueryResult<GetAchievementsByUserQuery, GetAchievementsByUserQueryVariables>;
export const CreateAchievementDocument = gql`
    mutation CreateAchievement($userId: String, $input: CreateAchievementInput!) {
  createAchievement(userId: $userId, input: $input) {
    _id
    title
    description
    user_id
    created_at
    updated_at
  }
}
    `;
export type CreateAchievementMutationFn = Apollo.MutationFunction<CreateAchievementMutation, CreateAchievementMutationVariables>;

/**
 * __useCreateAchievementMutation__
 *
 * To run a mutation, you first call `useCreateAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAchievementMutation, { data, loading, error }] = useCreateAchievementMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAchievementMutation(baseOptions?: Apollo.MutationHookOptions<CreateAchievementMutation, CreateAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAchievementMutation, CreateAchievementMutationVariables>(CreateAchievementDocument, options);
      }
export type CreateAchievementMutationHookResult = ReturnType<typeof useCreateAchievementMutation>;
export type CreateAchievementMutationResult = Apollo.MutationResult<CreateAchievementMutation>;
export type CreateAchievementMutationOptions = Apollo.BaseMutationOptions<CreateAchievementMutation, CreateAchievementMutationVariables>;
export const UpdateAchievementDocument = gql`
    mutation UpdateAchievement($achievementId: String!, $input: UpdateAchievementInput!) {
  updateAchievement(achievementId: $achievementId, input: $input) {
    _id
    title
    description
    updated_at
  }
}
    `;
export type UpdateAchievementMutationFn = Apollo.MutationFunction<UpdateAchievementMutation, UpdateAchievementMutationVariables>;

/**
 * __useUpdateAchievementMutation__
 *
 * To run a mutation, you first call `useUpdateAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAchievementMutation, { data, loading, error }] = useUpdateAchievementMutation({
 *   variables: {
 *      achievementId: // value for 'achievementId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAchievementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAchievementMutation, UpdateAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAchievementMutation, UpdateAchievementMutationVariables>(UpdateAchievementDocument, options);
      }
export type UpdateAchievementMutationHookResult = ReturnType<typeof useUpdateAchievementMutation>;
export type UpdateAchievementMutationResult = Apollo.MutationResult<UpdateAchievementMutation>;
export type UpdateAchievementMutationOptions = Apollo.BaseMutationOptions<UpdateAchievementMutation, UpdateAchievementMutationVariables>;
export const DeleteAchievementDocument = gql`
    mutation DeleteAchievement($achievementId: String!) {
  deleteAchievement(achievementId: $achievementId)
}
    `;
export type DeleteAchievementMutationFn = Apollo.MutationFunction<DeleteAchievementMutation, DeleteAchievementMutationVariables>;

/**
 * __useDeleteAchievementMutation__
 *
 * To run a mutation, you first call `useDeleteAchievementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAchievementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAchievementMutation, { data, loading, error }] = useDeleteAchievementMutation({
 *   variables: {
 *      achievementId: // value for 'achievementId'
 *   },
 * });
 */
export function useDeleteAchievementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAchievementMutation, DeleteAchievementMutationVariables>(DeleteAchievementDocument, options);
      }
export type DeleteAchievementMutationHookResult = ReturnType<typeof useDeleteAchievementMutation>;
export type DeleteAchievementMutationResult = Apollo.MutationResult<DeleteAchievementMutation>;
export type DeleteAchievementMutationOptions = Apollo.BaseMutationOptions<DeleteAchievementMutation, DeleteAchievementMutationVariables>;
export const GetEducationByUserDocument = gql`
    query GetEducationByUser($userId: String) {
  getEducationByUser(userId: $userId) {
    _id
    user_id
    institution_name
    location_id
    degree
    field_of_study
    start_date
    end_date
    is_current
    grade
    description
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetEducationByUserQuery__
 *
 * To run a query within a React component, call `useGetEducationByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEducationByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEducationByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetEducationByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetEducationByUserQuery, GetEducationByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEducationByUserQuery, GetEducationByUserQueryVariables>(GetEducationByUserDocument, options);
      }
export function useGetEducationByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEducationByUserQuery, GetEducationByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEducationByUserQuery, GetEducationByUserQueryVariables>(GetEducationByUserDocument, options);
        }
export function useGetEducationByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEducationByUserQuery, GetEducationByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEducationByUserQuery, GetEducationByUserQueryVariables>(GetEducationByUserDocument, options);
        }
export type GetEducationByUserQueryHookResult = ReturnType<typeof useGetEducationByUserQuery>;
export type GetEducationByUserLazyQueryHookResult = ReturnType<typeof useGetEducationByUserLazyQuery>;
export type GetEducationByUserSuspenseQueryHookResult = ReturnType<typeof useGetEducationByUserSuspenseQuery>;
export type GetEducationByUserQueryResult = Apollo.QueryResult<GetEducationByUserQuery, GetEducationByUserQueryVariables>;
export const CreateEducationDocument = gql`
    mutation CreateEducation($userId: String, $input: CreateEducationInput!) {
  createEducation(userId: $userId, input: $input) {
    _id
    institution_name
    degree
    field_of_study
    start_date
    end_date
    is_current
    created_at
    updated_at
  }
}
    `;
export type CreateEducationMutationFn = Apollo.MutationFunction<CreateEducationMutation, CreateEducationMutationVariables>;

/**
 * __useCreateEducationMutation__
 *
 * To run a mutation, you first call `useCreateEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationMutation, { data, loading, error }] = useCreateEducationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEducationMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationMutation, CreateEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEducationMutation, CreateEducationMutationVariables>(CreateEducationDocument, options);
      }
export type CreateEducationMutationHookResult = ReturnType<typeof useCreateEducationMutation>;
export type CreateEducationMutationResult = Apollo.MutationResult<CreateEducationMutation>;
export type CreateEducationMutationOptions = Apollo.BaseMutationOptions<CreateEducationMutation, CreateEducationMutationVariables>;
export const UpdateEducationDocument = gql`
    mutation UpdateEducation($educationId: String!, $input: UpdateEducationInput!) {
  updateEducation(educationId: $educationId, input: $input) {
    _id
    institution_name
    updated_at
  }
}
    `;
export type UpdateEducationMutationFn = Apollo.MutationFunction<UpdateEducationMutation, UpdateEducationMutationVariables>;

/**
 * __useUpdateEducationMutation__
 *
 * To run a mutation, you first call `useUpdateEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationMutation, { data, loading, error }] = useUpdateEducationMutation({
 *   variables: {
 *      educationId: // value for 'educationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEducationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationMutation, UpdateEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEducationMutation, UpdateEducationMutationVariables>(UpdateEducationDocument, options);
      }
export type UpdateEducationMutationHookResult = ReturnType<typeof useUpdateEducationMutation>;
export type UpdateEducationMutationResult = Apollo.MutationResult<UpdateEducationMutation>;
export type UpdateEducationMutationOptions = Apollo.BaseMutationOptions<UpdateEducationMutation, UpdateEducationMutationVariables>;
export const DeleteEducationDocument = gql`
    mutation DeleteEducation($educationId: String!) {
  deleteEducation(educationId: $educationId)
}
    `;
export type DeleteEducationMutationFn = Apollo.MutationFunction<DeleteEducationMutation, DeleteEducationMutationVariables>;

/**
 * __useDeleteEducationMutation__
 *
 * To run a mutation, you first call `useDeleteEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEducationMutation, { data, loading, error }] = useDeleteEducationMutation({
 *   variables: {
 *      educationId: // value for 'educationId'
 *   },
 * });
 */
export function useDeleteEducationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEducationMutation, DeleteEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEducationMutation, DeleteEducationMutationVariables>(DeleteEducationDocument, options);
      }
export type DeleteEducationMutationHookResult = ReturnType<typeof useDeleteEducationMutation>;
export type DeleteEducationMutationResult = Apollo.MutationResult<DeleteEducationMutation>;
export type DeleteEducationMutationOptions = Apollo.BaseMutationOptions<DeleteEducationMutation, DeleteEducationMutationVariables>;
export const GetExperienceByUserDocument = gql`
    query GetExperienceByUser($userId: String) {
  getExperienceByUser(userId: $userId) {
    _id
    user_id
    company_name
    position
    start_date
    end_date
    is_current
    description
    location_id
    employment_type
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetExperienceByUserQuery__
 *
 * To run a query within a React component, call `useGetExperienceByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExperienceByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExperienceByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetExperienceByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>(GetExperienceByUserDocument, options);
      }
export function useGetExperienceByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>(GetExperienceByUserDocument, options);
        }
export function useGetExperienceByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>(GetExperienceByUserDocument, options);
        }
export type GetExperienceByUserQueryHookResult = ReturnType<typeof useGetExperienceByUserQuery>;
export type GetExperienceByUserLazyQueryHookResult = ReturnType<typeof useGetExperienceByUserLazyQuery>;
export type GetExperienceByUserSuspenseQueryHookResult = ReturnType<typeof useGetExperienceByUserSuspenseQuery>;
export type GetExperienceByUserQueryResult = Apollo.QueryResult<GetExperienceByUserQuery, GetExperienceByUserQueryVariables>;
export const CreateExperienceDocument = gql`
    mutation CreateExperience($userId: String, $input: CreateExperienceInput!) {
  createExperience(userId: $userId, input: $input) {
    _id
    company_name
    position
    start_date
    end_date
    is_current
    created_at
    updated_at
  }
}
    `;
export type CreateExperienceMutationFn = Apollo.MutationFunction<CreateExperienceMutation, CreateExperienceMutationVariables>;

/**
 * __useCreateExperienceMutation__
 *
 * To run a mutation, you first call `useCreateExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExperienceMutation, { data, loading, error }] = useCreateExperienceMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExperienceMutation(baseOptions?: Apollo.MutationHookOptions<CreateExperienceMutation, CreateExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExperienceMutation, CreateExperienceMutationVariables>(CreateExperienceDocument, options);
      }
export type CreateExperienceMutationHookResult = ReturnType<typeof useCreateExperienceMutation>;
export type CreateExperienceMutationResult = Apollo.MutationResult<CreateExperienceMutation>;
export type CreateExperienceMutationOptions = Apollo.BaseMutationOptions<CreateExperienceMutation, CreateExperienceMutationVariables>;
export const UpdateExperienceDocument = gql`
    mutation UpdateExperience($experienceId: String!, $input: UpdateExperienceInput!) {
  updateExperience(experienceId: $experienceId, input: $input) {
    _id
    position
    updated_at
  }
}
    `;
export type UpdateExperienceMutationFn = Apollo.MutationFunction<UpdateExperienceMutation, UpdateExperienceMutationVariables>;

/**
 * __useUpdateExperienceMutation__
 *
 * To run a mutation, you first call `useUpdateExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExperienceMutation, { data, loading, error }] = useUpdateExperienceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExperienceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExperienceMutation, UpdateExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExperienceMutation, UpdateExperienceMutationVariables>(UpdateExperienceDocument, options);
      }
export type UpdateExperienceMutationHookResult = ReturnType<typeof useUpdateExperienceMutation>;
export type UpdateExperienceMutationResult = Apollo.MutationResult<UpdateExperienceMutation>;
export type UpdateExperienceMutationOptions = Apollo.BaseMutationOptions<UpdateExperienceMutation, UpdateExperienceMutationVariables>;
export const DeleteExperienceDocument = gql`
    mutation DeleteExperience($experienceId: String!) {
  deleteExperience(experienceId: $experienceId)
}
    `;
export type DeleteExperienceMutationFn = Apollo.MutationFunction<DeleteExperienceMutation, DeleteExperienceMutationVariables>;

/**
 * __useDeleteExperienceMutation__
 *
 * To run a mutation, you first call `useDeleteExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExperienceMutation, { data, loading, error }] = useDeleteExperienceMutation({
 *   variables: {
 *      experienceId: // value for 'experienceId'
 *   },
 * });
 */
export function useDeleteExperienceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExperienceMutation, DeleteExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExperienceMutation, DeleteExperienceMutationVariables>(DeleteExperienceDocument, options);
      }
export type DeleteExperienceMutationHookResult = ReturnType<typeof useDeleteExperienceMutation>;
export type DeleteExperienceMutationResult = Apollo.MutationResult<DeleteExperienceMutation>;
export type DeleteExperienceMutationOptions = Apollo.BaseMutationOptions<DeleteExperienceMutation, DeleteExperienceMutationVariables>;
export const GetProjectsByUserDocument = gql`
    query GetProjectsByUser($userId: String) {
  getProjectsByUser(userId: $userId) {
    _id
    user_id
    title
    description
    technologies
    project_url
    github_url
    start_date
    end_date
    is_current
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetProjectsByUserQuery__
 *
 * To run a query within a React component, call `useGetProjectsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProjectsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
      }
export function useGetProjectsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
        }
export function useGetProjectsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
        }
export type GetProjectsByUserQueryHookResult = ReturnType<typeof useGetProjectsByUserQuery>;
export type GetProjectsByUserLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserLazyQuery>;
export type GetProjectsByUserSuspenseQueryHookResult = ReturnType<typeof useGetProjectsByUserSuspenseQuery>;
export type GetProjectsByUserQueryResult = Apollo.QueryResult<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($userId: String, $input: CreateProjectInput!) {
  createProject(userId: $userId, input: $input) {
    _id
    title
    technologies
    created_at
    updated_at
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($projectId: String!, $input: UpdateProjectInput!) {
  updateProject(projectId: $projectId, input: $input) {
    _id
    title
    updated_at
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: String!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetSkillsByUserDocument = gql`
    query GetSkillsByUser($userId: String) {
  getSkillsByUser(userId: $userId) {
    _id
    user_id
    skill_name
    proficiency_level
    years_experience
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetSkillsByUserQuery__
 *
 * To run a query within a React component, call `useGetSkillsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSkillsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>(GetSkillsByUserDocument, options);
      }
export function useGetSkillsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>(GetSkillsByUserDocument, options);
        }
export function useGetSkillsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>(GetSkillsByUserDocument, options);
        }
export type GetSkillsByUserQueryHookResult = ReturnType<typeof useGetSkillsByUserQuery>;
export type GetSkillsByUserLazyQueryHookResult = ReturnType<typeof useGetSkillsByUserLazyQuery>;
export type GetSkillsByUserSuspenseQueryHookResult = ReturnType<typeof useGetSkillsByUserSuspenseQuery>;
export type GetSkillsByUserQueryResult = Apollo.QueryResult<GetSkillsByUserQuery, GetSkillsByUserQueryVariables>;
export const CreateUserSkillDocument = gql`
    mutation CreateUserSkill($userId: String, $input: CreateUserSkillInput!) {
  createUserSkill(userId: $userId, input: $input) {
    _id
    skill_name
    proficiency_level
    years_experience
    created_at
    updated_at
  }
}
    `;
export type CreateUserSkillMutationFn = Apollo.MutationFunction<CreateUserSkillMutation, CreateUserSkillMutationVariables>;

/**
 * __useCreateUserSkillMutation__
 *
 * To run a mutation, you first call `useCreateUserSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserSkillMutation, { data, loading, error }] = useCreateUserSkillMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserSkillMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserSkillMutation, CreateUserSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserSkillMutation, CreateUserSkillMutationVariables>(CreateUserSkillDocument, options);
      }
export type CreateUserSkillMutationHookResult = ReturnType<typeof useCreateUserSkillMutation>;
export type CreateUserSkillMutationResult = Apollo.MutationResult<CreateUserSkillMutation>;
export type CreateUserSkillMutationOptions = Apollo.BaseMutationOptions<CreateUserSkillMutation, CreateUserSkillMutationVariables>;
export const UpdateUserSkillDocument = gql`
    mutation UpdateUserSkill($userSkillId: String!, $input: UpdateUserSkillInput!) {
  updateUserSkill(userSkillId: $userSkillId, input: $input) {
    _id
    skill_name
    updated_at
  }
}
    `;
export type UpdateUserSkillMutationFn = Apollo.MutationFunction<UpdateUserSkillMutation, UpdateUserSkillMutationVariables>;

/**
 * __useUpdateUserSkillMutation__
 *
 * To run a mutation, you first call `useUpdateUserSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSkillMutation, { data, loading, error }] = useUpdateUserSkillMutation({
 *   variables: {
 *      userSkillId: // value for 'userSkillId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserSkillMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSkillMutation, UpdateUserSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserSkillMutation, UpdateUserSkillMutationVariables>(UpdateUserSkillDocument, options);
      }
export type UpdateUserSkillMutationHookResult = ReturnType<typeof useUpdateUserSkillMutation>;
export type UpdateUserSkillMutationResult = Apollo.MutationResult<UpdateUserSkillMutation>;
export type UpdateUserSkillMutationOptions = Apollo.BaseMutationOptions<UpdateUserSkillMutation, UpdateUserSkillMutationVariables>;
export const DeleteUserSkillDocument = gql`
    mutation DeleteUserSkill($userSkillId: String!) {
  deleteUserSkill(userSkillId: $userSkillId)
}
    `;
export type DeleteUserSkillMutationFn = Apollo.MutationFunction<DeleteUserSkillMutation, DeleteUserSkillMutationVariables>;

/**
 * __useDeleteUserSkillMutation__
 *
 * To run a mutation, you first call `useDeleteUserSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserSkillMutation, { data, loading, error }] = useDeleteUserSkillMutation({
 *   variables: {
 *      userSkillId: // value for 'userSkillId'
 *   },
 * });
 */
export function useDeleteUserSkillMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserSkillMutation, DeleteUserSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserSkillMutation, DeleteUserSkillMutationVariables>(DeleteUserSkillDocument, options);
      }
export type DeleteUserSkillMutationHookResult = ReturnType<typeof useDeleteUserSkillMutation>;
export type DeleteUserSkillMutationResult = Apollo.MutationResult<DeleteUserSkillMutation>;
export type DeleteUserSkillMutationOptions = Apollo.BaseMutationOptions<DeleteUserSkillMutation, DeleteUserSkillMutationVariables>;
export const LoadUserByIdDocument = gql`
    query LoadUserById($userId: String!) {
  loadUserById(userId: $userId) {
    _id
    first_name
    last_name
    email
    photo
    title
    bio
    location_id
    connections_count
    links {
      name
      url
    }
    is_online
    last_seen
    created_at
    updated_at
  }
}
    `;

/**
 * __useLoadUserByIdQuery__
 *
 * To run a query within a React component, call `useLoadUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLoadUserByIdQuery(baseOptions: Apollo.QueryHookOptions<LoadUserByIdQuery, LoadUserByIdQueryVariables> & ({ variables: LoadUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadUserByIdQuery, LoadUserByIdQueryVariables>(LoadUserByIdDocument, options);
      }
export function useLoadUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadUserByIdQuery, LoadUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadUserByIdQuery, LoadUserByIdQueryVariables>(LoadUserByIdDocument, options);
        }
export function useLoadUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoadUserByIdQuery, LoadUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadUserByIdQuery, LoadUserByIdQueryVariables>(LoadUserByIdDocument, options);
        }
export type LoadUserByIdQueryHookResult = ReturnType<typeof useLoadUserByIdQuery>;
export type LoadUserByIdLazyQueryHookResult = ReturnType<typeof useLoadUserByIdLazyQuery>;
export type LoadUserByIdSuspenseQueryHookResult = ReturnType<typeof useLoadUserByIdSuspenseQuery>;
export type LoadUserByIdQueryResult = Apollo.QueryResult<LoadUserByIdQuery, LoadUserByIdQueryVariables>;
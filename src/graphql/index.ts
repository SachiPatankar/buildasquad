import { gql } from '@apollo/client'

// -------------------- QUERIES --------------------

// Load all posts with pagination
export const LOAD_POSTS = gql`
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
`

// Load post by ID
export const LOAD_POST_BY_ID = gql`
  query LoadPostById($postId: String!) {
    loadPostById(postId: $postId) {
      _id
      title
      description
      posted_by
      first_name
      last_name
      photo
      is_connection
      chat_id
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
`

// Load posts by filter
export const LOAD_POST_BY_FILTER = gql`
  query LoadPostByFilter($filter: PostFilterInput!, $page: Int, $limit: Int) {
    loadPostByFilter(filter: $filter, page: $page, limit: $limit) {
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
      requirements {
        desired_roles
      }
    }
  }
`

// Load recommended posts for current user
export const LOAD_POST_BY_RECOMMENDATION = gql`
  query LoadPostByRecommendation($page: Int, $limit: Int) {
    loadByRecommendation(page: $page, limit: $limit) {
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
      requirements {
        desired_roles
      }
    }
  }
`

// Get saved posts for current user
export const GET_SAVED_POSTS = gql`
  query GetSavedPosts {
    getSavedPosts {
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
`

// Get applications for current user
export const GET_APPLICATIONS_BY_USER = gql`
  query GetApplicationsByUser {
    getApplicationsByUser {
      post {
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
      application {
        _id
        post_id
        applicant_id
        message
        status
        created_at
        updated_at
      }
    }
  }
`

// Load applications by post ID
export const LOAD_APPLICATIONS_BY_POST_ID = gql`
  query LoadApplicationsByPostId($postId: String!) {
    loadApplicationsByPostId(postId: $postId) {
      _id
      post_id
      applicant_id
      first_name
      last_name
      photo
      location_id
      title
      bio
      is_connection
      top_skills {
        _id
        skill_name
        proficiency_level
      }
      message
      status
      created_at
      updated_at
    }
  }
`

// Load posts by user ID
export const LOAD_POSTS_BY_USER_ID = gql`
  query LoadPostsByUserId($userId: String) {
    loadPostsByUserId(userId: $userId) {
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
`

// -------------------- MUTATIONS --------------------

// Create a new post
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      _id
      title
    }
  }
`

// Update a post
export const UPDATE_POST = gql`
  mutation UpdatePost($postId: String!, $input: UpdatePostInput!) {
    updatePost(postId: $postId, input: $input) {
      _id
      title
    }
  }
`

// Delete a post
export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`

// Increment post view count
export const INCREMENT_POST_VIEW = gql`
  mutation IncrementPostView($postId: String!) {
    incrementPostView(postId: $postId) {
      _id
      views_count
    }
  }
`

// Save a post
export const SAVE_POST = gql`
  mutation SavePost($postId: String!) {
    savePost(postId: $postId) {
      _id
      post_id
    }
  }
`

// Unsave a post
export const UNSAVE_POST = gql`
  mutation UnsavePost($postId: String!) {
    unsavePost(postId: $postId)
  }
`

// Close a post
export const CLOSE_POST = gql`
  mutation ClosePost($postId: String!) {
    closePost(postId: $postId) {
      _id
      status
    }
  }
`

export const OPEN_POST = gql`
  mutation OpenPost($postId: String!) {
    openPost(postId: $postId) {
      _id
      status
    }
  }
`

// Apply to a post
export const APPLY_TO_POST = gql`
  mutation ApplyToPost($postId: String!, $message: String!) {
    applyToPost(postId: $postId, message: $message) {
      _id
      post_id
      applicant_id
      message
      status
    }
  }
`

// Cancel an application
export const CANCEL_APPLY_TO_POST = gql`
  mutation CancelApplyToPost($applicationId: String!) {
    cancelApplyToPost(applicationId: $applicationId)
  }
`

// Update application status
export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($applicationId: String!, $status: String!) {
    updateApplicationStatus(applicationId: $applicationId, status: $status) {
      _id
      status
    }
  }
`

// -------------------- PROFILE --------------------
// -------------------- PROFILE --------------------


export const GET_ACHIEVEMENTS_BY_USER = gql`
  query GetAchievementsByUser($userId: String) {
    getAchievementsByUser(userId: $userId) {
      _id
      title
      description
      user_id
      order
      created_at
      updated_at
    }
  }
`

export const CREATE_ACHIEVEMENT = gql`
  mutation CreateAchievement($input: CreateAchievementInput!) {
    createAchievement(input: $input) {
      _id
      title
      description
      user_id
      order
      created_at
      updated_at
    }
  }
`

export const UPDATE_ACHIEVEMENT = gql`
  mutation UpdateAchievement($achievementId: String!, $input: UpdateAchievementInput!) {
    updateAchievement(achievementId: $achievementId, input: $input) {
      _id
      title
      description
      order
      updated_at
    }
  }
`

export const DELETE_ACHIEVEMENT = gql`
  mutation DeleteAchievement($achievementId: String!) {
    deleteAchievement(achievementId: $achievementId)
  }
`
export const GET_EDUCATION_BY_USER = gql`
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
      order
      created_at
      updated_at
    }
  }
`

export const CREATE_EDUCATION = gql`
  mutation CreateEducation($input: CreateEducationInput!) {
    createEducation(input: $input) {
      _id
      institution_name
      degree
      field_of_study
      start_date
      end_date
      is_current
      order
      created_at
      updated_at
    }
  }
`

export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation($educationId: String!, $input: UpdateEducationInput!) {
    updateEducation(educationId: $educationId, input: $input) {
      _id
      institution_name
      degree
      field_of_study
      start_date
      end_date
      is_current
      order
      updated_at
    }
  }
`

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($educationId: String!) {
    deleteEducation(educationId: $educationId)
  }
`
export const GET_EXPERIENCE_BY_USER = gql`
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
      order
      created_at
      updated_at
    }
  }
`

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      _id
      company_name
      position
      start_date
      end_date
      is_current
      description
      location_id
      employment_type
      order
      created_at
      updated_at
    }
  }
`

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($experienceId: String!, $input: UpdateExperienceInput!) {
    updateExperience(experienceId: $experienceId, input: $input) {
      _id
      company_name
      position
      start_date
      end_date
      is_current
      description
      location_id
      employment_type
      order
      updated_at
    }
  }
`

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($experienceId: String!) {
    deleteExperience(experienceId: $experienceId)
  }
`
export const GET_PROJECTS_BY_USER = gql`
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
      order
      created_at
      updated_at
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      _id
       title
      description
      technologies
      project_url
      github_url
      start_date
      end_date
      is_current
      order
      created_at
      updated_at
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($projectId: String!, $input: UpdateProjectInput!) {
    updateProject(projectId: $projectId, input: $input) {
      _id
      title
      description
      technologies
      project_url
      github_url
      start_date
      end_date
      is_current
      order
      updated_at
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: String!) {
    deleteProject(projectId: $projectId)
  }
`
export const GET_SKILLS_BY_USER = gql`
  query GetSkillsByUser($userId: String) {
    getSkillsByUser(userId: $userId) {
      _id
      user_id
      skill_name
      proficiency_level
      years_experience
      order
      created_at
      updated_at
    }
  }
`

export const CREATE_USER_SKILL = gql`
  mutation CreateUserSkill($input: CreateUserSkillInput!) {
    createUserSkill( input: $input) {
      _id
      skill_name
      proficiency_level
      years_experience
      order
      created_at
      updated_at
    }
  }
`

export const UPDATE_USER_SKILL = gql`
  mutation UpdateUserSkill($userSkillId: String!, $input: UpdateUserSkillInput!) {
    updateUserSkill(userSkillId: $userSkillId, input: $input) {
      _id
      skill_name
      proficiency_level
      years_experience
      order
      updated_at
    }
  }
`

export const DELETE_USER_SKILL = gql`
  mutation DeleteUserSkill($userSkillId: String!) {
    deleteUserSkill(userSkillId: $userSkillId)
  }
`
export const LOAD_USER_BY_ID = gql`
  query LoadUserById($userId: String) {
    loadUserById(userId: $userId) {
      _id
      first_name
      last_name
      email
      photo
      title
      bio
      location_id
      is_connection
      chat_id
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
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
      is_connection
      last_seen
      created_at
      updated_at
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
      is_connection
      last_seen
      created_at
      updated_at
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`

export const LOAD_PEOPLE = gql`
  query LoadPeople($page: Int, $limit: Int) {
    loadPeople(page: $page, limit: $limit) {
      _id
      first_name
      last_name
      photo
      location_id
      title
      bio
      is_connection
      chat_id
      top_skills {
        _id
        skill_name
        proficiency_level
      }
    }
  }
`;

export const LOAD_PEOPLE_BY_FILTER = gql`
  query LoadPeopleByFilter($filter: PeopleFilterInput!, $page: Int, $limit: Int) {
    loadPeopleByFilter(filter: $filter, page: $page, limit: $limit) {
      _id
      first_name
      last_name
      photo
      location_id
      title
      bio
      is_connection
      chat_id
      top_skills {
        _id
        skill_name
        proficiency_level
      }
    }
  }
`;

export const LOAD_PERSON_BY_ID = gql`
  query LoadPersonById($id: String!) {
    loadPersonById(id: $id) {
      _id
      first_name
      last_name
      photo
      location_id
      title
      bio
      is_connection
      chat_id
      top_skills {
        _id
        skill_name
        proficiency_level
      }
    }
  }
`;

// -------------------- CONNECTIONS --------------------

export const LOAD_CONNECTIONS_LIST = gql`
  query LoadConnectionsList($userId: String) {
    loadConnectionsList(userId: $userId) {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
      first_name
      last_name
      photo
    }
  }
`;

export const LOAD_PENDING_FRIEND_REQUESTS = gql`
  query LoadPendingFriendRequests {
    loadPendingFriendRequests {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
      first_name
      last_name
      photo
    }
  }
`;

export const LOAD_SENT_FRIEND_REQUESTS = gql`
  query LoadSentFriendRequests {
    loadSentFriendRequests {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
      first_name
      last_name
      photo
    }
  }
`;

export const CHECK_CONNECTION_STATUS = gql`
  query CheckConnectionStatus($addresseeUserId: String!) {
    checkConnectionStatus(addresseeUserId: $addresseeUserId)
  }
`;

export const SEND_FRIEND_REQ = gql`
  mutation SendFriendReq($addresseeUserId: String!, $message: String) {
    sendFriendReq(addresseeUserId: $addresseeUserId, message: $message) {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
    }
  }
`;

export const ACCEPT_FRIEND_REQ = gql`
  mutation AcceptFriendReq($connectionId: String!) {
    acceptFriendReq(connectionId: $connectionId) {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
    }
  }
`;

export const DECLINE_FRIEND_REQ = gql`
  mutation DeclineFriendReq($connectionId: String!) {
    declineFriendReq(connectionId: $connectionId)
  }
`;

export const BLOCK_USER = gql`
  mutation BlockUser($addresseeUserId: String!) {
    blockUser(addresseeUserId: $addresseeUserId) {
      _id
      requester_user_id
      addressee_user_id
      status
      message
      chat_id
      created_at
      updated_at
      responded_at
    }
  }
`;

export const REMOVE_CONNECTION = gql`
  mutation RemoveConnection($connectionId: String!) {
    removeConnection(connectionId: $connectionId)
  }
`;

// -------------------- CHAT --------------------

export const GET_MESSAGES_FOR_CHAT = gql`
  query GetMessagesForChat($chatId: String!, $page: Int, $limit: Int) {
    getMessagesForChat(chatId: $chatId, page: $page, limit: $limit) {
      _id
      chat_id
      sender_id
      content
      read_by {
        user_id
        read_at
      }
      edited_at
      is_deleted
      deleted_for
      reply_to_message_id
      reply_to_message_content
      created_at
      updated_at
    }
  }
`;

export const GET_CHAT_LIST_FOR_USER = gql`
  query GetChatListForUser {
    getChatListForUser {
      _id
      participant_ids
      other_user_id
      is_active
      created_at
      updated_at
      first_name
      last_name
      photo
      last_message_content
      last_message_at
    }
  }
`;

export const GET_UNREAD_COUNT_FOR_CHATS = gql`
  query GetUnreadCountForChats {
    getUnreadCountForChats {
      chat_id
      unread_count
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: String!, $content: String!) {
    sendMessage(chatId: $chatId, content: $content) {
      _id
      chat_id
      sender_id
      content
      created_at
      updated_at
    }
  }
`;

export const EDIT_MESSAGE = gql`
  mutation EditMessage($messageId: String!, $content: String!) {
    editMessage(messageId: $messageId, content: $content) {
      _id
      chat_id
      sender_id
      content
      created_at
      updated_at
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId)
  }
`;

export const GET_PRESIGNED_URL = gql`
  query GetPresignedUrl($fileType: String!, $folder: String) {
    getPresignedUrl(fileType: $fileType, folder: $folder) {
      upload_url
      file_url
    }
  }
`

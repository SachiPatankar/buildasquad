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
  query LoadPostByFilter($filter: PostFilterInput!) {
    loadPostByFilter(filter: $filter) {
      _id
      title
      project_type
      work_mode
      tech_stack
    }
  }
`

// Get saved posts for current user
export const GET_SAVED_POSTS = gql`
  query GetSavedPosts {
    getSavedPosts {
      _id
      post_id
      user_id
      created_at
    }
  }
`

// Get applications for current user
export const GET_APPLICATIONS_BY_USER = gql`
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
`

// Load applications by post ID
export const LOAD_APPLICATIONS_BY_POST_ID = gql`
  query LoadApplicationsByPostId($postId: String!) {
    loadApplicationsByPostId(postId: $postId) {
      _id
      message
      status
      created_at
      applicant_id
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

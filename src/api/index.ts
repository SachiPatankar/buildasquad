// src/api/index.ts

import api from './api'

/* AUTH API ENDPOINTS */
const AUTH = '/v1/auth'

export interface LoginParams {
  email: string
  password: string
}
export interface SignupParams {
  first_name: string
  last_name?: string
  email: string
  password: string
}
export interface ForgotPasswordParams {
  email: string
}
export interface ResetPasswordParams {
  password: string
}
export interface DeleteUserParams {
  email: string
}

export const loginUser = (data: LoginParams) =>
  api.post<{ email: string; token: string }>(`${AUTH}/login`, data)

export const signupUser = (data: SignupParams) =>
  api.post<{ email: string; token: string }>(`${AUTH}/signup`, data)

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google`
}

export const githubLogin = () => {
   window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/github`
}

export const forgotPassword = (data: ForgotPasswordParams) =>
  api.post<{ status: string; message?: string }>(`${AUTH}/forgot-password`, data)

export const resetPassword = (
  id: string,
  token: string,
  data: ResetPasswordParams
) =>
  api.post<{ status: string }>(
    `${AUTH}/reset-password/${id}/${token}`,
    data
  )

export const getUsers = () =>
  api.get<Array<{ _id: string; first_name: string; last_name?: string; email: string }>>(
    `${AUTH}/getUsers`
    )

export const deleteUser = (data: DeleteUserParams) =>
  api.post<{ message: string }>(`${AUTH}/deleteUser`, data)

export const getMe = () =>
  api.post<{ _id: string; email: string; first_name?: string; last_name?: string; photo?: string }>(
    `${AUTH}/me`
  )

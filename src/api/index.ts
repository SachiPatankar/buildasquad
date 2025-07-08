// src/api/index.ts

import type { User } from '@/stores/userAuthStore'
import api from './api'


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
export interface LoginResponse {
  user: Partial<User>; // or define proper user interface
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface SignupResponse {
  user: Partial<User>; // or define proper user interface
  accessToken: string;
  refreshToken: string;
  message: string;
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
  api.post<LoginResponse>(`/v1/auth/login`, data)

export const signupUser = (data: SignupParams) =>
  api.post<SignupResponse>(`/v1/auth/signup`, data)

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/google`
}

export const githubLogin = () => {
   window.location.href = `${import.meta.env.VITE_API_URL}/v1/auth/github`
}

export const forgotPassword = (data: ForgotPasswordParams) =>
  api.post<{ status: string; message?: string }>(`/v1/auth/forgot-password`, data)

export const resetPassword = (
  id: string,
  token: string,
  data: ResetPasswordParams
) =>
  api.post<{ status: string }>(
    `/v1/auth/reset-password/${id}/${token}`,
    data
  )

export const getMe = () => api.get<{user:Partial<User>}>('/v1/auth/me');

export const logout = () =>
  api.post(`/v1/auth/logout`)


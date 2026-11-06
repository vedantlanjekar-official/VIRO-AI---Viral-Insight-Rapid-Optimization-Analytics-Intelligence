/**
 * Authentication API
 */

import { apiClient } from './client';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  role?: string | null;
  qualification?: string | null;
  occupation?: string | null;
  professional_summary?: string | null;
  skills?: string[] | null;
  experience?: unknown[] | null;
  publications?: unknown[] | null;
  awards?: unknown[] | null;
  social_links?: Record<string, string> | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignInRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export type UpdateProfileRequest = Partial<Omit<User, 'id' | 'email' | 'created_at' | 'updated_at'>>;

export const authApi = {
  signIn: ({ email, password }: SignInRequest) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),

  signUp: ({ firstName, lastName, email, password, phone, role }: SignUpRequest) =>
    apiClient.post<AuthResponse>('/auth/register', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      phone,
      role,
    }),

  signOut: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    apiClient.setToken(null);
  },

  getCurrentUser: () => apiClient.get<User>('/auth/me'),

  updateProfile: (data: UpdateProfileRequest) => apiClient.patch<User>('/auth/profile', data),
};

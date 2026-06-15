import { api } from './axios';

import type {
  AuthData,
  AuthResponse,
  LoginPayload,
  ProfileResponse,
  RegisterPayload,
  UserProfile,
} from '@/types/auth';

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthData> => {
  const { data } = await api.post<AuthResponse>(
    '/api/auth/login',
    payload,
  );

  return data.data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<AuthData> => {
  const { data } = await api.post<AuthResponse>(
    '/api/auth/register',
    payload,
  );

  return data.data;
};

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get<ProfileResponse>(
    '/api/auth/profile',
  );

  return data.data;
};
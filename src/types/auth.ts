export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface UserProfile extends User {
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;         // 💡 Sesuai data real backend lo
  avatar: string | null; // 💡 Sesuai data real backend lo
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileApiResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface ReviewPayload {
  rating: number;
  comment: string;
}
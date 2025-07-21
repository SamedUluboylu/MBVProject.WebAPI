import { api } from './api';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const usersApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    await api.put('/users/me', data);
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await api.post('/users/change-password', data);
  },
};
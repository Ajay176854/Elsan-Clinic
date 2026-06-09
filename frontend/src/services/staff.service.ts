import api from '../lib/axios';
import type { StaffApiResponse, StaffCreateRequest, StaffUpdateRequest } from '../types/staff.types';

export const staffService = {
  getAll: async () => {
    const response = await api.get<StaffApiResponse[]>('/staff');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<StaffApiResponse>(`/staff/${id}`);
    return response.data;
  },

  create: async (data: StaffCreateRequest) => {
    const response = await api.post<StaffApiResponse>('/staff', data);
    return response.data;
  },

  update: async (id: string, data: StaffUpdateRequest) => {
    const response = await api.put<StaffApiResponse>(`/staff/${id}`, data);
    return response.data;
  },

  activate: async (id: string) => {
    const response = await api.patch<StaffApiResponse>(`/staff/${id}/activate`);
    return response.data;
  },

  deactivate: async (id: string) => {
    const response = await api.patch<StaffApiResponse>(`/staff/${id}/deactivate`);
    return response.data;
  },

  resetPassword: async (id: string, admin_password: string, new_password: string) => {
    const response = await api.patch(`/staff/${id}/reset-password`, { admin_password, new_password });
    return response.data;
  },
};

import api from '../lib/axios';
import type { DoctorApiResponse } from '../types/doctor.types';

export const doctorService = {
  getAll: async (): Promise<DoctorApiResponse[]> => {
    const response = await api.get('/doctors');
    return response.data;
  },

  getById: async (id: string): Promise<DoctorApiResponse> => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  create: async (data: Partial<DoctorApiResponse>) => {
    const response = await api.post('/doctors', data);
    return response.data;
  },

  update: async (id: string, data: Partial<DoctorApiResponse>) => {
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  },

  uploadSignature: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/doctors/${id}/signature`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteSignature: async (id: string) => {
    const response = await api.delete(`/doctors/${id}/signature`);
    return response.data;
  },

  getStats: async (id: string): Promise<{ patients_today: number; total_appointments: number; total_prescriptions: number }> => {
    const response = await api.get(`/doctors/${id}/stats`);
    return response.data;
  },

  resetPassword: async (id: string, admin_password: string, new_password: string) => {
    const response = await api.patch(`/doctors/${id}/reset-password`, { admin_password, new_password });
    return response.data;
  },

  uploadProfilePic: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/doctors/${id}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProfilePic: async (id: string) => {
    const response = await api.delete(`/doctors/${id}/profile-picture`);
    return response.data;
  },
};


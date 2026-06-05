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
};

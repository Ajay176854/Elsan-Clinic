import { api } from './api';
import type { MedicineApiResponse, MedicineCreateRequest, MedicineUpdateRequest } from '../types/medicine.types';

export const medicineService = {
  getAll: async (search?: string): Promise<MedicineApiResponse[]> => {
    const params = search ? { search } : {};
    const response = await api.get<MedicineApiResponse[]>('/medicines', { params });
    return response.data;
  },

  getById: async (id: string): Promise<MedicineApiResponse> => {
    const response = await api.get<MedicineApiResponse>(`/medicines/${id}`);
    return response.data;
  },

  create: async (data: MedicineCreateRequest): Promise<MedicineApiResponse> => {
    const response = await api.post<MedicineApiResponse>('/medicines', data);
    return response.data;
  },

  update: async (id: string, data: MedicineUpdateRequest): Promise<MedicineApiResponse> => {
    const response = await api.put<MedicineApiResponse>(`/medicines/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/medicines/${id}`);
  },

  uploadFile: async (file: File): Promise<{ status: string; medicines_added: number; medicines_updated?: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/medicines/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

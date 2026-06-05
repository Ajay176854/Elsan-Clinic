import api from '../lib/axios';

export const prescriptionService = {
  getAll: async () => {
    const response = await api.get('/prescriptions');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  },

  create: async (data: Record<string, unknown>) => {
    const response = await api.post('/prescriptions', data);
    return response.data;
  },

  generatePdf: async (id: string) => {
    const response = await api.post(`/prescriptions/${id}/generate-pdf`);
    return response.data;
  },
};

import { api } from './api';
import { ClinicSettings, ClinicSettingsUpdate } from '../types/settings.types';

export const settingsService = {
  getSettings: async (): Promise<ClinicSettings> => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (data: ClinicSettingsUpdate): Promise<ClinicSettings> => {
    const response = await api.put('/settings', data);
    return response.data;
  },

  uploadLogo: async (file: File): Promise<ClinicSettings> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/settings/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

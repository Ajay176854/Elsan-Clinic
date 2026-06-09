import { api } from './api';
import type { Roster, RosterCreate, RosterUpdate } from '../types/roster.types';

export const rosterService = {
  createRoster: async (data: RosterCreate): Promise<Roster> => {
    const response = await api.post('/rosters', data);
    return response.data;
  },

  getAllRosters: async (role?: string): Promise<Roster[]> => {
    const response = await api.get('/rosters', { params: { role } });
    return response.data;
  },

  getMyRosters: async (): Promise<Roster[]> => {
    const response = await api.get('/rosters/my');
    return response.data;
  },

  updateRoster: async (id: string, data: RosterUpdate): Promise<Roster> => {
    const response = await api.put(`/rosters/${id}`, data);
    return response.data;
  },

  deleteRoster: async (id: string): Promise<void> => {
    await api.delete(`/rosters/${id}`);
  }
};

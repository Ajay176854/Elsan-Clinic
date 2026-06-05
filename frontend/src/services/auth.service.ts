import api from '../lib/axios';
import { LoginFormData } from '../schemas';

export const authService = {
  login: async (email: string, password: string) => {
    // We send the login request. The backend will respond with HTTPOnly cookies automatically.
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    // Tell backend to blacklist the token and clear the cookies
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Logout failed on server, but proceeding locally", e);
    }
  },

  getMe: async () => {
    // This request will automatically include the access_token cookie
    const response = await api.get('/auth/me');
    return response.data;
  },
};

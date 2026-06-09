import { api } from './api';
import type { Notification, NotificationCreate, NotificationBulkCreate } from '../types/notification.types';

export const notificationService = {
  getMyNotifications: async (unreadOnly: boolean = false): Promise<Notification[]> => {
    const response = await api.get('/notifications/my', { params: { unread_only: unreadOnly } });
    return response.data;
  },

  sendIndividualNotification: async (data: NotificationCreate): Promise<Notification> => {
    const response = await api.post('/notifications/send', data);
    return response.data;
  },

  sendBulkNotification: async (data: NotificationBulkCreate): Promise<{ status: string; count: number }> => {
    const response = await api.post('/notifications/send-bulk', data);
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
  },

  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  }
};

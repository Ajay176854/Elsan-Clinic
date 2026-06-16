import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services';
import type { NotificationCreate, NotificationBulkCreate } from '../types/notification.types';

export const useMyNotifications = (unreadOnly: boolean = false) => {
  return useQuery({
    queryKey: ['notifications', 'my', unreadOnly],
    queryFn: () => notificationService.getMyNotifications(unreadOnly),
    // Poll every 30 seconds for new notifications to simulate real-time
    refetchInterval: 30000,
  });
};

export const useSendIndividualNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationCreate) => notificationService.sendIndividualNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useSendBulkNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationBulkCreate) => notificationService.sendBulkNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      
      const previousNotificationsFalse = queryClient.getQueryData(['notifications', 'my', false]);
      const previousNotificationsTrue = queryClient.getQueryData(['notifications', 'my', true]);

      queryClient.setQueryData(['notifications', 'my', false], (old: any) => {
        if (!old) return old;
        return old.map((n: any) => n.id === id ? { ...n, is_read: true } : n);
      });

      queryClient.setQueryData(['notifications', 'my', true], (old: any) => {
        if (!old) return old;
        return old.filter((n: any) => n.id !== id);
      });

      return { previousNotificationsFalse, previousNotificationsTrue };
    },
    onError: (err, id, context) => {
      if (context?.previousNotificationsFalse) {
        queryClient.setQueryData(['notifications', 'my', false], context.previousNotificationsFalse);
      }
      if (context?.previousNotificationsTrue) {
        queryClient.setQueryData(['notifications', 'my', true], context.previousNotificationsTrue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      
      const previousNotificationsFalse = queryClient.getQueryData(['notifications', 'my', false]);
      const previousNotificationsTrue = queryClient.getQueryData(['notifications', 'my', true]);

      queryClient.setQueryData(['notifications', 'my', false], (old: any) => {
        if (!old) return old;
        return old.filter((n: any) => n.id !== id);
      });

      queryClient.setQueryData(['notifications', 'my', true], (old: any) => {
        if (!old) return old;
        return old.filter((n: any) => n.id !== id);
      });

      return { previousNotificationsFalse, previousNotificationsTrue };
    },
    onError: (err, id, context) => {
      if (context?.previousNotificationsFalse) {
        queryClient.setQueryData(['notifications', 'my', false], context.previousNotificationsFalse);
      }
      if (context?.previousNotificationsTrue) {
        queryClient.setQueryData(['notifications', 'my', true], context.previousNotificationsTrue);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

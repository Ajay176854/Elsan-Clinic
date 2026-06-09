export enum NotificationType {
  ROSTER = "ROSTER",
  LEAVE = "LEAVE",
  ADMIN_MESSAGE = "ADMIN_MESSAGE",
  SYSTEM_ALERT = "SYSTEM_ALERT"
}

export interface Notification {
  id: string;
  recipient_id?: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
}

export interface NotificationCreate {
  title: string;
  message: string;
  type: NotificationType;
  recipient_id?: string;
}

export interface NotificationBulkCreate {
  title: string;
  message: string;
  type: NotificationType;
  role_target?: string;
}

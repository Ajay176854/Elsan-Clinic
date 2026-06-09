export interface UserBasicInfo {
  id: string;
  full_name: string;
  role: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string | null;
  timestamp: string;
  user: UserBasicInfo | null;
}

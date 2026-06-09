export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: LeaveStatus;
  reviewed_by_id?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_role?: string;
}

export interface LeaveRequestCreate {
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
}

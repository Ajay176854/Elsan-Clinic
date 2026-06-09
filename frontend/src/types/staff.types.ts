export interface StaffApiResponse {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StaffCreateRequest {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
}

export interface StaffUpdateRequest {
  full_name?: string;
  email?: string;
  phone?: string;
}

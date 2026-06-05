export interface AdminUser {
  username: string;
  pass: string;
  roleTitle: string;
  accessLevel: 'super_admin' | 'director' | 'reception' | 'nurse' | 'pharmacy' | 'doctor' | 'analyst';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

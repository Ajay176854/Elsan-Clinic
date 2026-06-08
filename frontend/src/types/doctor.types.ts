export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  fellowships: string[];
  phone: string;
  consultationType: string;
  specialties: string[];
}

export interface DoctorApiResponse {
  id: string;
  user_id?: string;
  full_name?: string;
  name?: string;
  email?: string;
  specialization?: string;
  spec?: string;
  qualification?: string;
  experience_years?: number;
  consultation_fee?: number;
  consultation_timings?: string;
  signature_url?: string;
  profile_pic_url?: string;
  phone: string;
  is_active: boolean;
  status?: boolean;
}

export interface DoctorStatsResponse {
  patients_today: number;
  total_appointments: number;
  total_prescriptions: number;
}



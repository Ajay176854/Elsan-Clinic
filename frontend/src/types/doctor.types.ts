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
  full_name?: string;
  name?: string;
  specialization?: string;
  spec?: string;
  phone: string;
  is_active: boolean;
}

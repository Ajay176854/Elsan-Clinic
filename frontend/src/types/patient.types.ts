export interface Patient {
  id: string;
  pass: string;
  name: string;
  age: number;
  condition: string;
  nextAppt: string;
  lastRx: string;
  lastVisit: string;
}

export interface PatientApiResponse {
  id: string;
  patient_code: string;
  full_name: string;
  phone: string;
  age?: number;
  gender?: string;
}

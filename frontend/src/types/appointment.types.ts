export interface AppointmentApiResponse {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  reason?: string;
}

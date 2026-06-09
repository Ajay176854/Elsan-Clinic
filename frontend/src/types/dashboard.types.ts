export interface DashboardOverview {
  total_patients: number;
  total_doctors: number;
  total_staff: number;
  total_visits: number;
  total_prescriptions: number;
  todays_appointments: number;
  whatsapp_deliveries: number;
}

export interface TrendPoint {
  date: string;
  count: number;
}

export interface PatientGrowthResponse {
  trends: TrendPoint[];
}

export interface VisitStatsResponse {
  daily: TrendPoint[];
  monthly: TrendPoint[];
}

export interface DoctorPerformancePoint {
  doctor_name: string;
  total_visits: number;
  total_prescriptions: number;
}

export interface DoctorPerformanceResponse {
  performance: DoctorPerformancePoint[];
}

export interface AppointmentTrendPoint {
  date: string;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface AppointmentTrendResponse {
  trends: AppointmentTrendPoint[];
}

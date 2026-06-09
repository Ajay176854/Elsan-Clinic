import { api } from './api';
import type {
  DashboardOverview,
  PatientGrowthResponse,
  VisitStatsResponse,
  DoctorPerformanceResponse,
  AppointmentTrendResponse
} from '../types/dashboard.types';

export const dashboardService = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await api.get<DashboardOverview>('/dashboard/overview');
    return response.data;
  },

  getPatientGrowth: async (): Promise<PatientGrowthResponse> => {
    const response = await api.get<PatientGrowthResponse>('/dashboard/patient-growth');
    return response.data;
  },

  getVisitStats: async (): Promise<VisitStatsResponse> => {
    const response = await api.get<VisitStatsResponse>('/dashboard/visit-stats');
    return response.data;
  },

  getDoctorPerformance: async (): Promise<DoctorPerformanceResponse> => {
    const response = await api.get<DoctorPerformanceResponse>('/dashboard/doctor-performance');
    return response.data;
  },

  getAppointmentTrends: async (): Promise<AppointmentTrendResponse> => {
    const response = await api.get<AppointmentTrendResponse>('/dashboard/appointment-trends');
    return response.data;
  }
};

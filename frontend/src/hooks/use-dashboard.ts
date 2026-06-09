import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services';

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.getOverview(),
  });
}

export function usePatientGrowth() {
  return useQuery({
    queryKey: ['dashboard', 'patientGrowth'],
    queryFn: () => dashboardService.getPatientGrowth(),
  });
}

export function useVisitStats() {
  return useQuery({
    queryKey: ['dashboard', 'visitStats'],
    queryFn: () => dashboardService.getVisitStats(),
  });
}

export function useDoctorPerformance() {
  return useQuery({
    queryKey: ['dashboard', 'doctorPerformance'],
    queryFn: () => dashboardService.getDoctorPerformance(),
  });
}

export function useAppointmentTrends() {
  return useQuery({
    queryKey: ['dashboard', 'appointmentTrends'],
    queryFn: () => dashboardService.getAppointmentTrends(),
  });
}

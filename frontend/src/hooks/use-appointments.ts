import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '../services';

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAll,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

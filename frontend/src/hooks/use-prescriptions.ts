import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { prescriptionService } from '../services';

export function usePrescriptions() {
  return useQuery({
    queryKey: ['prescriptions'],
    queryFn: prescriptionService.getAll,
  });
}

export function useCreatePrescription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: prescriptionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });
}

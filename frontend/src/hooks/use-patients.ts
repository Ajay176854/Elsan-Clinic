import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '../services';

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}

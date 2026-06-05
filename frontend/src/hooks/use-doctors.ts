import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '../services';

export function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: doctorService.getAll,
  });
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: ['doctors', id],
    queryFn: () => doctorService.getById(id),
    enabled: !!id,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: doctorService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      doctorService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });
}

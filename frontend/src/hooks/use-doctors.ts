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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
}

export function useUploadSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      doctorService.uploadSignature(id, file),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
}

export function useDeleteSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doctorService.deleteSignature(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
}

export function useDoctorStats(id: string | null) {
  return useQuery({
    queryKey: ['doctors', id, 'stats'],
    queryFn: () => doctorService.getStats(id!),
    enabled: !!id,
  });
}

export function useResetDoctorPassword() {
  return useMutation({
    mutationFn: ({ id, admin_password, new_password }: { id: string; admin_password: string; new_password: string }) =>
      doctorService.resetPassword(id, admin_password, new_password),
  });
}

export function useUploadProfilePic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => doctorService.uploadProfilePic(id, file),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
}

export function useDeleteProfilePic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doctorService.deleteProfilePic(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['doctors', id] });
    },
  });
}



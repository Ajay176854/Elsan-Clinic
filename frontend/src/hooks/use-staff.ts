import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '../services';
import type { StaffCreateRequest, StaffUpdateRequest } from '../types/staff.types';

export function useStaff() {
  return useQuery({
    queryKey: ['staff'],
    queryFn: staffService.getAll,
  });
}

export function useStaffMember(id: string | null) {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () => staffService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StaffCreateRequest) => staffService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StaffUpdateRequest }) => staffService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      queryClient.invalidateQueries({ queryKey: ['staff', id] });
    },
  });
}

export function useActivateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.activate(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      queryClient.invalidateQueries({ queryKey: ['staff', id] });
    },
  });
}

export function useDeactivateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.deactivate(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      queryClient.invalidateQueries({ queryKey: ['staff', id] });
    },
  });
}

export function useResetStaffPassword() {
  return useMutation({
    mutationFn: ({ id, admin_password, new_password }: { id: string; admin_password: string; new_password: string }) =>
      staffService.resetPassword(id, admin_password, new_password),
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { medicineService } from '../services';
import type { MedicineCreateRequest, MedicineUpdateRequest } from '../types/medicine.types';

export function useMedicines(search?: string) {
  return useQuery({
    queryKey: ['medicines', search],
    queryFn: () => medicineService.getAll(search),
  });
}

export function useMedicine(id: string | null) {
  return useQuery({
    queryKey: ['medicines', id],
    queryFn: () => medicineService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MedicineCreateRequest) => medicineService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

export function useUpdateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MedicineUpdateRequest }) => medicineService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      queryClient.invalidateQueries({ queryKey: ['medicines', id] });
    },
  });
}

export function useDeleteMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => medicineService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

export function useUploadMedicines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => medicineService.uploadFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

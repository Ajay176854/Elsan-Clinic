import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rosterService } from '../services';
import type { RosterCreate, RosterUpdate } from '../types/roster.types';

export const useRosters = (role?: string) => {
  return useQuery({
    queryKey: ['rosters', role],
    queryFn: () => rosterService.getAllRosters(role),
  });
};

export const useMyRosters = () => {
  return useQuery({
    queryKey: ['rosters', 'my'],
    queryFn: () => rosterService.getMyRosters(),
  });
};

export const useCreateRoster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RosterCreate) => rosterService.createRoster(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rosters'] });
    },
  });
};

export const useUpdateRoster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RosterUpdate }) => rosterService.updateRoster(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rosters'] });
    },
  });
};

export const useDeleteRoster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => rosterService.deleteRoster(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rosters'] });
    },
  });
};

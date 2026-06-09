import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveService } from '../services';
import type { LeaveRequestCreate, LeaveStatus } from '../types/leave.types';

export const useLeaveRequests = (status?: LeaveStatus) => {
  return useQuery({
    queryKey: ['leaves', status],
    queryFn: () => leaveService.getAllLeaveRequests(status),
  });
};

export const useMyLeaveRequests = () => {
  return useQuery({
    queryKey: ['leaves', 'my'],
    queryFn: () => leaveService.getMyLeaveRequests(),
  });
};

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveRequestCreate) => leaveService.createLeaveRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
};

export const useApproveLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leaveService.approveLeaveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
};

export const useRejectLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leaveService.rejectLeaveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
    },
  });
};

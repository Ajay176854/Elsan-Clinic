import { api } from './api';
import type { LeaveRequest, LeaveRequestCreate, LeaveStatus } from '../types/leave.types';

export const leaveService = {
  createLeaveRequest: async (data: LeaveRequestCreate): Promise<LeaveRequest> => {
    const response = await api.post('/leave-requests', data);
    return response.data;
  },

  getAllLeaveRequests: async (status?: LeaveStatus): Promise<LeaveRequest[]> => {
    const response = await api.get('/leave-requests', { params: { leave_status: status } });
    return response.data;
  },

  getMyLeaveRequests: async (): Promise<LeaveRequest[]> => {
    const response = await api.get('/leave-requests/my');
    return response.data;
  },

  approveLeaveRequest: async (id: string): Promise<LeaveRequest> => {
    const response = await api.put(`/leave-requests/${id}/approve`);
    return response.data;
  },

  rejectLeaveRequest: async (id: string): Promise<LeaveRequest> => {
    const response = await api.put(`/leave-requests/${id}/reject`);
    return response.data;
  }
};

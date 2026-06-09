import { api } from './api';
import type { AuditLog } from '../types/audit.types';

export const auditService = {
  getLogs: async (params?: { limit?: number; action?: string }): Promise<AuditLog[]> => {
    const response = await api.get('/audit-logs', { params });
    return response.data;
  }
};

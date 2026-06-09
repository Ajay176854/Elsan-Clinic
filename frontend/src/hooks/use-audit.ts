import { useQuery } from '@tanstack/react-query';
import { auditService } from '../services/audit.service';

export const useAuditLogs = (params?: { limit?: number; action?: string }) => {
  return useQuery({
    queryKey: ['audit-logs', params],
    queryFn: () => auditService.getLogs(params),
  });
};

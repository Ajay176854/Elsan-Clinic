"use client";
import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useAuditLogs } from '../../../hooks/use-audit';
import { format } from 'date-fns';

export default function AuditLogsPage() {
  const { data: logs, isLoading } = useAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">Track actions taken by staff, admins, and doctors across the system.</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input type="text" placeholder="Search logs by user, action, or target..." className="pl-10 bg-white" />
          </div>
          <select className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2">
            <option>All Actions</option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
          </select>
          <select className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">User (Role)</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Target / Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs?.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {format(new Date(log.timestamp), 'PP p')}
                  </td>
                  <td className="p-4 font-medium text-slate-800">
                    {log.user ? `${log.user.full_name} (${log.user.role})` : 'System'}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-blue-600 font-medium">{log.entity_type}: {log.details || log.entity_id}</td>
                </tr>
              ))}
              {!logs?.length && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">No audit logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

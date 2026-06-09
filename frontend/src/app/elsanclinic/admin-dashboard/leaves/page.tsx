"use client";

import React from 'react';
import { useLeaveRequests, useApproveLeaveRequest, useRejectLeaveRequest } from '../../../../hooks/use-leaves';
import { CalendarOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { LeaveStatus } from '../../../../types/leave.types';

export default function LeavesPage() {
  const { data: leaves, isLoading } = useLeaveRequests();
  const approveMutation = useApproveLeaveRequest();
  const rejectMutation = useRejectLeaveRequest();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <CalendarOff className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Leave Requests</h1>
            <p className="text-slate-500 text-sm mt-1">Review and manage staff time-off</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : leaves?.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CalendarOff className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium">No leave requests found</p>
            <p className="text-sm mt-1">Staff leave requests will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Staff Member</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaves?.map((leave) => (
                  <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div>{leave.user_name}</div>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">{leave.user_role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                        {leave.leave_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{leave.start_date}</div>
                      <div className="text-xs text-slate-500 mt-0.5">to {leave.end_date}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={leave.reason}>
                      {leave.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        leave.status === LeaveStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                        leave.status === LeaveStatus.REJECTED ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {leave.status === LeaveStatus.PENDING && (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => approveMutation.mutate(leave.id)}
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                            className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors title='Approve'"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => rejectMutation.mutate(leave.id)}
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors title='Reject'"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

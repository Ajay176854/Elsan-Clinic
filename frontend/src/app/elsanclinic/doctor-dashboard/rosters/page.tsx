"use client";

import React from 'react';
import { useMyRosters } from '../../../../hooks/use-rosters';
import { CalendarDays, Loader2 } from 'lucide-react';
import { ShiftType } from '../../../../types/roster.types';

export default function MyRostersPage() {
  const { data: rosters, isLoading } = useMyRosters();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Roster</h1>
            <p className="text-slate-500 text-sm mt-1">View your assigned shifts</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : rosters?.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CalendarDays className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium">No shifts assigned</p>
            <p className="text-sm mt-1">You currently have no scheduled shifts.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Shift Type</th>
                  <th className="px-6 py-4">Timings</th>
                  <th className="px-6 py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rosters?.map((roster: any) => (
                  <tr key={roster.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {new Date(roster.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        roster.shift_type === ShiftType.MORNING ? 'bg-amber-100 text-amber-700' :
                        roster.shift_type === ShiftType.AFTERNOON ? 'bg-indigo-100 text-indigo-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {roster.shift_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{roster.start_time.slice(0, 5)} - {roster.end_time.slice(0, 5)}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={roster.notes}>
                      {roster.notes || '-'}
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

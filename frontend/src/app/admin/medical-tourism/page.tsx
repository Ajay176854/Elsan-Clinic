"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../services/api';
import { Globe, FileText, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function MedicalTourismReports() {
  const [filter, setFilter] = useState('PENDING');

  const { data: reports, isLoading, refetch } = useQuery({
    queryKey: ['medical_tourism', filter],
    queryFn: async () => {
      const res = await api.get(`/medical_tourism/reports?status=${filter}`);
      return res.data;
    }
  });

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/medical_tourism/reports/${id}/status?status=${status}`);
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const getFileUrl = (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8009/api/v1';
    return baseUrl.replace('/api/v1', '') + url;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Globe className="text-blue-600" /> Medical Tourism Reports</h1>
          <p className="text-slate-500">Manage inquiries and reports from international patients.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
          {['PENDING', 'REVIEWED', 'CONTACTED'].map(s => (
            <button 
              key={s} 
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition ${filter === s ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : reports?.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">No {filter.toLowerCase()} reports found.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Patient Info</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Report</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports?.map((r: any) => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{r.patient_name}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin size={12}/> {r.country || 'Not specified'}</div>
                    <div className="text-xs text-slate-400 mt-1">{format(new Date(r.created_at), 'MMM d, yyyy h:mm a')}</div>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-2 text-slate-600"><Phone size={14}/> {r.phone}</div>
                    {r.email && <div className="flex items-center gap-2 text-slate-600"><Mail size={14}/> {r.email}</div>}
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-600" title={r.notes}>{r.notes || '-'}</td>
                  <td className="p-4">
                    <a href={getFileUrl(r.file_url)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-3 py-1.5 rounded-lg w-max transition">
                      <FileText size={16}/> View Report
                    </a>
                  </td>
                  <td className="p-4">
                    {r.status === 'PENDING' && (
                      <button onClick={() => updateStatus(r.id, 'REVIEWED')} className="text-teal-600 hover:text-teal-800 font-bold bg-teal-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                        <CheckCircle size={16}/> Mark Reviewed
                      </button>
                    )}
                    {r.status === 'REVIEWED' && (
                      <button onClick={() => updateStatus(r.id, 'CONTACTED')} className="text-orange-600 hover:text-orange-800 font-bold bg-orange-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                        <Phone size={16}/> Mark Contacted
                      </button>
                    )}
                    {r.status === 'CONTACTED' && (
                      <span className="text-slate-400 font-semibold flex items-center gap-1"><CheckCircle size={16}/> Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

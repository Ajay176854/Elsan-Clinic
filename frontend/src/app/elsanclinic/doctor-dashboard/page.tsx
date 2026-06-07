"use client";

import { useRouter } from 'next/navigation';
import { useUser } from "../../../hooks";
import { Loader2, Calendar, FileText, Video } from "lucide-react";

export default function DoctorDashboardPage() {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-teal-600 w-8 h-8" /></div>;
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Doctor Workspace
          </h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Dr. {user.full_name.replace('Dr. ', '')}! Have a great shift.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
          <span className="text-teal-700 font-semibold text-sm">Role: {user.role.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', patient: 'Rahul Kumar', type: 'General Checkup', status: 'Waiting' },
              { time: '10:30 AM', patient: 'Priya Sharma', type: 'Follow-up', status: 'Next' },
              { time: '11:15 AM', patient: 'Amit Patel', type: 'Consultation', status: 'Scheduled' },
              { time: '02:00 PM', patient: 'Sneha Gupta', type: 'Telemedicine', status: 'Scheduled' }
            ].map((apt, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 text-teal-700 font-medium px-3 py-1 rounded-md text-sm">{apt.time}</div>
                  <div>
                    <p className="font-medium text-slate-800">{apt.patient}</p>
                    <p className="text-xs text-slate-500">{apt.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  apt.status === 'Waiting' ? 'bg-orange-100 text-orange-700' : 
                  apt.status === 'Next' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => router.push('/elsanclinic/doctor-dashboard/prescriptions')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors cursor-pointer"
              >
                <FileText className="h-6 w-6 text-teal-600" />
                <span className="text-xs font-medium text-center">New Prescription</span>
              </button>
              <button 
                onClick={() => router.push('/elsanclinic/doctor-dashboard/telemedicine')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <Video className="h-6 w-6 text-indigo-600" />
                <span className="text-xs font-medium text-center">Start Telemed</span>
              </button>
              <button 
                onClick={() => router.push('/elsanclinic/doctor-dashboard/appointments')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <Calendar className="h-6 w-6 text-sky-600" />
                <span className="text-xs font-medium text-center">My Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

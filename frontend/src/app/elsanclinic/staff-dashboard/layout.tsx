"use client";

import React, { useEffect } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import { useUser } from '../../../hooks';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/elsanclinic/staff-login');
    } else if (!isLoading && user && !['RECEPTIONIST', 'NURSE', 'ANALYST', 'PHARMACY'].includes(user.role)) {
      if (user.role === 'DOCTOR') {
        router.push('/elsanclinic/doctor-dashboard');
      } else if (['SUPER_ADMIN', 'DIRECTOR'].includes(user.role)) {
        router.push('/elsanclinic/admin-dashboard');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || !['RECEPTIONIST', 'NURSE', 'ANALYST', 'PHARMACY'].includes(user.role)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-sky-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

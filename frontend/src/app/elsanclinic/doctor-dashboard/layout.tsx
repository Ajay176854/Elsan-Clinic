"use client";

import React, { useEffect } from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import { useUser } from '../../../hooks';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DoctorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/elsanclinic/doctor-login');
    } else if (!isLoading && user && user.role !== 'DOCTOR') {
      if (['SUPER_ADMIN', 'DIRECTOR'].includes(user.role)) {
        router.push('/elsanclinic/admin-dashboard');
      } else {
        router.push('/elsanclinic/staff-dashboard');
      }
    }
  }, [user, isLoading, router]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (isLoading || !user || !['SUPER_ADMIN', 'DOCTOR'].includes(user.role)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
          <span className="text-blue-600">Elsan</span> Clinic
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>

      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 z-0">
        <main data-lenis-prevent="true" className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}

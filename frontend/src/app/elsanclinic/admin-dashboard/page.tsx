"use client";

import { OverviewStats } from "../../../components/dashboard";
import { useUser } from "../../../hooks";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Executive Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, {user.full_name}! Have a great shift.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          <span className="text-indigo-700 font-semibold text-sm">Role: {user.role.replace('_', ' ')}</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Clinic Performance</h2>
        <OverviewStats />
      </div>
    </div>
  );
}

"use client";

import { Users, UserRound, Calendar, FileText, Video, LayoutDashboard, Settings, LogOut, Loader2, BedDouble, Pill, MessageCircle, BarChart3, ShieldAlert, Lock } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "../../lib/utils";
import { useUser, useLogout } from "../../hooks";

const getMenuItems = (role: string, basePath: string) => {
  const items = [];
  
  items.push({ name: "Overview", href: basePath, icon: LayoutDashboard });
  
  if (['SUPER_ADMIN', 'RECEPTIONIST', 'NURSE'].includes(role)) {
    items.push({ name: "Appointments", href: `${basePath}/appointments`, icon: Calendar });
    items.push({ name: "Patients", href: `${basePath}/patients`, icon: Users });
    items.push({ name: "Inpatients", href: `${basePath}/inpatients`, icon: BedDouble });
  }
  
  if (['SUPER_ADMIN', 'DIRECTOR'].includes(role)) {
    items.push({ name: "Doctors", href: `${basePath}/doctors`, icon: UserRound });
    items.push({ name: "Staff", href: `${basePath}/staff`, icon: Users });
  }
  
  if (['SUPER_ADMIN', 'DOCTOR'].includes(role)) {
    if (!items.some(i => i.name === "My Appointments" || i.name === "Appointments")) {
      items.push({ name: "My Appointments", href: `${basePath}/appointments`, icon: Calendar });
    }
    items.push({ name: "My Patients", href: `${basePath}/patients`, icon: Users });
    items.push({ name: "Prescriptions", href: `${basePath}/prescriptions`, icon: FileText });
  }

  if (['SUPER_ADMIN'].includes(role)) {
    items.push({ name: "Medicines", href: `${basePath}/medicines`, icon: Pill });
    items.push({ name: "WhatsApp", href: `${basePath}/whatsapp`, icon: MessageCircle });
    items.push({ name: "Reports", href: `${basePath}/reports`, icon: BarChart3 });
    items.push({ name: "Settings", href: `${basePath}/settings`, icon: Settings });
    items.push({ name: "Audit Logs", href: `${basePath}/audit-logs`, icon: ShieldAlert });
    items.push({ name: "Permissions", href: `${basePath}/permissions`, icon: Lock });
  }

  return items.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);
};

export default function Sidebar() {
  const location = usePathname();
  const { data: user, isLoading } = useUser();
  const logout = useLogout();

  let basePath = "/admin";
  if (location.startsWith("/elsanclinic/admin-dashboard")) {
    basePath = "/elsanclinic/admin-dashboard";
  } else if (location.startsWith("/elsanclinic/staff-dashboard")) {
    basePath = "/elsanclinic/staff-dashboard";
  } else if (location.startsWith("/elsanclinic/doctor-dashboard")) {
    basePath = "/elsanclinic/doctor-dashboard";
  }

  return (
    <div className="hidden border-r bg-white md:block w-64 lg:w-72 shadow-sm relative">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6 justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <span className="text-blue-600">Elsan</span> Clinic
          </Link>
        </div>
        <div className="px-6 py-2 border-b border-slate-50 bg-slate-50">
          {isLoading ? <Loader2 className="animate-spin w-4 h-4 text-blue-600"/> : (
            <>
              <p className="text-sm font-bold text-slate-800 truncate">{user?.full_name}</p>
              <p className="text-xs text-slate-500 font-medium">{user?.role}</p>
            </>
          )}
        </div>
        <div className="flex-1 py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            {!isLoading && getMenuItems(user?.role || '', basePath).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                  location === item.href
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Stethoscope, Users, Shield, HeartPulse, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const portals = [
    {
      title: "Doctor Portal",
      description: "Access your clinical workspace, review appointments, and write digital prescriptions.",
      icon: Stethoscope,
      href: "/elsanclinic/doctor-login",
      color: "from-teal-500 to-emerald-600",
      accent: "teal",
      shadow: "shadow-teal-100/50",
      hoverBg: "hover:border-teal-300",
      tag: "Clinicians & Specialists"
    },
    {
      title: "Staff & Reception",
      description: "Manage patient registrations, schedule appointments, coordinate bed admissions, and front-desk clinic operations.",
      icon: Users,
      href: "/elsanclinic/staff-login",
      color: "from-sky-500 to-blue-600",
      accent: "blue",
      shadow: "shadow-blue-100/50",
      hoverBg: "hover:border-blue-300",
      tag: "Front Desk & Nursing"
    },
    {
      title: "Admin Dashboard",
      description: "Access executive analytics, manage system settings, configure doctor/staff directories, and audit security logs.",
      icon: Shield,
      href: "/elsanclinic/admin-login",
      color: "from-slate-700 to-slate-900",
      accent: "slate",
      shadow: "shadow-slate-200/50",
      hoverBg: "hover:border-slate-400",
      tag: "Executive & IT Admin"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 relative overflow-hidden font-sans">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-1.5">
            <img src="/logo.png" alt="Elsan Clinic Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Elsan Clinic</h1>
            <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Management Portal</p>
          </div>
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-lg border border-slate-100 shadow-sm transition-all active:scale-95"
        >
          <Home size={14} /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 z-10 relative">
        <div className="text-center max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100/50 mb-4 shadow-sm">
            <HeartPulse size={12} className="animate-pulse" /> Secure System Gateway
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Select Your Portal to Sign In
          </h2>
          <p className="text-slate-500 text-md md:text-lg font-light mt-3 leading-relaxed">
            Welcome to the Elsan Clinic Hospital Management System. Please select your designated access role below to proceed to login.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <div 
                key={idx}
                className={`group bg-white border border-slate-150 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${portal.hoverBg}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${portal.color} text-white shadow-lg ${portal.shadow}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                      {portal.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {portal.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                <div className="mt-8">
                  <Link 
                    href={portal.href}
                    className={`flex items-center justify-center gap-2 w-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white border border-slate-150 group-hover:border-blue-600 text-slate-700 font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-300 shadow-sm`}
                  >
                    Enter Portal <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-100 z-10 bg-white/50 backdrop-blur-sm">
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} Elsan Clinic Management System. Authorized personnel access only.
        </p>
      </footer>
    </div>
  );
}

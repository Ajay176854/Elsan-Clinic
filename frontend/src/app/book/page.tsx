"use client";

import { BookView } from '@/components/PublicViews';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function BookAppointmentPage() {
  return (
    <AuroraBackground className="min-h-screen min-w-full flex flex-col justify-start items-stretch font-sans text-slate-800" showRadialGradient={true}>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="text-blue-600" />
            <span className="font-bold text-blue-900">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl p-1"><img src="/logo.png" alt="Elsan Clinic" className="w-full h-full object-contain" /></div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-blue-900 leading-none">Elsan Clinic</h1>
              <p className="text-[10px] md:text-xs font-semibold text-teal-600 tracking-wider">TRUSTED HEALTHCARE</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 pt-12 relative z-10">
        <BookView />
      </main>
    </AuroraBackground>
  );
}

"use client";

import { Stethoscope, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { CLINIC_INFO } from '../../data';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center border-b border-slate-100">
          <div className="flex items-center gap-3 py-4 px-4">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-sm flex-shrink-0">
              <Stethoscope size={28} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Elsan Clinic</h1>
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Powered by Gemini AI</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-[15px] font-semibold text-slate-700">
            <button onClick={() => onTabChange('home')} className={`${activeTab === 'home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Home</button>
            <button onClick={() => onTabChange('treatments')} className={`${activeTab === 'treatments' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Treatments</button>
            <button onClick={() => onTabChange('doctors')} className={`${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Doctors</button>
            <button onClick={() => onTabChange('contact')} className={`${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Contact</button>
          </div>

          <div className="flex items-center gap-4 px-4">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">
              Staff Login
            </Link>
            <button onClick={() => onTabChange('book')} className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition shadow-sm">
              Book Appt
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

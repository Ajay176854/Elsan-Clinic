"use client";

import { Stethoscope, Phone, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../../data';

interface FooterProps {
  onTabChange?: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><Stethoscope size={20} /></div>
            <h2 className="text-xl font-bold text-white">Elsan Clinic</h2>
          </div>
          <p className="text-sm">Part of Elsan Foundation.<br />{CLINIC_INFO.tagline}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onTabChange?.('home')} className="hover:text-white transition">About Us</button></li>
            <li><button onClick={() => onTabChange?.('treatments')} className="hover:text-white transition">Our Services</button></li>
            <li><button onClick={() => onTabChange?.('doctors')} className="hover:text-white transition">Find a Doctor</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Consultation Hours</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><Clock size={16} className="text-blue-400" /> Mon - Sat: 8:30 AM - 7:30 PM</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone size={16} className="text-teal-400" /><span className="font-medium text-white">{CLINIC_INFO.phone}</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

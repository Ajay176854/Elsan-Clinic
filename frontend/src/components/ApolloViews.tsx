"use client";

import { useState, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, HeartPulse, CheckCircle2, ShieldAlert, Plane, Globe, Calculator, X, Upload, Clock, Pill, FileText } from 'lucide-react';
import { useSettings } from '../hooks';

export function HealthPackagesView({ onNavigate }: { onNavigate?: (v: string) => void }) {
  const features = [
    { title: "Prior Appointments", desc: "We recommend booking appointments in advance to minimize waiting times and ensure slot availability.", icon: Clock },
    { title: "In-House Pharmacy", desc: "Purchase quality prescribed medicines directly from our fully operational pharmacy counter.", icon: Pill },
    { title: "Digital Prescriptions", desc: "Receive automated digital prescription alerts on WhatsApp immediately after your consultation.", icon: FileText },
    { title: "Hygienic Care Standards", desc: "Rigorous daily disinfection protocols across all diagnostic and patient waiting areas.", icon: HeartPulse }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-slate-800">Clinic Guidelines & Facilities</h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">Everything you need to know for a smooth, comfortable, and safe experience at Elsan Clinic.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 flex items-start gap-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <Icon size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function EmergencyView() {
  const { settings } = useSettings();
  const phoneDisplay = settings?.phone || '94441 84977';
  const phoneRaw = settings?.phone?.replace(/\s/g, '') || '9444184977';
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div className="bg-red-600 text-white rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 bg-white/20 p-4 rounded-full">
          <ShieldAlert size={50} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <h1 className="text-2xl md:text-3xl font-black">URGENT CARE</h1>
          <p className="text-sm md:text-base text-red-100">Equipped for rapid response to acute illnesses, minor trauma, and immediate stabilizations.</p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a href={`tel:${phoneRaw}`} className="bg-white text-red-600 font-bold text-lg py-2.5 px-5 rounded-lg shadow-md hover:scale-105 transition flex items-center justify-center gap-2">
              <Phone size={18} /> CALL {phoneDisplay}
            </a>
            <button className="bg-red-800 text-white font-bold text-sm py-2.5 px-5 rounded-lg hover:bg-red-900 transition shadow-md">
              Ambulance Request
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 pt-6">
        {[
          { title: "First Aid & Minor Trauma", desc: "Wound care, suturing, and immediate stabilization." },
          { title: "Acute Asthma & Respiratory", desc: "Nebulization and oxygen support available." },
          { title: "Cardiac Monitoring", desc: "Immediate ECG and first-line medical management." }
        ].map((item, i) => (
          <div key={i} className="bg-red-50 border border-red-100 p-4 rounded-xl">
            <h3 className="font-bold text-red-900 text-sm mb-1.5">{item.title}</h3>
            <p className="text-xs text-red-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}



export function HealthLibraryView() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      setBmi(w / (h * h));
    } else {
      setBmi(null);
    }
  };

  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Normal weight', color: 'text-green-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">Health Library</h1>
        <p className="text-lg text-slate-600">Empower yourself with trusted medical knowledge.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Latest Medical Articles</h2>
          {[
            { title: "Understanding Type 2 Diabetes: Diet & Exercise", tag: "Endocrinology" },
            { title: "Top 5 Post-Pregnancy Exercises for Core Strength", tag: "Gynecology" },
            { title: "When should you worry about a headache?", tag: "Neurology" }
          ].map((blog, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group cursor-pointer">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 inline-block">{blog.tag}</span>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition mb-2">{blog.title}</h3>
              <p className="text-slate-500 text-sm">Read our experts' advice on managing your health better with practical, daily steps...</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-orange-600 mb-4">
              <Calculator size={24} />
              <h3 className="font-bold text-lg">BMI Calculator</h3>
            </div>
            <div className="space-y-4">
              <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 rounded-lg border outline-none" />
              <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 rounded-lg border outline-none" />
              <button onClick={calculateBMI} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">Calculate BMI</button>
              
              {bmi !== null && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-orange-100 text-center animate-in fade-in zoom-in duration-300">
                  <div className="text-sm text-slate-500 mb-1">Your BMI is</div>
                  <div className="text-3xl font-black text-slate-800 mb-1">{bmi.toFixed(1)}</div>
                  <div className={`font-bold ${getBMICategory(bmi).color}`}>{getBMICategory(bmi).label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

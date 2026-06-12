"use client";

import { useState, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, HeartPulse, CheckCircle2, ShieldAlert, Plane, Globe, Calculator, X, Upload } from 'lucide-react';
import { useSettings } from '../hooks';

export function HealthPackagesView({ onNavigate }: { onNavigate?: (v: string) => void }) {
  const packages = [
    {
      name: "Silver Checkup",
      price: "₹1,999",
      color: "border-slate-300",
      bg: "bg-slate-50",
      tests: ["Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Lipid Profile", "ECG", "General Physician Consult"]
    },
    {
      name: "Gold ProHealth",
      price: "₹3,999",
      color: "border-yellow-400",
      bg: "bg-yellow-50",
      popular: true,
      tests: ["All Silver Tests", "Thyroid Profile (T3, T4, TSH)", "Liver Function Test", "Kidney Function Test", "Chest X-Ray", "Cardiologist Consult"]
    },
    {
      name: "Platinum Executive",
      price: "₹7,999",
      color: "border-teal-500",
      bg: "bg-teal-50",
      tests: ["All Gold Tests", "Vitamin D & B12", "HbA1c", "Ultrasound Abdomen", "TMT / Echo", "Dietitian & Dental Consult"]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">ProHealth Packages</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Preventative health checks designed by experts to catch diseases before they become emergencies.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div key={i} className={`relative bg-white rounded-2xl border-2 ${pkg.color} p-8 shadow-lg flex flex-col`}>
            {pkg.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-4 py-1 rounded-full text-sm">Most Popular</div>}
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{pkg.name}</h3>
            <div className="text-4xl font-extrabold text-blue-900 mb-6">{pkg.price}</div>
            <ul className="space-y-4 mb-8 flex-1">
              {pkg.tests.map((test, j) => (
                <li key={j} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} /> {test}
                </li>
              ))}
            </ul>
            <button onClick={() => onNavigate?.('book')} className={`w-full py-3 rounded-xl font-bold transition shadow-md ${pkg.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
              Book Package
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function EmergencyView() {
  const { settings } = useSettings();
  const phoneDisplay = settings?.phone || '94441 84977';
  const phoneRaw = settings?.phone?.replace(/\s/g, '') || '9444184977';
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-8">
      <div className="bg-red-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 bg-white/20 p-6 rounded-full">
          <ShieldAlert size={80} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-black">URGENT CARE</h1>
          <p className="text-xl text-red-100">Equipped for rapid response to acute illnesses, minor trauma, and immediate stabilizations.</p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${phoneRaw}`} className="bg-white text-red-600 font-black text-2xl py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition flex items-center justify-center gap-3">
              <Phone /> CALL {phoneDisplay}
            </a>
            <button className="bg-red-800 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-red-900 transition shadow-lg">
              Ambulance Request
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 pt-8">
        {[
          { title: "First Aid & Minor Trauma", desc: "Wound care, suturing, and immediate stabilization." },
          { title: "Acute Asthma & Respiratory", desc: "Nebulization and oxygen support available." },
          { title: "Cardiac Monitoring", desc: "Immediate ECG and first-line medical management." }
        ].map((item, i) => (
          <div key={i} className="bg-red-50 border border-red-100 p-6 rounded-2xl">
            <h3 className="font-bold text-red-900 text-lg mb-2">{item.title}</h3>
            <p className="text-red-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function InternationalPatientsView() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', country: '', notes: '' });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a report file to upload');
    setIsSubmitting(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8009/api/v1';
      const data = new FormData();
      data.append('patient_name', formData.name);
      data.append('phone', formData.phone);
      if (formData.email) data.append('email', formData.email);
      if (formData.country) data.append('country', formData.country);
      if (formData.notes) data.append('notes', formData.notes);
      data.append('file', file);

      const res = await fetch(`${apiUrl}/medical_tourism/reports`, {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        alert("Thank you! Your medical reports have been securely uploaded. Our senior doctors will review your case and contact you within 24 hours.");
        setShowModal(false);
        setFormData({ name: '', phone: '', email: '', country: '', notes: '' });
        setFile(null);
      } else {
        alert("Failed to upload. Please try again or contact via WhatsApp.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full font-bold mb-4 flex items-center gap-2 w-max mx-auto"><Globe size={18}/> Medical Tourism</div>
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">Welcome to Elsan Clinic</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide end-to-end medical care, visa assistance, and luxury accommodation for our international guests.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: Plane, title: "Visa & Travel", desc: "Medical visa invitation letters and airport transfers." },
          { icon: Globe, title: "Translators", desc: "In-house interpreters for Arabic, French, Russian, and Bengali." },
          { icon: ShieldAlert, title: "Priority Care", desc: "Zero-wait times and dedicated relationship managers." },
          { icon: HeartPulse, title: "Accommodation", desc: "Tie-ups with premium hotels near the hospital." }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-6 border border-slate-200 rounded-2xl shadow-sm text-center">
            <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
              <feat.icon size={28} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{feat.title}</h3>
            <p className="text-sm text-slate-500">{feat.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-white gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Get a Free Cost Estimate</h2>
          <p className="text-slate-400">Share your medical reports and our senior doctors will review your case within 24 hours.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl transition whitespace-nowrap shadow-lg shadow-teal-500/30 active:scale-95 flex items-center gap-2"
        >
          <Upload size={20} /> Upload Reports
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div initial={{scale: 0.95}} animate={{scale: 1}} exit={{scale: 0.95}} className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Upload Medical Reports</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20} className="text-slate-500"/></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div><input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500" />
                </div>
                <div><input type="text" placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500" /></div>
                <div><textarea placeholder="Any specific notes or questions?" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 h-24 resize-none" /></div>
                <div>
                  <input required type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" accept=".pdf,.png,.jpg,.jpeg" />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl mt-4 transition disabled:opacity-50">
                  {isSubmitting ? "Uploading..." : "Submit Reports"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

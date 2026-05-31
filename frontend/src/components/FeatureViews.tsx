import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, MapPin, Phone, Clock, Calendar, ArrowRight, Activity, Beaker, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO, PROHEALTH_PACKAGES, DOCTORS } from '../data';
import { ViewState } from '../types';

export default function FeatureViews({ view, onNavigate }: { view: ViewState, onNavigate: (v: ViewState) => void }) {
  if (view === 'health-library') return <HealthLibraryView />;
  if (view === 'prohealth') return <ProHealthView onNavigate={onNavigate} />;
  if (view === 'nri') return <NRIView onNavigate={onNavigate} />;
  if (view === 'contact') return <ContactView />;
  if (view === 'book') return <BookingView />;
  
  return null;
}

function HealthLibraryView() {
  const categories = [
    {
      title: "Diabetes",
      articles: ["What is HbA1c and why does it matter?", "Meal planning for diabetic patients", "How to monitor blood sugar at home", "Diabetic foot care guide", "Understanding Type 1 vs Type 2 Diabetes"]
    },
    {
      title: "Hypertension",
      articles: ["Understanding blood pressure numbers", "DASH Diet for hypertension", "Lifestyle changes to lower BP", "When to seek emergency BP care"]
    },
    {
      title: "Paediatrics",
      articles: ["Vaccination schedule for children (0–18 years)", "Growth milestones – what to expect", "Common childhood illnesses explained", "Nutrition guide for babies and toddlers", "Fever management at home"]
    },
    {
      title: "Heart Health",
      articles: ["Warning signs of a heart attack", "Cholesterol – what the numbers mean", "Exercise guidelines for heart patients", "Cardiac medications explained"]
    },
    {
      title: "General Wellness",
      articles: ["Preventive health check-up schedule by age", "Healthy sleep habits", "Managing stress and mental wellbeing", "Hydration and immunity tips"]
    },
    {
      title: "Women's Health",
      articles: ["Managing PCOS naturally", "Anaemia: symptoms and treatment", "Thyroid health explained"]
    },
    {
      title: "Senior Health",
      articles: ["Managing multiple medications safely", "Fall prevention for seniors", "Arthritis management tips", "Cognitive health in older adults"]
    }
  ];

  const [activeSearch, setActiveSearch] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-lg text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-blue-200" />
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Elsan Health Library</h1>
        <p className="text-blue-100 max-w-2xl mx-auto mb-6">Expert medical information curated by our doctors for your family's health and wellness.</p>
        
        <div className="max-w-xl mx-auto bg-white rounded-full flex items-center overflow-hidden border-2 border-transparent focus-within:border-teal-400 p-1 shadow-inner">
          <input 
            type="text" 
            placeholder="Search health topics (e.g., 'diabetes' or 'fever')" 
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-slate-800"
          />
          <button className="bg-blue-600 hover:bg-blue-700 font-medium px-6 py-2 rounded-full transition">Search</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Activity size={18} className="text-teal-500" /> {cat.title}
            </h3>
            <ul className="space-y-3">
              {cat.articles.map((art, j) => (
                <li key={j}>
                  <button className="text-left text-sm text-slate-600 hover:text-blue-600 hover:underline transition">
                    • {art}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center">
        <h3 className="font-medium text-slate-800 mb-2">Have a specific health question?</h3>
        <p className="text-sm text-slate-500 mb-4">Ask our AI Receptionist or book a consultation with our doctors.</p>
        <a href={CLINIC_INFO.whatsapp} target="_blank" rel="noreferrer" className="inline-block bg-white border border-slate-300 hover:border-blue-400 text-slate-700 font-medium px-6 py-2 rounded-lg shadow-sm transition">
          Ask via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

function ProHealthView({ onNavigate }: { onNavigate: (v: ViewState) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full font-semibold text-sm mb-4 border border-blue-200">
          <Beaker size={16} /> Apollo-Style Preventive Care
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">Elsan ProHealth Programme</h1>
        <p className="text-xl text-teal-600 font-medium tracking-wide">Predict · Prevent · Overcome</p>
        <p className="text-slate-600">Inspired by 20+ years of preventive care, Elsan ProHealth is a personalised, structured health programme designed to identify risks early and keep your family healthy.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROHEALTH_PACKAGES.map((pkg, i) => (
          <div key={i} className={`bg-white rounded-2xl border flex flex-col relative overflow-hidden transition-all ${pkg.id === 'comp' ? 'border-teal-500 shadow-lg scale-105 z-10' : 'border-slate-200 shadow-sm hover:shadow-md'}`}>
            {pkg.id === 'comp' && <div className="bg-teal-500 text-white text-xs font-bold text-center py-1 uppercase tracking-wider">Most Recommended</div>}
            
            <div className={`p-6 border-b ${pkg.id === 'comp' ? 'bg-teal-50 border-teal-100' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{pkg.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-blue-900">{pkg.price}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <ul className="space-y-3 flex-1 mb-6">
                {pkg.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${pkg.id === 'comp' ? 'text-teal-500' : 'text-blue-500'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('book')} className={`w-full py-2.5 rounded-lg font-medium transition ${pkg.id === 'comp' ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md' : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'}`}>
                Book Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function NRIView({ onNavigate }: { onNavigate: (v: ViewState) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
         <h1 className="text-3xl md:text-5xl font-bold text-blue-900">International & NRI Patient Care</h1>
         <p className="text-lg text-slate-600 max-w-2xl mx-auto">Expert medical consultations for patients abroad and visiting NRIs.</p>
      </div>
      
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <p className="text-slate-700 leading-relaxed">
          Elsan Clinic welcomes patients from across the world and NRIs visiting Chennai who need trusted, expert medical care. We offer robust telemedicine solutions and dedicated in-clinic support.
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Online Consultations Available With:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">PM</div>
              <div>
                <p className="font-bold text-blue-900">Dr. E. Pandiya Meena</p>
                <p className="text-xs text-blue-700">Johns Hopkins fellowship • +91 7824051677</p>
              </div>
            </li>
            <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">ER</div>
              <div>
                <p className="font-bold text-blue-900">Dr. E. Ramyashree</p>
                <p className="text-xs text-teal-800">ACLS certified • +91 9962663033</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Services for International / NRI Patients:</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Telemedicine / Video Consultation",
              "Second Opinion on Diagnoses",
              "Chronic Disease Management (Diabetes, BP, Heart)",
              "Paediatric Consultations (RCPCH London trained)",
              "Prescription & Medical Report Review",
              "Referral to Apollo / Sundaram for procedures"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
           <a href={CLINIC_INFO.whatsapp} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition max-w-md mx-auto shadow-md">
              Contact us on WhatsApp
           </a>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">Contact & Location</h1>
        <p className="text-lg text-slate-600">We are here to help. Reach out to us for appointments or queries.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600"><MapPin size={24} /></div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Clinic Address</h3>
              <p className="text-slate-600">{CLINIC_INFO.address}</p>
              <p className="text-sm text-slate-500 mt-2 italic">Easily accessible from all parts of Chennai. Search "Elsan Public Health, Saidapet" on Google Maps.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="bg-teal-50 p-3 rounded-full text-teal-600"><Clock size={24} /></div>
            <div className="w-full">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Consultation Timings</h3>
              <table className="w-full text-sm text-slate-600">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Monday – Saturday (Morning)</td><td className="py-2 text-right">8:30 AM – 10:30 AM</td></tr>
                  <tr className="border-b border-slate-100"><td className="py-2 font-medium">Monday – Saturday (Evening)</td><td className="py-2 text-right">4:30 PM – 7:30 PM</td></tr>
                  <tr><td className="py-2 font-medium">Sunday (By Appointment)</td><td className="py-2 text-right">8:30 AM – 11:00 AM</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Phone Directory */}
        <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-lg space-y-6">
          <h3 className="font-bold text-2xl flex items-center gap-2"><Phone className="text-blue-300" /> Phone & WhatsApp</h3>
          
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <p className="text-blue-200 text-sm mb-1 uppercase tracking-wider font-semibold">General / WhatsApp Booking</p>
              <p className="text-2xl font-bold tracking-tight">{CLINIC_INFO.phone}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-blue-100">Dr. N. Elangeswaran</span>
                <span className="font-mono">{CLINIC_INFO.phone}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-blue-100">Dr. E. Pandiya Meena (Online)</span>
                <span className="font-mono">7824051677</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-blue-100">Dr. E. Ramyashree (Online)</span>
                <span className="font-mono">9962663033</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-blue-100">Dr. R. Sambath Kumar (Paeds)</span>
                <span className="font-mono">8220246025</span>
              </div>
            </div>
          </div>
          
          <a href={CLINIC_INFO.whatsapp} target="_blank" rel="noreferrer" className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition mt-6">
            Message on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function BookingView() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', date: '', session: '', doctor: '', service: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setStep(5);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const updateForm = (key: string, value: string) => setFormData({...formData, [key]: value});

  // Emergency Alert Component
  const showEmergencyAlert = formData.service.toLowerCase().includes('chest pain') || formData.service.toLowerCase().includes('breath') || formData.notes.toLowerCase().includes('emergency');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-900 flex items-center justify-center gap-2">
          <Calendar /> Book an Appointment
        </h1>
        <p className="text-slate-600">Please provide your details, and our team will confirm your slot via WhatsApp.</p>
      </div>

      {showEmergencyAlert && step < 5 && (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-bold">EMERGENCY ALERT</h3>
              <p className="text-red-700 text-sm mt-1">Please call 108 (Ambulance) immediately or rush to the nearest emergency hospital. You can also contact Elsan Clinic's emergency-trained physicians at 9444184977. Do NOT wait — seek emergency help NOW.</p>
            </div>
          </div>
        </motion.div>
      )}

      {step < 5 ? (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg">
          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-teal-500' : 'bg-slate-100'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Patient Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="e.g. Ravi Kumar" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input required type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="e.g. 9876543210" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Preferred Time</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date *</label>
                    <input required type="date" value={formData.date} onChange={e => updateForm('date', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Preferred Time Slot *</label>
                    <div className="space-y-2">
                      {['🌅 Morning: 8:30 AM – 10:30 AM', '🌆 Evening: 4:30 PM – 7:30 PM', '☀️ Sunday: 8:30 AM – 11:00 AM'].map(slot => (
                        <label key={slot} className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${formData.session === slot ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                          <input required type="radio" name="session" value={slot} checked={formData.session === slot} onChange={e => updateForm('session', e.target.value)} className="mr-3 text-teal-600 focus:ring-teal-500" />
                          <span className="text-sm font-medium text-slate-700">{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Select Doctor</h2>
                <div className="space-y-3">
                  {[
                    "1. Dr. N. Elangeswaran (Internal Medicine – In-Clinic)",
                    "2. Dr. E. Pandiya Meena (Internal Medicine – Online Only)",
                    "3. Dr. E. Ramyashree (Internal Medicine – Online Only)",
                    "4. Dr. R. Sambath Kumar (Paediatrics – In-Clinic)",
                    "5. Any Available Doctor"
                  ].map(doc => (
                    <label key={doc} className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${formData.doctor === doc ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <input required type="radio" name="doctor" value={doc} checked={formData.doctor === doc} onChange={e => updateForm('doctor', e.target.value)} className="mr-3 text-teal-600 focus:ring-teal-500" />
                      <span className="text-sm font-medium text-slate-700">{doc}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Visit Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit (Service needed) *</label>
                    <input required type="text" value={formData.service} onChange={e => updateForm('service', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="e.g. Fever for 2 days, Diabetes checkup" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Previous medical history (Optional)</label>
                    <textarea value={formData.notes} onChange={e => updateForm('notes', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="Any existing conditions or medications..." />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="pt-6 border-t border-slate-100 flex gap-3">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-slate-300 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition">
                  Back
                </button>
              )}
              <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-blue-400">
                {isSubmitting ? "Processing..." : (step === 4 ? "Confirm Booking" : "Continue")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-teal-500 p-6 text-center text-white">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 size={32} className="text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold">Appointment Requested!</h2>
            <p className="text-teal-50 mt-1">Our team will confirm your slot shortly.</p>
          </div>
          
          <div className="p-8 space-y-4 bg-slate-50">
            <div className="grid grid-cols-3 gap-2 text-sm border-b border-slate-200 pb-3">
              <span className="text-slate-500 col-span-1">Patient Name</span>
              <span className="font-semibold text-slate-800 col-span-2">{formData.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm border-b border-slate-200 pb-3">
              <span className="text-slate-500 col-span-1">Date & Time</span>
              <span className="font-semibold text-slate-800 col-span-2">{formData.date} • {formData.session.split(':')[0]}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm border-b border-slate-200 pb-3">
              <span className="text-slate-500 col-span-1">Doctor</span>
              <span className="font-semibold text-slate-800 col-span-2">{formData.doctor.split('(')[0]}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm pb-3">
              <span className="text-slate-500 col-span-1">Reason</span>
              <span className="font-semibold text-slate-800 col-span-2">{formData.service}</span>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-center text-sm text-blue-800">
              <p>We will send a confirmation message to <strong>{formData.phone}</strong> via WhatsApp.</p>
              <a href={CLINIC_INFO.whatsapp} target="_blank" rel="noreferrer" className="inline-block mt-3 text-blue-600 font-bold hover:underline">
                Message us on WhatsApp if urgent
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

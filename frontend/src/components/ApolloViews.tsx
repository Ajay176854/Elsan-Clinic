import { motion } from 'framer-motion';
import { Phone, HeartPulse, CheckCircle2, ShieldAlert, Plane, Globe, Calculator } from 'lucide-react';

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
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-8">
      <div className="bg-red-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 bg-white/20 p-6 rounded-full">
          <ShieldAlert size={80} className="text-white" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-black">24/7 EMERGENCY & TRAUMA</h1>
          <p className="text-xl text-red-100">State-of-the-art Level 1 Trauma Center equipped to handle cardiac arrests, strokes, and severe injuries immediately.</p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a href="tel:1066" className="bg-white text-red-600 font-black text-2xl py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition flex items-center justify-center gap-3">
              <Phone /> CALL 1066
            </a>
            <button className="bg-red-800 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-red-900 transition shadow-lg">
              Ambulance Request
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 pt-8">
        {[
          { title: "Advanced ACLS Ambulances", desc: "Equipped with ventilators and defibrillators." },
          { title: "Stroke Protocol", desc: "Thrombolysis administered within 60 minutes of arrival." },
          { title: "Cardiac Emergencies", desc: "24/7 Cath Lab ready for emergency angioplasties." }
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
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl transition whitespace-nowrap">
          Upload Reports
        </button>
      </div>
    </motion.div>
  );
}

export function HealthLibraryView() {
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
              <input type="number" placeholder="Weight (kg)" className="w-full p-3 rounded-lg border outline-none" />
              <input type="number" placeholder="Height (cm)" className="w-full p-3 rounded-lg border outline-none" />
              <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">Calculate BMI</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

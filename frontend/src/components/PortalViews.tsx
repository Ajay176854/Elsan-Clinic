import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User as UserIcon, ShieldCheck, Activity, Calendar, FileText, Pill, LogOut, Settings, Users, ArrowRight } from 'lucide-react';
import { MOCK_PATIENTS, ADMIN_USERS } from '../data';
import { ViewState, Patient, AdminUser } from '../types';

export default function PortalViews({ 
  view, 
  onNavigate, 
  currentUser, 
  setCurrentUser 
}: { 
  view: ViewState, 
  onNavigate: (v: ViewState) => void,
  currentUser: Patient | AdminUser | null,
  setCurrentUser: (u: Patient | AdminUser | null) => void
}) {
  
  if (currentUser) {
    if ('condition' in currentUser) {
      return <PatientDashboard patient={currentUser} onNavigate={onNavigate} onLogout={() => setCurrentUser(null)} />;
    } else {
      return <AdminDashboard admin={currentUser} onNavigate={onNavigate} onLogout={() => setCurrentUser(null)} />;
    }
  }

  // Login Forms
  if (view === 'doctor-portal') {
    return <DoctorLogin onLogin={(d) => { setCurrentUser(d); window.scrollTo(0, 0); }} onNavigate={onNavigate} />;
  }

  if (view === 'admin-portal') {
    return <AdminLogin onLogin={(a) => { setCurrentUser(a); window.scrollTo(0, 0); }} />;
  }

  return null;
}

function DoctorLogin({ onLogin, onNavigate }: { onLogin: (a: AdminUser) => void, onNavigate: (v: ViewState) => void }) {
  const [did, setDid] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const doctor = ADMIN_USERS.find(a => a.username === did && a.pass === pass && a.accessLevel === 'doctor');
    if (doctor) {
      setError(false);
      onLogin(doctor);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto my-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Lock className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Doctor Portal</h2>
          <p className="text-blue-100 text-sm mt-1">Access Elsan Clinic systems</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              ❌ Invalid Doctor ID or Password. Please try again.
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Doctor ID</label>
              <input required type="text" value={did} onChange={e => setDid(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="e.g. doctor_elan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input required type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="••••••••" />
            </div>
          </div>
          
          <div className="space-y-3 pt-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition">
              Login to Portal
            </button>
          </div>
        </form>
      </div>
      
      {/* Demo Credentials Helper */}
      <div className="mt-8 bg-blue-50 border border-blue-100 p-5 rounded-xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-3">Demo Credentials (For Testing)</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600">
           <div>doctor_elan</div><div>Dr.Elan@01</div>
           <div>doctor_meena</div><div>Dr.Meena@02</div>
           <div>doctor_ramya</div><div>Dr.Ramya@03</div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (a: AdminUser) => void }) {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin = ADMIN_USERS.find(a => a.username === uname && a.pass === pass);
    if (admin) {
      setError(false);
      onLogin(admin);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto my-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-800 p-6 text-center text-white">
          <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <ShieldCheck className="text-teal-400" size={28} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Portal</h2>
          <p className="text-slate-300 text-sm mt-1">Elsan Clinic Staff & Physicians</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              ❌ Access Denied. Invalid admin credentials. Contact IT support.
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input required type="text" value={uname} onChange={e => setUname(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="e.g. elsan_admin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input required type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition" placeholder="••••••••" />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-md transition pt-2">
            Staff Login
          </button>
        </form>
      </div>

      <div className="mt-8 bg-slate-100 border border-slate-200 p-5 rounded-xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Demo Admin Roles (Gemini 3.1)</h4>
        <div className="grid gap-2 text-xs font-mono text-slate-600">
           <div className="flex justify-between border-b pb-1"><span>elsan_admin</span><span>Admin@Elsan2026</span></div>
           <div className="flex justify-between border-b pb-1"><span>reception</span><span>Recep@Elsan123</span></div>
           <div className="flex justify-between border-b pb-1"><span>nurse_head</span><span>Nurse@Elsan01</span></div>
           <div className="flex justify-between border-b pb-1"><span>pharmacy_mgr</span><span>Pharma@Elsan01</span></div>
           <div className="flex justify-between"><span>doctor_elan</span><span>Dr.Elan@01</span></div>
        </div>
      </div>
    </motion.div>
  );
}

function PatientDashboard({ patient, onNavigate, onLogout }: { patient: Patient, onNavigate: (v: ViewState) => void, onLogout: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-6 md:p-10 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-medium border border-white/20 mb-2">
            <UserIcon size={14} /> Patient ID: {patient.id}
          </div>
          <h1 className="text-3xl font-bold">Welcome back, {patient.name}!</h1>
          <p className="text-blue-100 italic">Elsan Clinic Patient Portal</p>
        </div>
        <button onClick={onLogout} className="self-start md:self-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-white/20 flex items-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Primary Condition</p>
          <p className="font-bold text-slate-800 text-lg flex items-center gap-2"><Activity size={18} className="text-teal-500"/> {patient.condition}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Next Appointment</p>
          <p className="font-bold text-slate-800 text-lg flex items-center gap-2"><Calendar size={18} className="text-blue-500"/> {patient.nextAppt}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Last Prescription</p>
          <p className="font-bold text-slate-800 text-lg flex items-center gap-2"><Pill size={18} className="text-green-500"/> {patient.lastRx}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Last Visit Date</p>
          <p className="font-bold text-slate-800 text-lg flex items-center gap-2"><FileText size={18} className="text-indigo-500"/> {patient.lastVisit}</p>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 p-5 rounded-xl flex gap-4 items-start shadow-sm animate-fade-in">
        <div className="bg-white p-2 rounded-lg text-teal-600 shadow-sm shrink-0 mt-1">
          <Activity size={24} />
        </div>
        <div>
          <h4 className="text-teal-800 font-bold text-sm tracking-wide uppercase mb-1">🤖 AI Health Insight For You</h4>
          <p className="text-slate-700 text-sm leading-relaxed">
            Based on your records for <span className="font-semibold">{patient.condition}</span>, ELSAN AI suggests close monitoring of your metrics. Please ensure you take <span className="font-semibold">{patient.lastRx}</span> directly as prescribed. Avoid missed doses and book your follow up before <span className="font-semibold">{patient.nextAppt}</span>.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 p-4 border-b border-slate-100 font-bold text-slate-800 tracking-wide">
          WHAT WOULD YOU LIKE TO DO?
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-slate-100">
          {[
            { label: 'Book / Reschedule Appointment', icon: Calendar, action: () => onNavigate('book') },
            { label: 'View My Medical History', icon: FileText, action: () => alert("Medical history is currently being synced.") },
            { label: 'View My Prescriptions', icon: Pill, action: () => alert(`Current Action: ${patient.lastRx}`) },
            { label: 'Explain My Test Reports (AI Interpreter)', icon: Activity, action: () => onNavigate('ai-tools') },
            { label: 'AI Health Risk Score', icon: Activity, action: () => onNavigate('ai-tools') },
            { label: 'AI Personalised Diet Plan', icon: FileText, action: () => onNavigate('ai-tools') },
            { label: 'Contact the Clinic', icon: ArrowRight, action: () => onNavigate('contact') },
            { label: 'Condition Specific Library', icon: FileText, action: () => onNavigate('health-library'), highlight: true },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={item.action}
              className={`flex items-center gap-4 p-5 text-left transition ${item.highlight ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-l-4 border-blue-500' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
            >
              <div className={`p-2 rounded-lg ${item.highlight ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                <item.icon size={20} />
              </div>
              <span className="font-medium">{i + 1}. {item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AdminDashboard({ admin, onLogout }: { admin: AdminUser, onNavigate: (v: ViewState) => void, onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const isSuper = admin.accessLevel === 'super_admin' || admin.accessLevel === 'director'; // L3: Admin / Dean
  const isDoc = admin.accessLevel === 'doctor'; // L2: Doctors
  const isStaff = ['reception', 'nurse', 'pharmacy', 'analyst'].includes(admin.accessLevel); // L1: Staff
  
  const roleBadge = isSuper ? 'L3: Admin / Dean' : isDoc ? 'L2: Doctor' : 'L1: Staff';

  const menuItems = isSuper ? [
    "Create Staff / Doctor Accounts (L1/L2)", "Patient Database (View Clients)", "System Analytics Dashboard", "Revenue & Reports"
  ] : isDoc ? [
    "Today's Schedule", "My Patient Records", "Write Prescription", "AI Diagnosis Assistant"
  ] : [
    "Front Desk Queue", "Register Patient", "Process Prescriptions", "Vitals & Triage"
  ];

  const handleActionClick = (item: string) => {
    if (item === "Create Staff / Doctor Accounts (L1/L2)") setActiveTab('create-user');
    else if (item === "Patient Database (View Clients)") setActiveTab('view-clients');
    else alert(`Feature: ${item} (Under Construction)`);
  };

  if (activeTab === 'create-user' && isSuper) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Create New Account (L1/L2)</h2>
            <p className="text-sm text-slate-500">Only L3 Admins can create L2 (Doctors) and L1 (Staff) accounts.</p>
          </div>
          <button onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200">Back to Dashboard</button>
        </div>
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          <form className="space-y-4 max-w-lg" onSubmit={e => { e.preventDefault(); alert("Account successfully created in the system."); setActiveTab('dashboard'); }}>
            <div>
              <label className="block text-sm font-bold mb-1">Hierarchy Level</label>
              <select className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none">
                <option value="doctor">L2: Doctor</option>
                <option value="reception">L1: Reception Staff</option>
                <option value="nurse">L1: Nurse</option>
                <option value="pharmacy">L1: Pharmacist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Full Name</label>
              <input type="text" required className="w-full p-3 border rounded-lg outline-none" placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Username (ID)</label>
              <input type="text" required className="w-full p-3 border rounded-lg outline-none" placeholder="e.g. staff_01" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Temporary Password</label>
              <input type="password" required className="w-full p-3 border rounded-lg outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 mt-4">Create Account</button>
          </form>
        </div>
      </motion.div>
    );
  }

  if (activeTab === 'view-clients' && isSuper) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Patient Database (View Clients)</h2>
            <p className="text-sm text-slate-500">L3 Admin Access: Full visibility into the clinic's patient registry.</p>
          </div>
          <button onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-slate-100 rounded-lg font-bold text-slate-600 hover:bg-slate-200">Back to Dashboard</button>
        </div>
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 font-bold text-slate-600">Patient ID</th>
                <th className="p-4 font-bold text-slate-600">Name</th>
                <th className="p-4 font-bold text-slate-600">Condition</th>
                <th className="p-4 font-bold text-slate-600">Last Visit</th>
                <th className="p-4 font-bold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_PATIENTS.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-medium text-blue-600">{p.id}</td>
                  <td className="p-4 font-bold">{p.name} <span className="text-xs text-slate-400 font-normal ml-2">{p.age} yrs</span></td>
                  <td className="p-4">{p.condition}</td>
                  <td className="p-4">{p.lastVisit}</td>
                  <td className="p-4"><button className="text-blue-600 hover:underline font-medium">View File</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="bg-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20 mb-2 shadow-inner">
            <ShieldCheck size={14} className={isSuper ? "text-yellow-400" : isDoc ? "text-blue-400" : "text-teal-400"} /> 
            {roleBadge} — {admin.roleTitle}
          </div>
          <h1 className="text-2xl font-bold">Elsan Clinic System Portal</h1>
        </div>
        <button onClick={onLogout} className="self-start md:self-center bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow opacity-90 hover:opacity-100">
          <LogOut size={16} /> Secure Logout
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
          <Activity size={18} className="text-teal-600"/> 
          Hierarchy Context & Overview
        </h3>
        
        {isSuper && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900">
                <p className="text-xs font-bold uppercase mb-1">L3 Access</p>
                <p className="text-sm">Full administrative rights. Can create staff & view clients.</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-800">
                <p className="text-xs font-bold uppercase mb-1">Total L2 Doctors</p>
                <p className="text-2xl font-black">4</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-800">
                <p className="text-xs font-bold uppercase mb-1">Total L1 Staff</p>
                <p className="text-2xl font-black">8</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-800">
                <p className="text-xs font-bold uppercase mb-1">Registered Clients</p>
                <p className="text-2xl font-black">12,450</p>
             </div>
          </div>
        )}

        {isDoc && (
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
             <p className="font-bold text-blue-900 text-sm mb-1">L2 (Doctor) Access Level</p>
             <p className="text-sm text-blue-800">You have clearance to manage your patients and prescriptions.</p>
          </div>
        )}

        {isStaff && (
          <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg">
             <p className="font-bold text-teal-900 text-sm mb-1">L1 (Staff) Access Level</p>
             <p className="text-sm text-teal-800">You have clearance for daily clinic operations and patient flow.</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 p-4 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
          <Settings size={18} className="text-slate-500" /> ACTIONS MENU
        </div>
        <div className="divide-y divide-slate-100">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleActionClick(item)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 transition text-slate-700"
            >
              <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="font-bold text-sm md:text-base">{item}</span>
              <ArrowRight className="ml-auto text-slate-400" size={16} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

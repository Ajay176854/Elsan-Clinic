import React, { useState } from 'react';
import { Stethoscope, Clock, ShieldAlert, FileText, ActivitySquare, ChevronRight, User, Pill, MapPin, Phone, BrainCircuit } from 'lucide-react';
import { CLINIC_INFO } from './data';
import { ViewState, Patient, AdminUser } from './types';
import PublicViews from './components/PublicViews';
import PortalViews from './components/PortalViews';
import FeatureViews from './components/FeatureViews';
import AIToolsView from './components/AIToolsView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [currentUser, setCurrentUser] = useState<Patient | AdminUser | null>(null);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    alert("You have been logged out successfully. Thank you for visiting Elsan Clinic!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Top Banner */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 px-4 flex justify-between items-center z-50 sticky top-0">
        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline font-semibold">🚑 Emergency? Call 108 or {CLINIC_INFO.phone}</span>
          <span className="sm:hidden font-semibold">🚑 Call 108 or {CLINIC_INFO.phone}</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => handleNavigate('doctor-portal')} className="hover:text-blue-200 transition">Doctor Login</button>
          <button onClick={() => handleNavigate('admin-portal')} className="hover:text-blue-200 transition hidden sm:inline">Staff Login</button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-8 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center border-b border-slate-100">
          <div 
            className="flex items-center gap-3 cursor-pointer py-4 px-4" 
            onClick={() => handleNavigate('home')}
          >
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-sm flex-shrink-0">
              <Stethoscope size={28} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">Elsan Clinic</h1>
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Powered by Gemini AI</p>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-[15px] font-semibold text-slate-700">
            <button onClick={() => handleNavigate('home')} className={`hover:text-blue-600 transition tracking-wide ${currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>Home</button>
            <button onClick={() => handleNavigate('services')} className={`hover:text-blue-600 transition tracking-wide ${currentView === 'services' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>Treatments</button>
            <button onClick={() => handleNavigate('doctors')} className={`hover:text-blue-600 transition tracking-wide ${currentView === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>Doctors</button>
            <button onClick={() => handleNavigate('prohealth')} className={`hover:text-blue-600 transition tracking-wide ${currentView === 'prohealth' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>ProHealth</button>
            <button onClick={() => handleNavigate('ai-tools')} className={`flex items-center gap-1 hover:text-teal-600 transition tracking-wide ${currentView === 'ai-tools' ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : ''}`}><BrainCircuit size={16}/> AI Tools</button>
            <button onClick={() => handleNavigate('nri')} className={`hover:text-blue-600 transition tracking-wide ${currentView === 'nri' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''}`}>International Care</button>
          </div>
          
          <div className="flex items-center gap-3 px-4">
            {currentUser && (
              <button 
                onClick={handleLogout}
                className="hidden md:block px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
            <button 
              onClick={() => handleNavigate('book')}
              className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition shadow-sm"
            >
              Book Appt
            </button>
          </div>
        </div>
        {/* Mobile Navigation Row */}
        <div className="flex xl:hidden overflow-x-auto gap-4 px-4 py-3 bg-slate-50 border-t border-slate-100 text-sm font-medium text-slate-600 scrollbar-hide">
          <button onClick={() => handleNavigate('ai-tools')} className="whitespace-nowrap flex items-center gap-1 text-teal-600 font-bold"><BrainCircuit size={16}/> AI Tools</button>
          <button onClick={() => handleNavigate('home')} className="whitespace-nowrap">Home</button>
          <button onClick={() => handleNavigate('about')} className="whitespace-nowrap">About</button>
          <button onClick={() => handleNavigate('services')} className="whitespace-nowrap">Services</button>
          <button onClick={() => handleNavigate('doctors')} className="whitespace-nowrap">Doctors</button>
          <button onClick={() => handleNavigate('health-library')} className="whitespace-nowrap">Library</button>
          <button onClick={() => handleNavigate('prohealth')} className="whitespace-nowrap">ProHealth</button>
          {currentUser && <button onClick={handleLogout} className="whitespace-nowrap text-red-600">Logout</button>}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {(currentView === 'home' || currentView === 'about' || currentView === 'services' || currentView === 'doctors') && (
          <PublicViews view={currentView} onNavigate={handleNavigate} />
        )}
        
        {currentView === 'ai-tools' && (
          <AIToolsView onNavigate={handleNavigate} />
        )}
        
        {(currentView === 'doctor-portal' || currentView === 'admin-portal') && (
          <PortalViews 
            view={currentView} 
            onNavigate={handleNavigate} 
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}

        {(currentView === 'health-library' || currentView === 'contact' || currentView === 'prohealth' || currentView === 'nri' || currentView === 'book') && (
          <FeatureViews view={currentView} onNavigate={handleNavigate} />
        )}
      </main>


      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Stethoscope size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Elsan Clinic</h2>
            </div>
            <p className="text-sm">Part of Elsan Foundation.<br/>{CLINIC_INFO.tagline}</p>
            <div className="flex items-start gap-2 pt-2">
              <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
              <p className="text-sm">{CLINIC_INFO.address}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigate('about')} className="hover:text-white transition">About Us</button></li>
              <li><button onClick={() => handleNavigate('services')} className="hover:text-white transition">Our Services</button></li>
              <li><button onClick={() => handleNavigate('doctors')} className="hover:text-white transition">Find a Doctor</button></li>
              <li><button onClick={() => handleNavigate('nri')} className="hover:text-white transition">International / NRI Care</button></li>
              <li><button onClick={() => handleNavigate('health-library')} className="hover:text-white transition">Health Library</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Consultation Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock size={16} className="text-blue-400" /> Mon - Sat: 8:30 AM - 10:30 AM</li>
              <li className="flex gap-2"><Clock size={16} className="text-blue-400" /> Mon - Sat: 4:30 PM - 7:30 PM</li>
              <li className="flex gap-2"><Clock size={16} className="text-blue-400" /> Sunday: 8:30 AM - 11:00 AM</li>
              <li className="text-blue-400 italic pt-2">Appointments recommended on Sundays</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-400" />
                <span className="font-medium text-white">{CLINIC_INFO.phone}</span>
              </li>
              <li>
                <a href={CLINIC_INFO.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition w-full justify-center mt-2">
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="pt-4 text-xs text-slate-500">
                <button onClick={() => handleNavigate('admin-portal')} className="hover:text-white">Admin Staff Portal</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Elsan Clinic. All rights reserved. 
        </div>
      </footer>
    </div>
  );
}

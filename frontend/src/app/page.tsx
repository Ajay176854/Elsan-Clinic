"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Clock, FileText, User, Pill, Phone, BrainCircuit, Activity, HeartPulse, Users, Calendar, Star, Building2, BookOpen, Ambulance, Globe, ChevronRight, ChevronDown, CheckCircle2, MapPin, Menu, X as XIcon, Quote, Shield, ArrowRight, Bot } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { CLINIC_INFO, SERVICES } from '../data';
import Link from 'next/link';
import { DoctorsView, ServicesView, ContactView, BookView } from '../components/PublicViews';
import { HealthPackagesView, EmergencyView, InternationalPatientsView, HealthLibraryView } from '../components/ApolloViews';
import AIToolsView from '../components/AIToolsView';
import { AuroraBackground } from '@/components/ui/aurora-background';
import HeroWidgets from '@/components/HeroWidgets';
import FloatingContact from '@/components/FloatingContact';

function HeroVideoCarousel({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      videoUrl: "/video3.mp4?v=3",
      posterUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=2000&q=80",
      title: "Advanced Medical Technology",
      subtitle: "Equipped with state-of-the-art facilities for precise diagnostics and treatment."
    },
    {
      videoUrl: "/video2.mp4?v=3",
      posterUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=2000&q=80",
      title: "Compassionate Healthcare",
      subtitle: "Our dedicated team provides personalized care for your faster recovery."
    },
    {
      videoUrl: "/video1.mp4?v=3",
      posterUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=2000&q=80",
      title: "Expert Care for Every Family",
      subtitle: "Serving over 10,000 families in Chennai for more than 20 years. Intelligently delivered by ELSAN AI."
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentSlide) {
        // Play the active video
        video.play().catch(() => {});
      } else {
        // Pause inactive videos after the fade transition completes (1000ms)
        setTimeout(() => {
           video.pause();
        }, 1000);
      }
    });
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden w-full" style={{ height: 'calc(100vh - 68px)' }}>
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 bg-slate-900 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
          <video 
            ref={el => { videoRefs.current[index] = el; }}
            src={slide.videoUrl} 
            poster={slide.posterUrl} 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 text-white z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white/90 text-xs font-semibold mb-6 w-max">
          <Shield size={14} className="text-teal-300" /> Trusted by 10,000+ Families · Est. 20+ Years
        </div>

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-4 tracking-tight drop-shadow-md">{slides[currentSlide].title}</h1>
          <p className="text-blue-50 text-lg md:text-xl font-sans font-light mb-8 drop-shadow max-w-2xl">{slides[currentSlide].subtitle}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button onClick={() => setActiveTab('book')} className="bg-orange-500 hover:bg-orange-400 text-white font-semibold flex items-center justify-center gap-2 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-base">
            <Calendar size={20} />
            Book Appointment
          </button>
          <button onClick={() => {
            const text = "Hi Elsan Clinic, could you please provide your clinic address and contact details?\n\nAlso, I would like to book an appointment. Here are my details:\n\n*Name:*\n*Age:*\n*Phone:*\n*Doctor Preference:*\n*Preferred Date & Time:*\n*Symptoms/Notes:*";
            window.open(`${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
          }} className="bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold flex items-center justify-center gap-2 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-base">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp Us
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))} className="bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center gap-2 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-base">
            <Bot size={20} />
            Elsan AI Assistant
          </button>
        </div>

        <div className="flex gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-orange-400 w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40">
        <ChevronDown size={28} />
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AuroraBackground className="min-h-screen min-w-full flex flex-col justify-start items-stretch font-sans text-slate-800" showRadialGradient={true}>
      {/* Apollo-Style Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[68px] px-4 relative">
          {/* Left Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 z-10">
            <div className="flex-shrink-0 w-11 h-11 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Elsan Clinic Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Elsan Clinic</h1>
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Trusted Healthcare</p>
            </div>
          </button>

          {/* Center Nav Items */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
            {/* Medical Services Dropdown */}
            <div className="relative group">
              <button onClick={() => setActiveTab('treatments')} className="flex items-center gap-1 px-4 py-2 text-[13px] font-bold text-slate-700 uppercase tracking-wider hover:text-blue-600 transition">
                Medical Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-[520px] bg-white rounded-b-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6 grid grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Specialties</h4>
                  {['Internal Medicine', 'Diabetes Management', 'Hypertension Care', 'Paediatrics', 'Geriatric Medicine'].map(s => (
                    <button key={s} onClick={() => setActiveTab('treatments')} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition font-medium">{s}</button>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Programs</h4>
                  {['Emergency Care', 'Infectious Diseases', 'Immunisation Clinic', 'Critical Care', 'In-Clinic Pharmacy'].map(s => (
                    <button key={s} onClick={() => setActiveTab('treatments')} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition font-medium">{s}</button>
                  ))}
                </div>
                <div className="col-span-2 mt-2 pt-3 border-t border-slate-100">
                  <button onClick={() => setActiveTab('treatments')} className="text-sm text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1">View All Specialties <ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            {/* Find a Doctor */}
            <button onClick={() => setActiveTab('doctors')} className="px-4 py-2 text-[13px] font-bold text-slate-700 uppercase tracking-wider hover:text-blue-600 transition">
              Find Doctor
            </button>

            {/* Health Library Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-bold text-slate-700 uppercase tracking-wider hover:text-blue-600 transition">
                Health Library <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-[280px] bg-white rounded-b-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                {[
                  { label: 'AI Symptom Checker', tab: 'aitools' },
                  { label: 'ProHealth Packages', tab: 'prohealth' },
                  { label: 'Health Library', tab: 'library' },
                  { label: 'International Patients', tab: 'nri' },
                ].map(item => (
                  <button key={item.tab} onClick={() => setActiveTab(item.tab)} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition font-medium">{item.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 z-10">
            <button onClick={() => setActiveTab('book')} className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 active:scale-95 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
              <Calendar size={16} /> Book Appt
            </button>
            <a href="tel:9444184977" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition" aria-label="Call us">
              <Phone size={18} />
            </a>
            <div className="hidden md:block w-px h-5 bg-slate-200"></div>
            <Link href="/login" className="hidden md:inline text-xs font-bold text-slate-500 hover:text-blue-600 transition uppercase tracking-wider">
              Staff Login
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition" aria-label="Toggle menu">
              {mobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden border-t border-slate-100 bg-white">
              <div className="flex flex-col p-4 gap-1">
                {[
                  { label: 'Home', tab: 'home' },
                  { label: 'Medical Services', tab: 'treatments' },
                  { label: 'Find a Doctor', tab: 'doctors' },
                  { label: 'AI Symptom Checker', tab: 'aitools' },
                  { label: 'ProHealth Packages', tab: 'prohealth' },
                  { label: 'Emergency', tab: 'emergency' },
                  { label: 'Contact', tab: 'contact' },
                ].map(item => (
                  <button key={item.tab} onClick={() => { setActiveTab(item.tab); setMobileMenuOpen(false); }} className={`text-left px-4 py-3 rounded-lg font-semibold text-sm ${activeTab === item.tab ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}>{item.label}</button>
                ))}
                <Link href="/login" className="px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">Staff Login</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Full-Width Hero - Outside main for edge-to-edge */}
      {activeTab === 'home' && <HeroVideoCarousel setActiveTab={setActiveTab} />}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">

            {/* Quick Access Bar (Moved below Hero) */}
            <section className="max-w-6xl mx-auto -mt-4">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-3 md:p-4">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
                  {[
                    { title: 'Book Appointment', icon: Calendar, tab: 'book', color: 'bg-orange-500 text-white' },
                    { title: 'Find a Doctor', icon: User, tab: 'doctors', color: 'bg-blue-500 text-white' },
                    { title: 'AI Symptom Checker', icon: BrainCircuit, tab: 'aitools', color: 'bg-teal-500 text-white' },
                    { title: 'ProHealth Check', icon: HeartPulse, tab: 'prohealth', color: 'bg-rose-500 text-white' },
                    { title: 'Emergency', icon: Ambulance, tab: 'emergency', color: 'bg-red-600 text-white' },
                    { title: 'International', icon: Globe, tab: 'nri', color: 'bg-indigo-500 text-white' },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(item.tab)}
                      className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl text-center transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95 group"
                    >
                      <div className={`mb-2 p-2.5 rounded-xl ${item.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                        <item.icon size={20} />
                      </div>
                      <span className="font-sans font-semibold text-[11px] md:text-xs text-slate-700 leading-tight">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto pt-4">
              {[
                { label: 'of Service', value: '20+ Years', icon: Star },
                { label: 'Families Served', value: '10,000+', icon: Users },
                { label: 'Online Telemedicine', value: '24/7', icon: Stethoscope },
                { label: 'Patient Satisfaction', value: '98%', icon: HeartPulse },
              ].map((stat, i) => (
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }} key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default">
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </section>

            {/* Patient Testimonials */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 pt-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-100 mb-4">Patient Stories</div>
                <h2 className="text-3xl font-serif font-medium text-blue-900 mb-2">What Our Patients Say</h2>
                <p className="text-slate-600 font-sans font-light max-w-2xl mx-auto">Real experiences from families who trust Elsan Clinic with their healthcare.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Ravi K.', condition: 'Diabetes Care', rating: 5, text: 'Dr. Elangeswaran has been managing my diabetes for 8 years. My HbA1c dropped from 9.2 to 6.4. The personalised diet plans and regular follow-ups make all the difference.' },
                  { name: 'Priya S.', condition: 'Paediatrics', rating: 5, text: 'Dr. Sambath Kumar is incredibly gentle with children. My son actually looks forward to his check-ups! The vaccination tracking system is very convenient for busy parents.' },
                  { name: 'Anand V.', condition: 'Cardiac Care', rating: 5, text: 'After my cardiac episode, the team at Elsan provided exceptional post-MI care. The 24/7 emergency support gave my family real peace of mind during recovery.' },
                ].map((t, i) => (
                  <motion.div key={i} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                    <Quote size={24} className="text-blue-200 mb-3" />
                    <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                        <p className="text-xs text-blue-600 font-medium">{t.condition}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, si) => <Star key={si} size={14} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Intelligent Care Section */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 py-16">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">
                    Why Choose Us
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 leading-tight">
                    Healthcare You Can <em className="text-teal-600 not-italic">Trust</em>
                  </h2>
                  <p className="text-slate-600 text-lg font-sans font-light leading-relaxed">
                    We combine world-class medical expertise with genuine care for each patient — because your wellbeing is more than just a diagnosis.
                  </p>
                  
                  <div className="space-y-6 pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <User className="text-teal-600" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Experienced & Certified Specialists</h4>
                        <p className="text-slate-600 text-sm font-light leading-relaxed">Our team includes 12+ board-certified doctors with advanced training across multiple specialties, ensuring expert care at every visit.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Building2 className="text-teal-600" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Modern, Hygienic Facilities</h4>
                        <p className="text-slate-600 text-sm font-light leading-relaxed">Our clinic is equipped with cutting-edge diagnostic tools, sterile treatment areas, and a comfortable patient-first environment.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                        <Clock className="text-teal-600" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-1">Flexible Hours & Emergency Care</h4>
                        <p className="text-slate-600 text-sm font-light leading-relaxed">Open 7 days a week with extended evening hours. 24/7 emergency support available with on-call physician coverage.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                   <HeroWidgets />
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-teal-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Predict • Prevent • Overcome
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">Elsan ProHealth</h2>
                <p className="text-blue-100 max-w-xl text-lg font-sans font-light">India's most powerful preventive health management program. AI-assisted personalized health risk assessments mapped to your exact clinical profile.</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-slate-800 shrink-0 w-full md:w-80 shadow-2xl">
                <h3 className="font-bold text-xl mb-4 border-b pb-2">Book a Health Check</h3>
                <button onClick={() => setActiveTab('prohealth')} className="w-full inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl">
                  Explore Packages
                </button>
              </div>
            </section>

            {/* Centres of Clinical Excellence */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-medium text-blue-900 mb-2 border-l-4 border-blue-600 pl-3">Centres of Clinical Excellence</h2>
                  <p className="text-slate-600 font-sans font-light pl-4 max-w-2xl">World-class specialized care across multiple medical disciplines, driven by research and technology.</p>
                </div>
                <button onClick={() => setActiveTab('treatments')} className="hidden md:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold">
                  View All Specialties <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {SERVICES.slice(0, 8).map((srv: any, i: number) => {
                  const ICON_MAP: Record<string, any> = { HeartPulse, Users, Activity, Stethoscope, Pill, Baby: Users, Microscope: Activity, Ambulance, ClipboardList: FileText, PersonStanding: User, Syringe: Activity, BedDouble: Activity };
                  const Icon = ICON_MAP[srv.iconName] || Activity;
                  const COLORS = [
                    { bg: 'bg-blue-50/60', border: 'border-blue-100', iconBg: 'bg-blue-100', iconText: 'text-blue-600', hoverFrom: 'from-blue-500', hoverTo: 'to-indigo-600', shadow: 'hover:shadow-blue-500/20' },
                    { bg: 'bg-teal-50/60', border: 'border-teal-100', iconBg: 'bg-teal-100', iconText: 'text-teal-600', hoverFrom: 'from-teal-400', hoverTo: 'to-emerald-500', shadow: 'hover:shadow-teal-500/20' },
                    { bg: 'bg-orange-50/60', border: 'border-orange-100', iconBg: 'bg-orange-100', iconText: 'text-orange-600', hoverFrom: 'from-orange-400', hoverTo: 'to-rose-500', shadow: 'hover:shadow-orange-500/20' },
                    { bg: 'bg-purple-50/60', border: 'border-purple-100', iconBg: 'bg-purple-100', iconText: 'text-purple-600', hoverFrom: 'from-purple-500', hoverTo: 'to-fuchsia-600', shadow: 'hover:shadow-purple-500/20' },
                  ];
                  const theme = COLORS[i % COLORS.length];

                  return (
                    <button 
                      key={i} 
                      onClick={() => setActiveTab('treatments')} 
                      className={`relative overflow-hidden text-left ${theme.bg} border ${theme.border} rounded-3xl p-6 hover:shadow-xl ${theme.shadow} hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full`}
                    >
                      {/* Subtle light orb */}
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/60 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                      <div className="relative z-10 flex flex-col h-full w-full">
                        <div className={`w-14 h-14 ${theme.iconBg} ${theme.iconText} rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:${theme.hoverFrom} group-hover:${theme.hoverTo} group-hover:text-white transition-all duration-500`}>
                          <Icon size={26} className="transition-transform duration-500 group-hover:-rotate-6" />
                        </div>
                        
                        <h3 className="font-bold text-slate-800 text-[17px] mb-2 group-hover:text-slate-900 transition-colors duration-300 line-clamp-1">{srv.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-2 flex-1">{srv.description}</p>
                        
                        <div className={`mt-5 flex items-center ${theme.iconText} text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out`}>
                          Explore <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Top Doctors / Medical Experts */}
            <section className="bg-slate-100 py-16 mt-16 px-4 xl:px-0 rounded-3xl max-w-[95%] mx-auto shadow-inner">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Our Medical Experts</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">Highly qualified specialists with decades of experience in complex medical procedures.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { name: "Dr. N. Elangeswaran", spec: "Senior Consultant - Internal Medicine", exp: "20+ Years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80", tags: ['Diabetes', 'Cardiology', 'Geriatrics'] },
                    { name: "Dr. E. Pandiya Meena", spec: "Consultant - Internal Medicine (Online)", exp: "15+ Years", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80", tags: ['Cardiac Care', 'Telemedicine', 'Endocrinology'] },
                    { name: "Dr. R. Sambath Kumar", spec: "Chief Consultant Paediatrician", exp: "18+ Years", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80", tags: ['Paediatrics', 'Vaccinations', 'Nutrition'] }
                  ].map((doc, i) => {
                    const COLORS = [
                      { bg: 'bg-blue-50/60', border: 'border-blue-100', iconBg: 'bg-blue-100', iconText: 'text-blue-600', shadow: 'hover:shadow-blue-500/20' },
                      { bg: 'bg-teal-50/60', border: 'border-teal-100', iconBg: 'bg-teal-100', iconText: 'text-teal-600', shadow: 'hover:shadow-teal-500/20' },
                      { bg: 'bg-orange-50/60', border: 'border-orange-100', iconBg: 'bg-orange-100', iconText: 'text-orange-600', shadow: 'hover:shadow-orange-500/20' },
                    ];
                    const theme = COLORS[i % COLORS.length];

                    return (
                      <div key={i} className={`relative bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl ${theme.shadow} transition-all duration-500 border border-slate-100 flex flex-col group hover:-translate-y-2`}>
                        {/* Top Colored Section */}
                        <div className={`relative pt-8 pb-6 px-6 ${theme.bg} flex flex-col items-center text-center overflow-hidden border-b ${theme.border}`}>
                          {/* Subtle light orb matching the wedges */}
                          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/60 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                          
                          {/* Circular Avatar */}
                          <div className="relative w-28 h-28 mb-5 z-10">
                            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top rounded-full border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute bottom-1 right-1 bg-green-500 text-white text-[10px] font-bold p-1.5 rounded-full flex items-center shadow-md border-2 border-white">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            </div>
                          </div>
                          
                          <div className="relative z-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">{doc.name}</h3>
                            <p className={`${theme.iconText} font-semibold text-sm`}>{doc.spec}</p>
                          </div>
                        </div>

                        {/* Bottom Information Section */}
                        <div className="p-6 flex flex-col flex-1 bg-white relative z-20">
                          <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {doc.tags.map((tag, ti) => (
                              <span key={ti} className="bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{tag}</span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-slate-500 text-sm border-t border-slate-100 pt-5 mt-auto">
                            <span className={`flex items-center gap-1.5 font-medium ${theme.iconBg} ${theme.iconText} px-3 py-1.5 rounded-lg`}><Clock size={16} /> {doc.exp}</span>
                            <button onClick={() => setActiveTab('book')} className={`text-slate-600 font-bold hover:${theme.iconText} transition flex items-center gap-1 text-sm group/btn`}>
                              Book Now <ArrowRight size={16} className={`group-hover/btn:translate-x-1 transition-transform ${theme.iconText}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-10">
                  <button onClick={() => setActiveTab('doctors')} className="border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-600 hover:text-white transition">
                    View All Doctors
                  </button>
                </div>
              </div>
            </section>

            {/* Advanced Technology / Why Choose Us */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 py-16 mb-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Advanced Medical Technology</h2>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">Elsan Clinic is equipped with the latest diagnostic and therapeutic technologies. From high-resolution 3D imaging to minimally invasive surgical suites, we ensure precision, comfort, and safety at every step of your treatment.</p>
                  <ul className="space-y-4">
                    {[
                      "High-Resolution 3D MRI & CT Scanning",
                      "Minimally Invasive Endoscopic Suite",
                      "24/7 Advanced Cath Lab",
                      "Fully Automated Pathology Lab"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-semibold text-slate-700">
                        <div className="bg-teal-100 p-1 rounded text-teal-600"><CheckCircle2 size={18} /></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80" alt="Hospital Room" className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover" />
                  <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&q=80" alt="Advanced Imaging Tech" className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover mt-8" />
                </div>
              </div>
            </section>

          </motion.div>
        )}
        {activeTab === 'treatments' && <ServicesView onNavigate={() => setActiveTab('book')} />}
        {activeTab === 'doctors' && <DoctorsView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'book' && <BookView />}
        {activeTab === 'aitools' && <AIToolsView />}
        {activeTab === 'prohealth' && <HealthPackagesView onNavigate={() => setActiveTab('book')} />}
        {activeTab === 'emergency' && <EmergencyView />}
        {activeTab === 'nri' && <InternationalPatientsView />}
        {activeTab === 'library' && <HealthLibraryView />}
      </main>

      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg p-0.5 flex items-center justify-center"><img src="/logo.png" alt="Elsan Clinic Logo" className="w-full h-full object-contain" /></div>
                <h2 className="text-xl font-bold text-white">Elsan Clinic</h2>
              </div>
              <p className="text-sm leading-relaxed">Part of Elsan Foundation.<br />{CLINIC_INFO.tagline}</p>
              <div className="flex gap-3 pt-2">
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition">About Us</button></li>
                <li><button onClick={() => setActiveTab('treatments')} className="hover:text-white transition">Our Services</button></li>
                <li><button onClick={() => setActiveTab('doctors')} className="hover:text-white transition">Find a Doctor</button></li>
                <li><button onClick={() => setActiveTab('book')} className="hover:text-white transition">Book Appointment</button></li>
                <li><button onClick={() => setActiveTab('prohealth')} className="hover:text-white transition">ProHealth Packages</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Consultation Hours</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2 items-start"><Clock size={16} className="text-blue-400 mt-0.5 shrink-0" /> <div>Mon – Sat: 8:30 AM – 7:30 PM<br /><span className="text-slate-500">Sun: Emergency Only</span></div></li>
              </ul>
              <h3 className="text-white font-semibold mt-6 mb-3 border-b border-slate-700 pb-2">Accreditations</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700">Joslin Fellowship</span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700">Johns Hopkins</span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700">RCPCH London</span>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Phone size={16} className="text-teal-400" /><a href="tel:9444184977" className="font-medium text-white hover:text-teal-400 transition">{CLINIC_INFO.phone}</a></li>
                <li className="flex items-start gap-2"><MapPin size={16} className="text-teal-400 mt-0.5 shrink-0" /><span className="text-slate-400 text-xs leading-relaxed">{CLINIC_INFO.address}</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4">
            <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Elsan Clinic. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
      <FloatingContact />
    </AuroraBackground>
  );
}

"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Clock, FileText, User, Pill, Phone, BrainCircuit, Activity, HeartPulse, Users, Calendar, Star, Building2, BookOpen, Ambulance, Globe, ChevronRight, ChevronDown, CheckCircle2, MapPin, Menu, X as XIcon, Quote, Shield, ArrowRight, Bot } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { CLINIC_INFO, SERVICES } from '../data';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DoctorsView = dynamic(() => import('../components/PublicViews').then(mod => mod.DoctorsView), { ssr: false });
const ServicesView = dynamic(() => import('../components/PublicViews').then(mod => mod.ServicesView), { ssr: false });
const ContactView = dynamic(() => import('../components/PublicViews').then(mod => mod.ContactView), { ssr: false });
const BookView = dynamic(() => import('../components/PublicViews').then(mod => mod.BookView), { ssr: false });

const HealthPackagesView = dynamic(() => import('../components/ApolloViews').then(mod => mod.HealthPackagesView), { ssr: false });
const EmergencyView = dynamic(() => import('../components/ApolloViews').then(mod => mod.EmergencyView), { ssr: false });
const HealthLibraryView = dynamic(() => import('../components/ApolloViews').then(mod => mod.HealthLibraryView), { ssr: false });

const AIToolsView = dynamic(() => import('../components/AIToolsView'), { ssr: false });

import { AuroraBackground } from '@/components/ui/aurora-background';
import HeroWidgets from '@/components/HeroWidgets';
import FloatingContact from '@/components/FloatingContact';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/navigation';

function HeroVideoCarousel({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);
  
  const slides = [
    {
      videoUrl: "/video3.mp4?v=3",
      posterUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=2000&q=80",
      title: "Comprehensive Clinic Care",
      subtitle: "Equipped with modern diagnostic tools to provide precise and personalized treatment plans."
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
    // Pre-buffer the second video shortly after initial load to keep LCP fast
    const preloadTimer = setTimeout(() => {
      setLoadedSlides(prev => prev.includes(1) ? prev : [...prev, 1]);
    }, 2000);

    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % slides.length;
        const nextNext = (next + 1) % slides.length;
        // Pre-buffer the slide AFTER the next one well in advance
        setLoadedSlides(loaded => loaded.includes(nextNext) ? loaded : [...loaded, nextNext]);
        return next;
      });
    }, 6000);
    return () => {
      clearInterval(timer);
      clearTimeout(preloadTimer);
    };
  }, [slides.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentSlide) {
        // Play the active video immediately
        video.play().catch(() => {});
      } else {
        // Pause inactive videos smoothly after fade
        setTimeout(() => {
           video.pause();
        }, 1000);
      }
    });
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-68px)] sm:h-[calc(100dvh-68px)] min-h-[560px] sm:min-h-[500px] md:min-h-0">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 bg-slate-900 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
          <video
            ref={el => { videoRefs.current[index] = el; }}
            src={loadedSlides.includes(index) ? slide.videoUrl : undefined}
            poster={slide.posterUrl}
            muted
            loop
            playsInline
            preload={loadedSlides.includes(index) ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 md:p-16 lg:p-24 text-white z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-white/90 text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6 w-max max-w-full">
          <Shield size={14} className="text-teal-300" /> Trusted by 10,000+ Families · Est. 20+ Years
        </div>

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight mb-3 tracking-tight">{slides[currentSlide].title}</h1>
          <p className="text-blue-50 text-xs sm:text-sm md:text-base font-sans font-light mb-5 sm:mb-6 max-w-2xl">{slides[currentSlide].subtitle}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-sm sm:max-w-none">
          <button onClick={() => setActiveTab('book')} className="bg-orange-500 hover:bg-orange-400 text-white font-semibold flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xs sm:text-sm md:text-base w-full sm:w-auto shrink-0">
            <Calendar size={16} className="sm:w-5 sm:h-5" />
            Book Appointment
          </button>
          <button onClick={() => {
            const text = "Hi Elsan Clinic, could you please provide your clinic address and contact details?\n\nAlso, I would like to book an appointment. Here are my details:\n\n*Name:*\n*Age:*\n*Phone:*\n*Doctor Preference:*\n*Preferred Date & Time:*\n*Symptoms/Notes:*";
            window.open(`${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
          }} className="bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xs sm:text-sm md:text-base w-full sm:w-auto shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2500/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))} className="bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 text-xs sm:text-sm md:text-base w-full sm:w-auto shrink-0">
            <Bot size={16} className="sm:w-5 sm:h-5" />
            Elsan AI Assistant
          </button>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-8">
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

import { useSettings } from '../hooks';

export default function LandingPage() {
  const [activeTab, setActiveTabState] = useState('home');

  const lenis = useLenis();
  const router = useRouter();

  const setActiveTab = (tab: string) => {
    if (tab === 'book') {
      router.push('/book');
      return;
    }

    setActiveTabState(tab);

    if (tab === 'home') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const element = document.getElementById(tab);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.5 });
      } else {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };
  const selectSpecialty = (name: string) => {
    setActiveTab('treatments');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('select-specialty', { detail: name }));
    }, 150);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <AuroraBackground suppressHydrationWarning className="min-h-screen min-w-full flex flex-col justify-start items-stretch font-sans text-slate-800" showRadialGradient={true}>
      {/* Apollo-Style Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[68px] px-4 relative">
          {/* Left Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 z-10">
            <div className="flex-shrink-0 w-11 h-11 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Elsan Clinic Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Elsan Clinic</h1>
              <p className="hidden sm:block text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Trusted Healthcare</p>
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
                    <button key={s} onClick={() => selectSpecialty(s)} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition font-medium">{s}</button>
                  ))}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Programs</h4>
                  {['Emergency Care', 'Infectious Diseases', 'Immunisation Clinic', 'Critical Care', 'In-Clinic Pharmacy'].map(s => (
                    <button key={s} onClick={() => selectSpecialty(s)} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition font-medium">{s}</button>
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
                  { label: 'Clinic Guidelines', tab: 'guidelines' },
                  { label: 'Health Library', tab: 'library' },
                ].map(item => (
                  <button key={item.tab} onClick={() => setActiveTab(item.tab)} className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition font-medium">{item.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 z-10">
            <button onClick={() => setActiveTab('book')} className="hidden sm:flex bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 active:scale-95 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md items-center gap-2">
              <Calendar size={16} /> Book Appt
            </button>
            <Link href="/login" className="hidden md:inline-flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-sm active:scale-95">
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
                  { label: 'Book Appointment', tab: 'book' },
                  { label: 'Medical Services', tab: 'treatments' },
                  { label: 'Find a Doctor', tab: 'doctors' },
                  { label: 'AI Symptom Checker', tab: 'aitools' },
                  { label: 'Clinic Guidelines', tab: 'guidelines' },
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
      <HeroVideoCarousel setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 space-y-24">
        <div id="home">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">

            {/* Quick Access Bar (Moved below Hero) */}
            <section className="max-w-6xl mx-auto -mt-4">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-3 md:p-4">
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2 md:gap-3">
                  {[
                    { title: 'Book Appointment', icon: Calendar, tab: 'book', color: 'bg-orange-500 text-white' },
                    { title: 'Find a Doctor', icon: User, tab: 'doctors', color: 'bg-blue-500 text-white' },
                    { title: 'AI Symptom Checker', icon: BrainCircuit, tab: 'aitools', color: 'bg-teal-500 text-white' },
                    { title: 'Clinic Guidelines', icon: BookOpen, tab: 'guidelines', color: 'bg-indigo-500 text-white' },
                    { title: 'Emergency', icon: Ambulance, tab: 'emergency', color: 'bg-red-600 text-white' },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(item.tab)}
                      className="flex flex-col items-center justify-center p-2 md:p-2.5 rounded-lg text-center transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95 group sm:w-[130px] md:w-[150px]"
                    >
                      <div className={`mb-1.5 p-2 rounded-lg ${item.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                        <item.icon size={16} />
                      </div>
                      <span className="font-sans font-semibold text-[10px] md:text-[11px] text-slate-700 leading-tight">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto pt-4">
              {[
                { label: 'of Service', value: '20+ Years', icon: Star },
                { label: 'Families Served', value: '10,000+', icon: Users },
                { label: 'Mon-Fri / 10 AM-4 PM Sat-Sun', value: '9 AM - 8 PM', icon: Clock },
                { label: 'Patient Satisfaction', value: '98%', icon: HeartPulse },
              ].map((stat, i) => (
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default">
                  <div className="mx-auto w-10 h-10 bg-blue-50/60 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <stat.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </section>

            {/* Patient Testimonials */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 pt-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 mb-3">Patient Stories</div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-800 mb-1.5">What Our Patients Say</h2>
                <p className="text-slate-500 text-sm font-sans font-light max-w-2xl mx-auto">Real experiences from families who trust Elsan Clinic with their healthcare.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Ravi K.', condition: 'Diabetes Care', rating: 5, text: 'Dr. Elangeswaran has been managing my diabetes for 8 years. My HbA1c dropped from 9.2 to 6.4. The personalised diet plans and regular follow-ups make all the difference.' },
                  { name: 'Priya S.', condition: 'Paediatrics', rating: 5, text: 'Dr. Sambath Kumar is incredibly gentle with children. My son actually looks forward to his check-ups! The vaccination tracking system is very convenient for busy parents.' },
                  { name: 'Anand V.', condition: 'Cardiac Care', rating: 5, text: 'After my cardiac episode, the team at Elsan provided exceptional post-MI care. The dedicated emergency support gave my family real peace of mind during recovery.' },
                ].map((t, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <Quote size={18} className="text-blue-200 mb-2" />
                    <p className="text-slate-600 text-xs leading-relaxed flex-1 italic">"{t.text}"</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800 text-xs">{t.name}</p>
                        <p className="text-[10px] text-blue-600 font-semibold">{t.condition}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, si) => <Star key={si} size={12} className="fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Intelligent Care Section */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 py-12">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-100">
                    Why Choose Us
                  </div>
                  <h2 className="text-2xl md:text-4xl font-serif font-semibold text-slate-800 leading-tight">
                    Healthcare You Can <em className="text-teal-600 not-italic">Trust</em>
                  </h2>
                  <p className="text-slate-500 text-base font-sans font-light leading-relaxed">
                    We combine world-class medical expertise with genuine care for each patient — because your wellbeing is more than just a diagnosis.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <User className="text-teal-600" size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-800 mb-0.5">Experienced & Certified Specialists</h4>
                        <p className="text-slate-500 text-xs font-light leading-relaxed">Our team includes 12+ board-certified doctors with advanced training across multiple specialties, ensuring expert care at every visit.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <Building2 className="text-teal-600" size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-800 mb-0.5">Modern, Hygienic Facilities</h4>
                        <p className="text-slate-500 text-xs font-light leading-relaxed">Our clinic is equipped with cutting-edge diagnostic tools, sterile treatment areas, and a comfortable patient-first environment.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                        <Clock className="text-teal-600" size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-800 mb-0.5">Flexible Hours & Emergency Care</h4>
                        <p className="text-slate-500 text-xs font-light leading-relaxed">Clinic Hours: Mon-Fri: 9 AM - 8 PM | Sat-Sun: 10 AM - 4 PM. Emergency support available with on-call physician coverage.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <HeroWidgets />
                </div>
              </div>
            </section>




            {/* Advanced Technology / Why Choose Us */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 py-12 mb-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Comprehensive Clinical Expertise</h2>
                  <p className="text-slate-500 text-base mb-6 leading-relaxed">Elsan Clinic delivers highly specialized care focused on accurate diagnosis, chronic disease management, and long-term wellness. With our experienced team and patient-first approach, we ensure your family receives the best possible medical attention under one roof.</p>
                  <ul className="space-y-4">
                    {[
                      "Expert Diabetes & Hypertension Management",
                      "Comprehensive Family & Geriatric Care",
                      "Dedicated Paediatric & Infant Health",
                      "Convenient In-Clinic Pharmacy"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-semibold text-slate-700">
                        <div className="bg-teal-100 p-1 rounded text-teal-600"><CheckCircle2 size={18} /></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" alt="Doctor Consultation" className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80" alt="Modern Clinic" className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover mt-8" loading="lazy" />
                </div>
              </div>
            </section>

          </motion.div>
        </div>

        <div id="treatments" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <ServicesView onNavigate={() => setActiveTab('book')} />
        </div>

        <div id="doctors" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <DoctorsView />
        </div>


        <div id="aitools" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <AIToolsView />
        </div>

        <div id="guidelines" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <HealthPackagesView onNavigate={() => setActiveTab('book')} />
        </div>

        <div id="emergency" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <EmergencyView />
        </div>

        <div id="library" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <HealthLibraryView />
        </div>

        <div id="contact" className="scroll-mt-24 pt-10 border-t border-slate-200">
          <ContactView />
        </div>
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
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
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
                <li className="flex gap-2 items-start"><Clock size={16} className="text-blue-400 mt-0.5 shrink-0" /> <div>{settings?.working_hours_mon_fri}<br /><span className="text-slate-500">{settings?.working_hours_sat_sun}</span></div></li>
              </ul>

            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-2">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Phone size={16} className="text-teal-400" /><a href={`tel:${settings?.phone?.replace(/\s/g, '') || '9444184977'}`} className="font-medium text-white hover:text-teal-400 transition">{settings?.phone || CLINIC_INFO.phone}</a></li>
                <li className="flex items-start gap-2"><MapPin size={16} className="text-teal-400 mt-0.5 shrink-0" /><span className="text-slate-400 text-xs leading-relaxed whitespace-pre-wrap">{settings?.physical_address || CLINIC_INFO.address}</span></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center pt-6">
            <p className="text-slate-500 text-xs text-center">© {new Date().getFullYear()} Elsan Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <FloatingContact />
    </AuroraBackground>
  );
}

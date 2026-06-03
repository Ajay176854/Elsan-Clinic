import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Clock, FileText, User, Pill, Phone, BrainCircuit, Activity, HeartPulse, Users, Calendar, Star, Building2, BookOpen, Ambulance, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from './data';
import { Link } from 'react-router-dom';
import { DoctorsView, ServicesView, ContactView, BookView } from './components/PublicViews';
import { HealthPackagesView, EmergencyView, InternationalPatientsView, HealthLibraryView } from './components/ApolloViews';
import AIToolsView from './components/AIToolsView';

function HeroVideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      videoUrl: "/video3.mp4",
      posterUrl: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=2000&q=80",
      title: "Advanced Medical Technology",
      subtitle: "Equipped with state-of-the-art facilities for precise diagnostics and treatment."
    },
    {
      videoUrl: "/video2.mp4",
      posterUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=2000&q=80",
      title: "Compassionate Healthcare",
      subtitle: "Our dedicated team provides personalized care for your faster recovery."
    },
    {
      videoUrl: "/video1.mp4",
      posterUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=2000&q=80",
      title: "Expert Care for Every Family",
      subtitle: "Serving over 10,000 families in Chennai for more than 20 years. Intelligently delivered by ELSAN AI."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl w-full" style={{ height: '550px' }}>
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 bg-slate-900 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
          <video src={slide.videoUrl} poster={slide.posterUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 md:pb-28 text-white z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-blue-800/80 backdrop-blur-md border border-blue-600 px-4 py-1.5 rounded-full text-blue-100 text-sm font-semibold mb-6 shadow-inner tracking-wide w-max">
          <Star size={16} className="text-yellow-400" /> Powered by ELSAN AI & Gemini 3.1 Ultra
        </div>

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight drop-shadow-md">{slides[currentSlide].title}</h1>
          <p className="text-blue-50 text-lg md:text-xl mb-8 drop-shadow max-w-2xl">{slides[currentSlide].subtitle}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link to="/login" className="bg-orange-500 hover:bg-orange-400 text-white font-semibold flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg shadow-lg transition">
            <Calendar size={20} />
            Book Appointment
          </Link>
          <Link to="/login" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg shadow-lg transition border border-white/30">
            <Activity size={20} />
            Talk to ELSAN AI
          </Link>
        </div>
      </div>

      <div className="absolute bottom-24 md:bottom-28 left-8 md:left-16 flex gap-2 z-20">
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
  );
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Top Banner */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 px-4 flex justify-between items-center z-50 sticky top-0">
        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline font-semibold">🚑 Emergency? Call 108 or {CLINIC_INFO.phone}</span>
          <span className="sm:hidden font-semibold">🚑 Call 108 or {CLINIC_INFO.phone}</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-8 z-40">
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
            <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Home</button>
            <button onClick={() => setActiveTab('treatments')} className={`${activeTab === 'treatments' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Treatments</button>
            <button onClick={() => setActiveTab('doctors')} className={`${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Doctors</button>
            <button onClick={() => setActiveTab('contact')} className={`${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'hover:text-blue-600 transition'} tracking-wide`}>Contact</button>
            <button onClick={() => setActiveTab('aitools')} className={`flex items-center gap-1 ${activeTab === 'aitools' ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'hover:text-teal-600 transition'} tracking-wide`}><BrainCircuit size={16} /> AI Tools</button>
          </div>

          <div className="flex items-center gap-3 px-4">
            <Link to="/login" className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition shadow-sm">
              Book Appt
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            {/* AI Daily Tip */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 p-4 rounded-xl flex items-start gap-4 shadow-sm">
              <div className="bg-white p-2 rounded-lg text-teal-600 shadow-sm shrink-0 border border-teal-100">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="text-teal-800 font-bold text-sm tracking-wide uppercase mb-1 flex items-center gap-2">
                  💡 ELSAN AI Daily Tip
                </h4>
                <p className="text-slate-700 text-sm">Drinking 8 glasses of water daily can reduce your risk of kidney stones by up to 40%. Stay hydrated! - <span className="font-semibold text-teal-700">Gemini 3.1 Health Insight</span></p>
              </div>
            </div>

            <HeroVideoCarousel />

            <section className="relative -mt-20 z-20 px-4 xl:px-0">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xl max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { title: 'Book Appt', icon: Calendar, tab: 'book', primary: true },
                    { title: 'International', icon: Globe, tab: 'nri' },
                    { title: 'ProHealth Check', icon: HeartPulse, tab: 'prohealth' },
                    { title: 'Find a Doctor', icon: User, tab: 'doctors' },
                    { title: 'Buy Medicines', icon: Pill, tab: 'contact' },
                    { title: 'Find Hospital', icon: Building2, tab: 'contact' },
                    { title: 'AI Symptom Checker', icon: BrainCircuit, tab: 'aitools', highlight: true },
                    { title: 'View Records', icon: FileText, tab: 'login' },
                    { title: 'Health Library', icon: BookOpen, tab: 'library' },
                    { title: 'Emergency', icon: Ambulance, tab: 'emergency' },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(item.tab)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl text-center transition border shadow-sm hover:shadow-md ${item.primary ? 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-900 group' : item.highlight ? 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-900 group' : 'bg-white border-slate-100 hover:border-blue-300 hover:bg-slate-50 text-slate-700 group'}`}
                    >
                      <div className={`mb-3 p-3 rounded-full ${item.primary ? 'bg-orange-500 text-white' : item.highlight ? 'bg-teal-500 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'}`}>
                        <item.icon size={24} />
                      </div>
                      <span className="font-semibold text-[13px] leading-tight">{item.title}</span>
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
                { label: 'AI Health Assistant', value: 'Gemini 3.1', icon: Activity },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </section>

            <section className="bg-gradient-to-r from-teal-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Predict • Prevent • Overcome
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Elsan ProHealth</h2>
                <p className="text-blue-100 max-w-xl text-lg">India's most powerful preventive health management program. AI-assisted personalized health risk assessments mapped to your exact clinical profile.</p>
              </div>
              <div className="bg-white p-6 rounded-xl text-slate-800 shrink-0 w-full md:w-80 shadow-2xl">
                <h3 className="font-bold text-xl mb-4 border-b pb-2">Book a Health Check</h3>
                <button onClick={() => setActiveTab('prohealth')} className="w-full inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-md">
                  Explore Packages
                </button>
              </div>
            </section>

            {/* Centres of Clinical Excellence */}
            <section className="max-w-6xl mx-auto px-4 xl:px-0 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2 border-l-4 border-blue-600 pl-3">Centres of Clinical Excellence</h2>
                  <p className="text-slate-600 pl-4 max-w-2xl">World-class specialized care across multiple medical disciplines, driven by research and technology.</p>
                </div>
                <button onClick={() => setActiveTab('treatments')} className="hidden md:flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold">
                  View All Specialties <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {SERVICES.map((srv: any, i: number) => {
                  const ICON_MAP: Record<string, any> = { HeartPulse, Users, Activity, Stethoscope, Pill, Baby: Users, Microscope: Activity, Ambulance, ClipboardList: FileText, PersonStanding: User, Syringe: Activity, BedDouble: Activity };
                  const Icon = ICON_MAP[srv.iconName] || Activity;
                  return (
                    <button key={i} onClick={() => setActiveTab('treatments')} className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:border-blue-400 hover:shadow-xl transition group flex flex-col h-full">
                      <div className="bg-blue-50 text-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition shadow-sm">
                        <Icon size={28} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{srv.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{srv.description}</p>
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
                    { name: "Dr. N. Elangeswaran", spec: "Senior Consultant - Internal Medicine", exp: "20+ Years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
                    { name: "Dr. E. Pandiya Meena", spec: "Head of Gynecology", exp: "15+ Years", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
                    { name: "Dr. R. Sambath Kumar", spec: "Chief of Neurology", exp: "18+ Years", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" }
                  ].map((doc, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-slate-200 flex flex-col">
                      <img src={doc.img} alt={doc.name} className="w-full h-64 object-cover object-top" />
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{doc.name}</h3>
                        <p className="text-blue-600 font-medium text-sm mb-4">{doc.spec}</p>
                        <div className="flex justify-between items-center text-slate-500 text-sm border-t pt-4 mt-auto">
                          <span className="flex items-center gap-1"><Clock size={16} /> {doc.exp}</span>
                          <button onClick={() => setActiveTab('book')} className="text-orange-500 font-bold hover:text-orange-700 transition">Book Appt</button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">Elsan Clinic is equipped with the latest diagnostic and therapeutic technologies. From AI-assisted robotic surgeries to 3D imaging, we ensure precision and safety at every step of your treatment.</p>
                  <ul className="space-y-4">
                    {[
                      "AI-Powered Diagnostic Imaging (Gemini 3.1)",
                      "Robotic Surgery Integration",
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
                  <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80" alt="Robotic Surgery" className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover mt-8" />
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
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition">About Us</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-white transition">Our Services</button></li>
              <li><button onClick={() => setActiveTab('doctors')} className="hover:text-white transition">Find a Doctor</button></li>
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
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Video } from 'lucide-react';

export default function HeroWidgets() {
  return (
    <div className="relative w-full h-[550px] rounded-[32px] overflow-hidden flex items-center justify-center shadow-lg group">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full bg-slate-100 rounded-[32px] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/doctor.png" 
          alt="Professional Doctor" 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay to ensure widget contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-teal-900/10 mix-blend-multiply"></div>
      </div>

      {/* Widget Container - Full width to push cards to the edges */}
      <div className="absolute inset-0 w-full h-full p-4 md:p-6 pointer-events-none">
        
        {/* Card 1 - Online Telemedicine (Middle Left) */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.2 }, x: { duration: 0.8, delay: 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[35%] md:bottom-[40%] left-4 md:left-6 w-52 md:w-56 bg-white rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-slate-100 z-30 pointer-events-auto will-change-transform"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Video size={18} className="text-blue-500" />
            </div>
            <div className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Live Video</div>
          </div>
          <h3 className="text-slate-800 font-bold text-[14px] md:text-[15px] leading-tight mb-1">Online Telemedicine</h3>
          <p className="text-slate-500 text-xs font-semibold">Virtual doctor consultations</p>
        </motion.div>

        {/* Card 2 - Patient Satisfaction (Bottom Right) */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.4 }, x: { duration: 0.8, delay: 0.4 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-48 md:w-52 bg-white rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-slate-100 z-30 pointer-events-auto will-change-transform"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400 md:w-4 md:h-4" />
              ))}
            </div>
            <span className="text-slate-800 font-bold text-sm">4.9/5</span>
          </div>
          <p className="text-slate-800 text-[14px] md:text-[15px] font-bold leading-tight mb-1">Top Rated Clinic</p>
          <p className="text-slate-500 text-xs font-semibold">Based on 2,500+ reviews</p>
        </motion.div>

        {/* Card 3 - Happy Patients (Bottom Left) */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, y: [0, -8, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
          className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-56 md:w-60 bg-white rounded-2xl p-4 md:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-slate-100 z-30 pointer-events-auto will-change-transform"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <ShieldCheck size={18} className="text-teal-600 md:w-5 md:h-5" />
              </div>
              <p className="text-slate-800 font-bold text-xs md:text-sm leading-tight">Trusted by<br/>Families</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-3">
              {['A', 'J', 'R', 'S'].map((initial, i) => (
                <div key={i} className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] md:text-[10px] font-bold shadow-sm ${
                  ['bg-blue-100 text-blue-700', 'bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700'][i]
                }`}>
                  {initial}
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xl md:text-2xl font-bold text-slate-800 leading-none">10k+</p>
              <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Patients</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

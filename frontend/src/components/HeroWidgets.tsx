"use client";

import { motion } from 'framer-motion';
import { Activity, HeartPulse, Calendar, Users } from 'lucide-react';

export default function HeroWidgets() {
  return (
    <div className="relative w-full h-[500px] bg-[#0B1F3A] rounded-[32px] overflow-hidden flex items-center justify-center shadow-2xl">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(26,122,110,0.3)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(200,150,90,0.15)_0%,transparent_50%)]"></div>
      
      {/* Decorative background circles */}
      <div className="absolute w-[320px] h-[320px] border border-white/10 rounded-full"></div>
      <div className="absolute w-[480px] h-[480px] border border-white/5 rounded-full"></div>
      
      {/* Large decorative medical cross */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] flex items-center justify-center pointer-events-none">
        <div className="absolute w-12 h-48 bg-white rounded-xl"></div>
        <div className="absolute w-48 h-12 bg-white rounded-xl"></div>
      </div>

      {/* Center circle with text */}
      <div className="absolute w-[160px] h-[160px] rounded-full bg-white/5 border-2 border-white/10 backdrop-blur-md flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-2 bg-white/5">
           <Activity size={24} className="text-white" strokeWidth={2} />
        </div>
        <div className="font-serif text-[13px] text-white/90 tracking-widest uppercase font-medium">Expert Care</div>
      </div>

      {/* Floating Card 1: Heart Rate */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-6 md:left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
          <HeartPulse size={20} className="text-teal-300" />
        </div>
        <div>
          <div className="text-[11px] text-white/60 mb-0.5 font-sans font-medium uppercase tracking-wider">Heart Rate</div>
          <div className="text-sm font-sans font-semibold text-white">72 bpm · Normal</div>
        </div>
      </motion.div>

      {/* Floating Card 2: Next Available */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-12 right-6 md:right-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center flex-shrink-0">
          <Calendar size={20} className="text-amber-300" />
        </div>
        <div>
          <div className="text-[11px] text-white/60 mb-0.5 font-sans font-medium uppercase tracking-wider">Next Available</div>
          <div className="text-sm font-sans font-semibold text-white">Today, 3:00 PM</div>
        </div>
      </motion.div>

      {/* Floating Card 3: Specialists */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[55%] -right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center gap-3 shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center flex-shrink-0">
          <Users size={20} className="text-blue-300" />
        </div>
        <div>
          <div className="text-[11px] text-white/60 mb-0.5 font-sans font-medium uppercase tracking-wider">Specialists</div>
          <div className="text-sm font-sans font-semibold text-white">12 Doctors On-Call</div>
        </div>
      </motion.div>
    </div>
  );
}

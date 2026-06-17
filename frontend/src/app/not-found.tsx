"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Stethoscope, HeartPulse, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden font-sans p-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Animated Icon Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center border border-slate-100 z-10 relative">
            <HeartPulse size={48} className="text-teal-600 sm:w-16 sm:h-16" strokeWidth={1.5} />
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-teal-400 rounded-full z-0 blur-md opacity-30"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-500 tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-slate-500 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you typed the address incorrectly.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-8 py-3.5 rounded-full font-medium shadow-lg shadow-teal-500/25 transition-all"
            >
              <Home size={18} />
              Return Home
            </motion.button>
          </Link>
          <Link href="/#services">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <Stethoscope size={18} />
              Our Services
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-6 text-sm text-slate-400"
      >
        © {new Date().getFullYear()} Elsan Clinic. All rights reserved.
      </motion.div>
    </div>
  );
}

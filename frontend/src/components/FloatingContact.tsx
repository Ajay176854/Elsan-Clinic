"use client";

import { MessageSquare, Send, X, Calendar, User, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { DOCTORS, CLINIC_INFO } from "../data";

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  options?: string[];
};

type ChatState = 'idle' | 'booking_name' | 'booking_phone' | 'booking_age' | 'booking_gender' | 'booking_doctor' | 'booking_date' | 'booking_time' | 'booking_notes';

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'bot',
  text: `Hello! Welcome to Elsan Clinic.\n\n📍 Location: 56/1 & 56/2, Perumal Koil Street, Saidapet (West), Chennai - 15\n📞 Phone: +91 9444184977\n\nHow can I assist you today?`,
  options: ['Book Appointment', 'WhatsApp Us']
};

const getNextDateStr = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export default function FloatingContact() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // State machine for booking flow
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [bookingData, setBookingData] = useState<any>({});

  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleWhatsApp = () => {
    const text = "Hi Elsan Clinic, could you please provide your clinic address and contact details?\n\nAlso, I would like to book an appointment. Here are my details:\n\n*Name:*\n*Age:*\n*Phone:*\n*Doctor Preference:*\n*Preferred Date & Time:*\n*Symptoms/Notes:*";
    window.open(`${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const processInput = async (text: string): Promise<Message> => {
    const lower = text.toLowerCase();
    const msgId = Date.now().toString();

    // Check if user wants to cancel booking
    if (chatState !== 'idle' && (lower === 'cancel' || lower === 'menu')) {
      setChatState('idle');
      setBookingData({});
      return { ...INITIAL_MESSAGE, id: msgId, text: "Booking cancelled. How else can I help you?" };
    }

    // Booking Flow State Machine
    if (chatState === 'booking_name') {
      setBookingData((prev: any) => ({ ...prev, full_name: text }));
      setChatState('booking_phone');
      return { id: msgId, role: 'bot', text: `Thank you, ${text}. What is your phone number?` };
    }

    if (chatState === 'booking_phone') {
      setBookingData((prev: any) => ({ ...prev, phone: text }));
      setChatState('booking_age');
      return { id: msgId, role: 'bot', text: `Got it. What is your age?` };
    }

    if (chatState === 'booking_age') {
      const age = parseInt(text.replace(/[^0-9]/g, ''));
      if (isNaN(age)) {
        return { id: msgId, role: 'bot', text: `Please enter a valid number for your age.` };
      }
      setBookingData((prev: any) => ({ ...prev, age }));
      setChatState('booking_gender');
      return { id: msgId, role: 'bot', text: `Thanks. Please select your gender.`, options: ['Male', 'Female', 'Other'] };
    }

    if (chatState === 'booking_gender') {
      setBookingData((prev: any) => ({ ...prev, gender: text }));
      setChatState('booking_doctor');
      return { 
        id: msgId, 
        role: 'bot', 
        text: `Which doctor would you like to consult?`,
        options: ['Any Available Doctor', ...DOCTORS.slice(0,3).map(d => d.name)]
      };
    }

    if (chatState === 'booking_doctor') {
      setBookingData((prev: any) => ({ ...prev, doctor_name: text }));
      setChatState('booking_date');
      return { 
        id: msgId, 
        role: 'bot', 
        text: `When would you like to visit? Select an option or type a date (YYYY-MM-DD).`,
        options: [getNextDateStr(0), getNextDateStr(1), getNextDateStr(2)]
      };
    }

    if (chatState === 'booking_date') {
      // Basic extraction of date
      let dateVal = text;
      if (lower.includes('today')) dateVal = getNextDateStr(0);
      else if (lower.includes('tomorrow')) dateVal = getNextDateStr(1);
      
      setBookingData((prev: any) => ({ ...prev, appointment_date: dateVal }));
      setChatState('booking_time');
      return { 
        id: msgId, 
        role: 'bot', 
        text: `Great. What time would you prefer?`,
        options: ['10:00', '14:00', '18:00']
      };
    }

    if (chatState === 'booking_time') {
      setBookingData((prev: any) => ({ ...prev, appointment_time: text }));
      setChatState('booking_notes');
      return { id: msgId, role: 'bot', text: `Almost done. Please describe any symptoms or reason for visit (or type 'None').` };
    }

    if (chatState === 'booking_notes') {
      const finalData = { ...bookingData, notes: text };
      setChatState('idle'); // Reset state
      setBookingData({}); // Clear buffer

      // API Call to Backend
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8009/api/v1';
        const res = await fetch(`${apiUrl}/appointments/public`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });

        if (res.ok) {
          return { 
            id: msgId, 
            role: 'bot', 
            text: `✅ Appointment Confirmed!\n\nYour appointment with ${finalData.doctor_name} is scheduled for ${finalData.appointment_date} at ${finalData.appointment_time}. Our team will contact you at ${finalData.phone}.\n\nThank you for choosing Elsan Clinic!`,
            options: ['Main Menu']
          };
        } else {
          return { id: msgId, role: 'bot', text: `Sorry, there was an error processing your appointment. Please try again or call our clinic directly.`, options: ['Main Menu'] };
        }
      } catch (err) {
        return { id: msgId, role: 'bot', text: `Sorry, we couldn't connect to our servers. Please call us to book instead.`, options: ['Main Menu'] };
      }
    }

    // Direct WhatsApp Redirect
    if (lower.includes('whatsapp')) {
      setTimeout(() => {
        handleWhatsApp();
      }, 1000);
      return {
        id: msgId,
        role: 'bot',
        text: 'I am redirecting you to our official WhatsApp support...',
        options: ['Main Menu']
      };
    }


    // IDLE Flow Logic
    if (lower.includes('book') || lower.includes('appointment')) {
      setChatState('booking_name');
      return {
        id: msgId,
        role: 'bot',
        text: 'I can help you book an appointment right here! To start, may I know your full name?',
      };
    }
    
    if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('find')) {
      const docNames = DOCTORS.map(d => `• ${d.name} (${d.specialties[0]})`).join('\n');
      return {
        id: msgId,
        role: 'bot',
        text: `Here are some of our top specialists:\n\n${docNames}\n\nWould you like to book a consultation?`,
        options: ['Yes, book appointment', 'Main Menu']
      };
    }
    
    if (lower.includes('about') || lower.includes('clinic') || lower.includes('where') || lower.includes('location') || lower.includes('details')) {
      return {
        id: msgId,
        role: 'bot',
        text: `${CLINIC_INFO.name} - ${CLINIC_INFO.tagline}.\nEstablished ${CLINIC_INFO.established}.\n\n📍 Address: ${CLINIC_INFO.address}\n📞 Phone: ${CLINIC_INFO.phone}\n✉️ Email: info@elsanclinic.com\n\nWe provide 24/7 emergency care and telemedicine services.`,
        options: ['Book Appointment', 'WhatsApp Us', 'Main Menu']
      };
    }

    if (lower.includes('back') || lower.includes('menu')) {
      return { ...INITIAL_MESSAGE, id: msgId };
    }

    // Fallback logic
    return {
      id: msgId,
      role: 'bot',
      text: "I'm a virtual assistant. I can help you book an appointment, find a doctor, or give you clinic info. How can I help?",
      options: ['Book Appointment', 'Clinic Details', 'WhatsApp Us']
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking delay and process
    setTimeout(async () => {
      const response = await processInput(text);
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Chatbot Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden mb-2 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-500 p-4 text-white flex justify-between items-center shadow-md relative z-10">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <div className="relative">
                    <MessageSquare size={20} className="fill-white/20" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-teal-600"></div>
                  </div>
                  Elsan Assistant
                </h3>
                <p className="text-teal-50 text-[11px] mt-0.5 font-light opacity-90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online • AI Assistant
                </p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={chatRef}
              className="h-[380px] bg-slate-50 p-4 flex flex-col gap-4 overflow-y-auto scroll-smooth"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-sm ml-8' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm mr-8 whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                  
                  {/* Options Chips */}
                  {msg.options && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-3"
                    >
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(opt)}
                          className="bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm flex items-center gap-1.5 active:scale-95"
                        >
                          {opt.includes('Book') || opt.includes('Appointment') ? <Calendar size={12} /> : 
                           opt.includes('Doctor') ? <User size={12} /> : 
                           opt.includes('Clinic') ? <Info size={12} /> : null}
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-10">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-100 bg-white relative z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }} 
                className="relative flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={chatState !== 'idle' ? "Type or click 'Cancel'..." : "Type your message..."} 
                  className="flex-1 bg-slate-50 border border-slate-200 pl-4 pr-10 py-3 rounded-full text-[13px] outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all shadow-inner"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons */}
      <div className="flex flex-col gap-4">
        {/* WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsApp}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-colors relative group bg-[#25D366] hover:bg-[#1EBE5A]"
          aria-label="WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          <span className="absolute right-16 bg-slate-900/90 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-white/10">
            WhatsApp Us
          </span>
        </motion.button>

        {/* Chatbot Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-colors relative group ${isChatOpen ? 'bg-slate-800 hover:bg-slate-700' : 'bg-teal-600 hover:bg-teal-500'}`}
          aria-label={isChatOpen ? "Close chat" : "Live Assistant"}
        >
          {isChatOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <MessageSquare size={26} />
          )}
          {!isChatOpen && (
            <span className="absolute right-16 bg-slate-900/90 backdrop-blur text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-white/10">
              Live Assistant
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}

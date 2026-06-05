"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, Calculator, Apple, FileBarChart, ChevronRight } from 'lucide-react';
import AIChatTool from './AIChatTool';
import BMICalculator from './BMICalculator';

export default function AIToolsView() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'symptom', icon: Activity, title: 'AI Symptom Analyser', desc: 'Describe how you feel for a clinical intake and risk analysis.' },
    { id: 'calculator', icon: Calculator, title: 'Medical Calculators', desc: 'BMI, BP Risk, IDRS, HbA1c, Water Intake & Heart Rate.' },
    { id: 'diet', icon: Apple, title: 'AI Diet Planner', desc: 'Personalised diet and lifestyle plans based on your profile.' },
    { id: 'lab', icon: FileBarChart, title: 'Lab Test Explainer', desc: 'Understand your blood reports and test results perfectly.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 backdrop-blur-sm">
            <BrainCircuit size={32} className="text-teal-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">ELSAN AI Tools</h1>
          <p className="text-blue-200 text-lg">Powered by Gemini 3.1 Ultra. Intelligent health analysis, risk prediction, and personalised care.</p>
        </div>
      </div>

      {!activeTool ? (
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-blue-400 hover:shadow-lg transition text-left group flex items-start gap-6"
            >
              <div className="bg-blue-50 text-blue-600 p-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                <tool.icon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{tool.title}</h3>
                <p className="text-slate-600 mb-4">{tool.desc}</p>
                <div className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                  Launch Tool <ChevronRight size={16}/>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">
          <button onClick={() => setActiveTool(null)} className="text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6 flex items-center gap-1 transition">
             ← Back to AI Tools
          </button>

          {activeTool === 'symptom' && (
            <AIChatTool
              title="Symptom Analyser"
              icon={Activity}
              color="blue"
              desc="Describe how you are feeling, how long it has lasted, and severity."
              systemPrompt="You are a medical AI assistant for Elsan Clinic. Your job is to perform a clinical intake and risk analysis based on the patient's symptoms. Ask clarifying questions if necessary, and advise them on potential risks and whether they should seek immediate medical attention. Keep your responses concise, empathetic, and professional."
              initialMessage="Hello! I am ELSAN AI. Please describe your symptoms. \n\n⚠️ **Note:** If you are experiencing chest pain, difficulty breathing, or severe bleeding, call 108 immediately."
            />
          )}
          {activeTool === 'calculator' && <BMICalculator />}
          {activeTool === 'diet' && (
            <AIChatTool
              title="AI Diet & Lifestyle Planner"
              icon={Apple}
              color="green"
              desc="Get personalised diet and lifestyle plans based on your profile."
              systemPrompt="You are an expert AI nutritionist and lifestyle coach for Elsan Clinic. Ask the user about their health goals, current diet, allergies, and lifestyle, and provide a personalized, realistic diet and lifestyle plan. Be encouraging, clear, and structure your plans with bullet points or tables where helpful."
              initialMessage="Welcome to the AI Diet & Lifestyle Planner! To get started, could you tell me a little about your health goals, current weight/height, and any dietary preferences or restrictions?"
            />
          )}
          {activeTool === 'lab' && (
            <AIChatTool
              title="Lab Test Explainer"
              icon={FileBarChart}
              color="indigo"
              desc="Upload or type your test results to decode them."
              systemPrompt="You are a clinical AI assistant for Elsan Clinic specializing in explaining laboratory test results to patients. The patient will provide their test names, values, and reference ranges. Explain what the tests mean in simple, easy-to-understand language. Do not make a definitive diagnosis, but explain what high/low levels generally indicate and suggest when they should consult their doctor."
              initialMessage="Hello! I can help you understand your lab reports. Please type in the test names, your results, and the normal reference ranges from your report."
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

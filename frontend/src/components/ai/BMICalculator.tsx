"use client";

import { useState } from 'react';

export default function BMICalculator() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(65);
  const bmi = (w / ((h/100)*(h/100))).toFixed(1);

  return (
    <div className="max-w-md mx-auto space-y-6 py-8">
      <h2 className="text-2xl font-bold text-center text-slate-800">BMI Calculator</h2>

      <div className="space-y-4">
        <div>
          <label className="flex justify-between font-medium text-slate-700 mb-1"><span>Height (cm)</span><span>{h} cm</span></label>
          <input type="range" min="100" max="220" value={h} onChange={e=>setH(parseInt(e.target.value))} className="w-full accent-blue-600"/>
        </div>
        <div>
          <label className="flex justify-between font-medium text-slate-700 mb-1"><span>Weight (kg)</span><span>{w} kg</span></label>
          <input type="range" min="30" max="150" value={w} onChange={e=>setW(parseInt(e.target.value))} className="w-full accent-blue-600"/>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center shadow-sm">
        <p className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-2">Calculated BMI</p>
        <p className="text-5xl font-black text-blue-900">{bmi}</p>
        <p className="text-blue-700 font-medium mt-3 bg-blue-100 py-1 px-4 rounded-full inline-block">
          {parseFloat(bmi) < 18.5 ? "Underweight" : parseFloat(bmi) < 25 ? "Healthy Weight" : parseFloat(bmi) < 30 ? "Overweight" : "Obese"}
        </p>
      </div>
    </div>
  );
}

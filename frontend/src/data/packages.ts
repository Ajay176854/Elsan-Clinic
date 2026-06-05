import type { ProHealthPackage } from '../types';

export const PROHEALTH_PACKAGES: ProHealthPackage[] = [
  { id: "basic", title: "Basic Package", price: "₹499", features: ["BP & Blood Sugar Check", "BMI & Obesity Screening", "Dietary Counselling (15 min)", "Doctor Consultation Summary"] },
  { id: "std", title: "Standard Package", price: "₹1,499", features: ["Full Blood Count (CBC)", "Fasting Blood Sugar + HbA1c", "Lipid Profile (Cholesterol)", "Kidney & Liver Function Tests", "Urine Routine Examination", "BP + ECG Screening", "Doctor Consultation (30 min)"] },
  { id: "comp", title: "Comprehensive Package", price: "₹2,999", features: ["All Standard Package tests", "Thyroid Profile (T3, T4, TSH)", "Vitamin B12 & D3 Levels", "X-Ray Chest (if needed)", "Diabetes Complication Screening", "Cardiac Risk Scoring", "Dietitian Consultation", "Follow-up Appointment (Free)"] },
  { id: "child", title: "Child Health Package", price: "₹999", features: ["Growth & Development Assessment", "Vaccination Status Review", "Nutritional Counselling", "Vision & Hearing Screening", "Behavioural Health Q&A"] },
  { id: "senior", title: "Senior Citizen Plan", price: "₹1,999", features: ["Comprehensive Blood Panel", "Bone Density Risk Screening", "Cognitive Health Assessment", "Polypharmacy Medicine Review", "Fall Risk Assessment", "Geriatric Doctor Consultation (45 min)"] }
];

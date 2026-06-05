import type { Doctor } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: "dr_elan",
    name: "DR. N. ELANGESWARAN",
    role: "CEO & Medical Director · 20+ Years Experience",
    qualifications: ["MBBS, MD Internal Medicine"],
    fellowships: ["Fellowship – Practical Cardiology (IMA)", "PG Diploma – Infectious Diseases", "Fellowship in Diabetology – Joslin, USA (Harvard)"],
    phone: "9444184977",
    consultationType: "In-Clinic",
    specialties: ["General Health Care", "Diabetes", "Hypertension", "Skin Disease", "Asthma", "Acute Illness", "Geriatric Care", "Lifestyle Counselling", "Speciality Referrals"]
  },
  {
    id: "dr_meena",
    name: "DR. E. PANDIYA MEENA",
    role: "Consultant – Internal Medicine (Online) · Associate Professor",
    qualifications: ["MBBS, MD, Cardiology Fellow"],
    fellowships: ["Fellowship – Practical Cardiology (IMA)", "PG Programme – Johns Hopkins University, USA"],
    phone: "7824051677",
    consultationType: "Online Consultation Only",
    specialties: ["Cardiac Care", "Infectious Disease", "Geriatric Care", "Evidence-Based Medicine", "Endocrinology", "Telemedicine", "AI in Healthcare", "Emergency Care"]
  },
  {
    id: "dr_ramya",
    name: "DR. E. RAMYASHREE",
    role: "Consultant Physician – Internal Medicine (Online)",
    qualifications: ["MBBS, MD General Medicine (SRM 2025), MBA"],
    fellowships: ["BLS & ACLS – American Board of Cardiology", "Fellowship – Practical Cardiology (IMA)"],
    phone: "9962663033",
    consultationType: "Online Consultation Only",
    specialties: ["Cardiac Care", "Infectious Disease", "Geriatric Care", "Evidence-Based Medicine", "Telemedicine", "AI in Healthcare"]
  },
  {
    id: "dr_sambath",
    name: "DR. R. SAMBATH KUMAR",
    role: "Chief Consultant Paediatrician · DNB Gold Medalist",
    qualifications: ["MBBS Gold Medalist (Russia)", "MD Paediatrics (Dist.)", "DNB Paediatrics – Sundaram Medical Foundation"],
    fellowships: ["PGPN – Boston University School of Medicine", "IPPN – Australia", "ICAN RCPCH – London"],
    phone: "8220246025",
    consultationType: "In-Clinic",
    specialties: ["Vaccinations", "Newborn Care", "Nutrition", "Growth Monitoring", "Behavioural Health", "General Paediatrics", "Seasonal Health"]
  }
];

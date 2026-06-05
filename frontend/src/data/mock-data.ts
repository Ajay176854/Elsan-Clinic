import type { Patient, AdminUser } from '../types';

export const MOCK_PATIENTS: Patient[] = [
  { id: "PAT001", pass: "elsan123", name: "Ravi Kumar", age: 45, condition: "Diabetes Type 2", nextAppt: "12 Jun 2026, 10:00 AM", lastRx: "Metformin 500mg BD", lastVisit: "12 May 2026" },
  { id: "PAT002", pass: "elsan456", name: "Priya Sharma", age: 32, condition: "Hypertension", nextAppt: "Not scheduled", lastRx: "Telmisartan 40mg OD", lastVisit: "28 Apr 2026" },
  { id: "PAT003", pass: "elsan789", name: "Baby Arjun", age: 2, condition: "Paediatric check-up", nextAppt: "05 Jul 2026, 05:00 PM", lastRx: "Multivitamin drops", lastVisit: "05 Jan 2026" },
  { id: "PAT004", pass: "elsan321", name: "Meena Devi", age: 58, condition: "Geriatric / Arthritis", nextAppt: "20 Jun 2026, 09:30 AM", lastRx: "Calcium Supplements", lastVisit: "15 Apr 2026" },
  { id: "PAT005", pass: "elsan654", name: "Karthik R.", age: 28, condition: "Dengue Recovery", nextAppt: "02 Jun 2026, 06:15 PM", lastRx: "Paracetamol 650mg SOS", lastVisit: "01 Jun 2026" },
  { id: "PAT006", pass: "elsan987", name: "Lakshmi S.", age: 40, condition: "PCOS / Thyroid", nextAppt: "15 Jun 2026, 04:00 PM", lastRx: "Levothyroxine 50mcg", lastVisit: "10 May 2026" },
  { id: "PAT007", pass: "elsan147", name: "Mr. Anand V.", age: 62, condition: "Cardiac Care (Post-MI)", nextAppt: "22 Jun 2026, 11:00 AM", lastRx: "Aspirin + Statin", lastVisit: "01 May 2026" }
];

export const ADMIN_USERS: AdminUser[] = [
  { username: "elsan_admin", pass: "Admin@Elsan2026", roleTitle: "Super Admin", accessLevel: "super_admin" },
  { username: "elsan_ceo", pass: "CEO@Elan#99", roleTitle: "Director", accessLevel: "director" },
  { username: "reception", pass: "Recep@Elsan123", roleTitle: "Receptionist", accessLevel: "reception" },
  { username: "nurse_head", pass: "Nurse@Elsan01", roleTitle: "Head Nurse", accessLevel: "nurse" },
  { username: "pharmacy_mgr", pass: "Pharma@Elsan01", roleTitle: "Pharmacy Manager", accessLevel: "pharmacy" },
  { username: "doctor_elan", pass: "Dr.Elan@01", roleTitle: "Dr. N. Elangeswaran", accessLevel: "doctor" },
  { username: "doctor_meena", pass: "Dr.Meena@02", roleTitle: "Dr. E. Pandiya Meena", accessLevel: "doctor" },
  { username: "doctor_ramya", pass: "Dr.Ramya@03", roleTitle: "Dr. E. Ramyashree", accessLevel: "doctor" },
  { username: "doctor_sambath", pass: "Dr.Sambath@04", roleTitle: "Dr. R. Sambath Kumar", accessLevel: "doctor" },
  { username: "data_analyst", pass: "Data@Elsan2026", roleTitle: "Clinic Analytics", accessLevel: "analyst" }
];

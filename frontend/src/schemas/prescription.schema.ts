import { z } from 'zod';

export const prescriptionSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  doctor_id: z.string().min(1, 'Doctor is required'),
  symptoms: z.string().min(1, 'Symptoms are required'),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  medicines: z.array(z.object({
    name: z.string().min(1, 'Medicine name is required'),
    morning: z.number().min(0).default(0),
    afternoon: z.number().min(0).default(0),
    night: z.number().min(0).default(0),
    days: z.number().min(1, 'Number of days is required'),
  })).min(1, 'At least one medicine is required'),
  notes: z.string().optional(),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;

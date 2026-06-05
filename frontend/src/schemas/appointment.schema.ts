import { z } from 'zod';

export const appointmentSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  doctor_id: z.string().min(1, 'Doctor is required'),
  appointment_date: z.string().min(1, 'Date is required'),
  appointment_time: z.string().min(1, 'Time is required'),
  reason: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

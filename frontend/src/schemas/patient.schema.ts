import { z } from 'zod';

export const patientSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  age: z.number().min(0).max(150).optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  address: z.string().optional(),
  blood_group: z.string().optional(),
  emergency_contact: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

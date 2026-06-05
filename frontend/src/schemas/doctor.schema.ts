import { z } from 'zod';

export const doctorSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  specialization: z.string().min(2, 'Specialization is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  qualification: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;

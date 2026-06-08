export { useLogin, useLogout, useUser } from './use-auth';
export { useDoctors, useDoctor, useCreateDoctor, useUpdateDoctor, useUploadSignature, useDeleteSignature, useDoctorStats, useResetDoctorPassword, useUploadProfilePic, useDeleteProfilePic } from './use-doctors';
export * from './use-patients';
export { useAppointments, useCreateAppointment, useAssignDoctor, useUpdateAppointmentStatus } from './use-appointments';
export { usePrescriptions, useCreatePrescription } from './use-prescriptions';
export * from './use-visits';
export * from './use-admissions';

import { z } from "zod";

export const LoginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});



export const UserFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
   name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address must be at least 5 characters").max(500, "Address must be at most 500 characters"),
  occupation: z.string().min(2, "Occupation must be at least 2 characters").max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z.string().min(2, "Contact name must be at least 2 characters").max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z.string().refine((num) => /^\+\d{10,15}$/.test(num), "Invalid phone number"),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z.string().min(2, "Insurance name must be at least 2 characters").max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z.string().min(2, "Policy number must be at least 2 characters").max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z.boolean().refine((v) => v === true, {
    message: "You must consent to treatment in order to proceed",
  }),
  disclosureConsent: z.boolean().refine((v) => v === true, {
    message: "You must consent to disclosure in order to proceed",
  }),
  privacyConsent: z.boolean().refine((v) => v === true, {
    message: "You must consent to privacy in order to proceed",
  }),
});

const validatedSchedule = z.preprocess((arg) => {
  const date = typeof arg === "string" || arg instanceof Date ? new Date(arg) : null;
  return date instanceof Date && !isNaN(date.getTime()) ? date : undefined;
}, z.date()).refine((date) => !!date, {
  message: "Appointment date is required",
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: validatedSchedule,
  reason: z.string().min(2, "Reason must be at least 2 characters").max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: validatedSchedule,
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: validatedSchedule,
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().min(2, "Reason must be at least 2 characters").max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}


export const AppointmentFormSchema = z.union([
  CreateAppointmentSchema,
  CancelAppointmentSchema,
  ScheduleAppointmentSchema,
]);

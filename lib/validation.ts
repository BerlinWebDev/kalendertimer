import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, "Bitte geben Sie einen Namen ein, der mindestens 2 Zeichen lang ist.")
        .max(50, "Bitte geben Sie einen Namen ein, der maximal 50 Zeichen lang ist."),
    email: z.string().email("Ungültige Email-Adresse!"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Ungültige Rufnummer!"),
});

export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, "Bitte geben Sie einen Namen ein, der mindestens 2 Zeichen lang ist.")
        .max(50, "Bitte geben Sie einen Namen ein, der maximal 50 Zeichen lang ist."),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    birthDate: z.date(),
    gender: z.enum(["Männlich", "Weiblich", "Andere"]),
    address: z
        .string()
        .min(5, "Bitte geben Sie eine Adresse ein, der mindestens 2 Zeichen lang ist.")
        .max(500, "Bitte geben Sie eine Adresse ein, der maximal 50 Zeichen lang ist."),
    occupation: z
        .string()
        .max(500, "Bitte geben Sie eine Beruf ein, der maximal 500 Zeichen lang ist.")
        .optional(),
    identificationDocument: z.custom<File[]>().optional(),
    treatmentConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "Sie müssen der Behandlung zustimmen, um fortzufahren.",
        }),
    disclosureConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "ie müssen der Offenlegung zustimmen, um fortzufahren.",
        }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "Sie müssen der Datenschutzerklärung zustimmen, um fortzufahren.",
        }),
});

export const CreateAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
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
import { z } from "zod";

const applicationStatusValues = [
  "new",
  "under_review",
  "approved",
  "rejected",
  "cancelled",
  "completed",
  "nueva",
  "en_revision",
  "aprobada",
  "rechazada",
  "cancelada",
  "completada",
] as const;

export const applicationIdParamsSchema = z.object({
  id: z.uuid("El identificador de la solicitud no es valido"),
});

export const petApplicationsParamsSchema = z.object({
  id: z.uuid("El identificador de la mascota no es valido"),
});

export const createApplicationSchema = z.object({
  petId: z.uuid("El identificador de la mascota no es valido"),
  fullName: z.string().trim().min(2, "El nombre completo es obligatorio"),
  email: z.email("Ingresa un correo valido").transform((value) => value.trim().toLowerCase()),
  phone: z.string().trim().min(7, "Ingresa un telefono valido"),
  city: z.string().trim().min(2, "La ciudad es obligatoria"),
  housingType: z.enum(["house", "apartment"], {
    error: "El tipo de vivienda debe ser house o apartment",
  }),
  otherPets: z.union([z.boolean(), z.enum(["true", "false"])]).transform((value) => {
    return value === true || value === "true";
  }),
  adoptedBefore: z.union([z.boolean(), z.enum(["true", "false"])]).transform((value) => {
    return value === true || value === "true";
  }),
  reason: z.string().trim().min(10, "Comparte un motivo mas detallado para adoptar"),
  followUpAccepted: z.boolean(),
  requirementsAccepted: z.boolean(),
  termsAccepted: z.literal(true, {
    error: "Debes aceptar los terminos, el aviso de privacidad y las politicas de la plataforma",
  }),
  turnstile_token: z.string().trim().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(applicationStatusValues, {
    error:
      "El estado debe ser new, under_review, approved, rejected, cancelled o completed",
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;

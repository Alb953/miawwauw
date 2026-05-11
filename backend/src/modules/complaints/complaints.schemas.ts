import { z } from "zod";

const complaintStatusValues = ["pending", "reviewed", "resolved"] as const;

export const complaintIdParamsSchema = z.object({
  id: z.uuid("El identificador de la queja no es valido"),
});

export const createComplaintSchema = z.object({
  full_name: z.string().trim().min(3, "El nombre completo es obligatorio"),
  email: z.string().trim().email("Debes ingresar un correo valido"),
  phone: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .pipe(
      z
        .string()
        .min(7, "El telefono debe tener al menos 7 caracteres")
        .optional(),
    ),
  subject: z.string().trim().min(5, "El asunto debe ser mas claro"),
  message: z.string().trim().min(20, "La queja debe incluir mas detalles"),
  website: z.string().trim().max(0, "Campo no permitido").optional(),
  form_loaded_at: z.coerce
    .number()
    .int("Marca de tiempo invalida")
    .positive("Marca de tiempo invalida"),
  turnstile_token: z.string().trim().optional(),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum(complaintStatusValues, {
    error: "El estado debe ser pending, reviewed o resolved",
  }),
  admin_notes: z.string().trim().optional(),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintStatusInput = z.infer<typeof updateComplaintStatusSchema>;

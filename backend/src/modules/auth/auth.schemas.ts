import { z } from "zod";

const registrationRoles = ["adopter", "rescuer", "adoptante", "rescatista"] as const;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Ingresa un correo valido").transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
  phone: z.string().trim().min(7, "Ingresa un telefono valido").optional().default(""),
  role: z.enum(registrationRoles, {
    error: "El rol debe ser adoptante o rescatista",
  }),
  terms_accepted: z.literal(true, {
    error: "Debes aceptar los terminos, el aviso de privacidad y las politicas de la plataforma",
  }),
  turnstile_token: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.email("Ingresa un correo valido").transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1, "La contrasena es obligatoria"),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
  phone: z.string().trim().min(7, "Ingresa un telefono valido").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

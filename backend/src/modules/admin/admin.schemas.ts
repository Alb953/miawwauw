import { z } from "zod";

export const adminUserIdParamsSchema = z.object({
  id: z.uuid("El identificador del usuario no es valido"),
});

export const adminPetIdParamsSchema = z.object({
  id: z.uuid("El identificador de la mascota no es valido"),
});

export const verifyUserSchema = z.object({
  is_verified: z.literal(true, {
    error: "Solo puedes marcar la verificacion como true",
  }),
});

export const deactivateUserSchema = z.object({
  is_active: z.literal(false, {
    error: "Solo puedes desactivar usuarios con is_active en false",
  }),
});

export const deactivatePetSchema = z.object({
  is_active: z.literal(false, {
    error: "Solo puedes desactivar mascotas con is_active en false",
  }),
});

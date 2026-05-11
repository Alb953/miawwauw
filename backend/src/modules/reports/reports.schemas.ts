import { z } from "zod";

const reportStatusValues = ["pending", "reviewed", "resolved"] as const;

export const reportIdParamsSchema = z.object({
  id: z.uuid("El identificador del reporte no es valido"),
});

export const createReportSchema = z
  .object({
    pet_id: z.uuid("El identificador de la mascota no es valido").optional(),
    reported_user_id: z.uuid("El identificador del usuario reportado no es valido").optional(),
    reason: z.string().trim().min(10, "La razon del reporte debe ser mas detallada"),
  })
  .refine((value) => value.pet_id || value.reported_user_id, {
    message: "Debes reportar una mascota o un usuario",
    path: ["pet_id"],
  });

export const updateReportStatusSchema = z.object({
  status: z.enum(reportStatusValues, {
    error: "El estado debe ser pending, reviewed o resolved",
  }),
  admin_notes: z.string().trim().optional(),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;

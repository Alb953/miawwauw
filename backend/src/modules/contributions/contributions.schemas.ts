import { z } from "zod";

const contributionTypeValues = [
  "donation",
  "featured_listing",
  "veterinary_partner",
  "sponsorship",
] as const;

export const contributionIdParamsSchema = z.object({
  id: z.uuid("El identificador de la contribucion no es valido"),
});

export const createContributionSchema = z.object({
  pet_id: z.uuid("El identificador de la mascota no es valido").optional(),
  contribution_type: z.enum(contributionTypeValues, {
    error: "El tipo de contribucion no es valido",
  }),
  amount: z.coerce.number().nonnegative("El monto debe ser mayor o igual a cero"),
  bank_name: z.string().trim().optional(),
  account_holder_name: z.string().trim().optional(),
  reference_note: z.string().trim().optional(),
  featured_days: z.coerce.number().int().positive().optional(),
});

export const confirmContributionSchema = z.object({
  admin_notes: z.string().trim().optional(),
  featured_days: z.coerce.number().int().positive().optional(),
});

export const rejectContributionSchema = z.object({
  admin_notes: z.string().trim().min(2, "Las notas administrativas son obligatorias"),
});

export type CreateContributionInput = z.infer<typeof createContributionSchema>;
export type ConfirmContributionInput = z.infer<typeof confirmContributionSchema>;
export type RejectContributionInput = z.infer<typeof rejectContributionSchema>;

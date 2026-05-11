import { z } from "zod";

export const bankInfoIdParamsSchema = z.object({
  id: z.uuid("El identificador bancario no es valido"),
});

export const createBankInfoSchema = z.object({
  bank_name: z.string().trim().min(2, "El nombre del banco es obligatorio"),
  account_holder_name: z.string().trim().min(2, "El titular de la cuenta es obligatorio"),
  clabe: z.string().trim().min(10, "La CLABE no es valida").optional(),
  card_number: z.string().trim().min(8, "El numero de tarjeta no es valido").optional(),
  instructions: z.string().trim().min(2, "Las instrucciones son obligatorias").optional(),
});

export const updateBankInfoSchema = createBankInfoSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Debes enviar al menos un campo para actualizar",
);

export const activateBankInfoSchema = z.object({
  is_active: z.literal(true, {
    error: "Solo puedes activar un registro bancario con is_active en true",
  }),
});

export type CreateBankInfoInput = z.infer<typeof createBankInfoSchema>;
export type UpdateBankInfoInput = z.infer<typeof updateBankInfoSchema>;

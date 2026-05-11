import { z } from "zod";

const speciesValues = ["dog", "cat"] as const;
const genderValues = ["male", "female"] as const;
const statusValues = ["available", "in_process", "adopted"] as const;
const sizeValues = ["small", "medium", "large"] as const;

const optionalTrimmedString = z.string().trim().min(1).optional();

export const petIdParamsSchema = z.object({
  id: z.uuid("El identificador de la mascota no es valido"),
});

export const petsListQuerySchema = z.object({
  species: z.enum(speciesValues).optional(),
  age: optionalTrimmedString,
  gender: z.enum(genderValues).optional(),
  size: z.enum(sizeValues).optional(),
  location: optionalTrimmedString,
  country: optionalTrimmedString,
  state: optionalTrimmedString,
  city: optionalTrimmedString,
  status: z.enum(statusValues).optional(),
  urgent: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      return value === true || value === "true";
    }),
  featured: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .optional()
    .transform((value) => {
      if (value === undefined) {
        return undefined;
      }

      return value === true || value === "true";
    }),
  search: optionalTrimmedString,
});

export const createPetSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  species: z.enum(speciesValues, {
    error: "La especie debe ser dog o cat",
  }),
  age: z.string().trim().min(1, "La edad es obligatoria"),
  gender: z.enum(genderValues, {
    error: "El genero debe ser male o female",
  }),
  size: z.enum(sizeValues).optional(),
  location: z.string().trim().min(2, "La ubicacion es obligatoria"),
  country: z.string().trim().min(2, "El pais es obligatorio").optional(),
  state: z.string().trim().min(2, "El estado o provincia es obligatorio").optional(),
  city: z.string().trim().min(2, "La ciudad es obligatoria").optional(),
  health_status: z.string().trim().min(1, "El estado de salud es obligatorio"),
  sterilized: z.boolean().optional().default(false),
  personality: z.string().trim().min(1, "La personalidad es obligatoria"),
  description: z.string().trim().min(1, "La descripcion es obligatoria"),
  requirements: z.string().trim().min(1, "Los requisitos son obligatorios"),
  status: z.enum(statusValues).optional().default("available"),
  is_urgent: z.boolean().optional().default(false),
  is_featured: z.boolean().optional().default(false),
});

export const updatePetSchema = createPetSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Debes enviar al menos un campo para actualizar",
);

export const petStatusSchema = z.object({
  status: z.enum(statusValues, {
    error: "El estado debe ser available, in_process o adopted",
  }),
});

export const petUrgentSchema = z.object({
  is_urgent: z.boolean(),
});

export const petFeaturedSchema = z.object({
  is_featured: z.boolean(),
  featured_until: z.iso.datetime().optional(),
});

export type PetListQuery = z.infer<typeof petsListQuerySchema>;
export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>;
export type PetStatusInput = z.infer<typeof petStatusSchema>;
export type PetUrgentInput = z.infer<typeof petUrgentSchema>;
export type PetFeaturedInput = z.infer<typeof petFeaturedSchema>;

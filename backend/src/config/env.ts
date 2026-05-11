import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  FRONTEND_URL: z.string().url("FRONTEND_URL debe ser una URL valida"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET es obligatorio"),
  JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN es obligatorio"),
  SUPABASE_URL: z.string().min(1, "SUPABASE_URL es obligatorio"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY es obligatorio"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME es obligatorio"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY es obligatorio"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET es obligatorio"),
  TURNSTILE_SECRET_KEY: z.string().trim().optional().default(""),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errors = parsedEnv.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);

  throw new Error(`Configuracion de entorno invalida:\n- ${errors.join("\n- ")}`);
}

export const env = parsedEnv.data;

export type AppEnv = typeof env;

import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";
import { getSupabaseAdminClient } from "../../config/supabase";
import type { LoginInput, RegisterInput, UpdateProfileInput } from "./auth.schemas";

export type UserRole = "adopter" | "rescuer" | "admin";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  phone: string | null;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  accepted_terms_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SafeUser = Omit<UserRecord, "password_hash">;

export type AuthResponse = {
  user: SafeUser;
  token: string;
};

const userSelectFields =
  "id, name, email, password_hash, phone, role, is_verified, is_active, accepted_terms_at, created_at, updated_at";

const normalizeRole = (role: RegisterInput["role"]): Exclude<UserRole, "admin"> => {
  if (role === "adoptante") {
    return "adopter";
  }

  if (role === "rescatista") {
    return "rescuer";
  }

  return role;
};

const sanitizeUser = (user: UserRecord): SafeUser => {
  const { password_hash: _passwordHash, ...safeUser } = user;

  return safeUser;
};

const getUserByEmail = async (email: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select(userSelectFields)
    .eq("email", email)
    .maybeSingle<UserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar el usuario", [error.message]);
  }

  return data;
};

export const getUserById = async (userId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select(userSelectFields)
    .eq("id", userId)
    .maybeSingle<UserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar el usuario actual", [error.message]);
  }

  return data;
};

export const registerUser = async (input: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await getUserByEmail(input.email);

  if (existingUser) {
    throw new ApiError(409, "Ya existe una cuenta registrada con este correo");
  }

  const supabase = getSupabaseAdminClient();
  const passwordHash = await hashPassword(input.password);
  const now = new Date().toISOString();
  const role = normalizeRole(input.role);

  const { data, error } = await supabase
    .from("users")
    .insert({
      name: input.name,
      email: input.email,
      password_hash: passwordHash,
      phone: input.phone || null,
      role,
      is_verified: false,
      is_active: true,
      accepted_terms_at: now,
      created_at: now,
      updated_at: now,
    })
    .select(userSelectFields)
    .single<UserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible registrar la cuenta", [error.message]);
  }

  const token = generateToken({
    userId: data.id,
    role: data.role,
  });

  return {
    user: sanitizeUser(data),
    token,
  };
};

export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await getUserByEmail(input.email);

  if (!user) {
    throw new ApiError(401, "Correo o contrasena incorrectos");
  }

  if (!user.is_active) {
    throw new ApiError(403, "La cuenta se encuentra desactivada");
  }

  const isPasswordValid = await comparePassword(input.password, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Correo o contrasena incorrectos");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await getUserById(userId);

  if (!user || !user.is_active) {
    throw new ApiError(404, "No se encontro el usuario solicitado");
  }

  return sanitizeUser(user);
};

export const updateProfile = async (userId: string, input: UpdateProfileInput) => {
  const updates: Record<string, string> = {
    updated_at: new Date().toISOString(),
  };

  if (input.name !== undefined) {
    updates.name = input.name;
  }

  if (input.phone !== undefined) {
    updates.phone = input.phone;
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select(userSelectFields)
    .maybeSingle<UserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar el perfil", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro el usuario solicitado");
  }

  return sanitizeUser(data);
};

export const createLogoutResponse = () => {
  return {
    loggedOut: true,
  };
};

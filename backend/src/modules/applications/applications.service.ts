import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { UserRole } from "../auth/auth.service";

import type {
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from "./applications.schemas";

type Actor = {
  userId: string;
  role: UserRole;
};

type SubmitActor = {
  userId: string | null;
  role: UserRole | null;
};

export type ApplicationRecord = {
  id: string;
  pet_id: string;
  adopter_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  home_type: "house" | "apartment";
  owns_or_rents: "owns" | "rents" | null;
  has_other_pets: boolean;
  adopted_before: boolean;
  reason: string;
  accepts_followup: boolean;
  accepts_requirements: boolean;
  accepted_terms_at: string | null;
  status: "new" | "under_review" | "approved" | "rejected" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;
};

type PetAccessRecord = {
  id: string;
  owner_id: string;
  status: "available" | "in_process" | "adopted";
  is_active: boolean;
};

const applicationSelectFields =
  "id, pet_id, adopter_id, full_name, email, phone, city, home_type, owns_or_rents, has_other_pets, adopted_before, reason, accepts_followup, accepts_requirements, accepted_terms_at, status, created_at, updated_at";

const normalizeApplicationStatus = (status: UpdateApplicationStatusInput["status"]) => {
  switch (status) {
    case "nueva":
      return "new";
    case "en_revision":
      return "under_review";
    case "aprobada":
      return "approved";
    case "rechazada":
      return "rejected";
    case "cancelada":
      return "cancelled";
    case "completada":
      return "completed";
    default:
      return status;
  }
};

const getPetForApplications = async (petId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .select("id, owner_id, status, is_active")
    .eq("id", petId)
    .maybeSingle<PetAccessRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la mascota para la solicitud", [error.message]);
  }

  if (!data || !data.is_active) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

const getApplicationByIdInternal = async (applicationId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .select(applicationSelectFields)
    .eq("id", applicationId)
    .maybeSingle<ApplicationRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la solicitud", [error.message]);
  }

  return data;
};

const ensureApplicationExists = async (applicationId: string) => {
  const application = await getApplicationByIdInternal(applicationId);

  if (!application) {
    throw new ApiError(404, "No se encontro la solicitud de adopcion");
  }

  return application;
};

const ensureCanViewApplication = async (applicationId: string, actor: Actor) => {
  const application = await ensureApplicationExists(applicationId);

  if (actor.role === "admin" || application.adopter_id === actor.userId) {
    return application;
  }

  const pet = await getPetForApplications(application.pet_id);

  if (pet.owner_id !== actor.userId) {
    throw new ApiError(403, "No tienes permisos para ver esta solicitud");
  }

  return application;
};

const ensureCanManageApplication = async (applicationId: string, actor: Actor) => {
  const application = await ensureApplicationExists(applicationId);

  if (actor.role === "admin") {
    return application;
  }

  const pet = await getPetForApplications(application.pet_id);

  if (pet.owner_id !== actor.userId) {
    throw new ApiError(403, "No tienes permisos para administrar esta solicitud");
  }

  return application;
};

export const submitApplication = async (input: CreateApplicationInput, actor: SubmitActor) => {
  const pet = await getPetForApplications(input.petId);

  if (pet.status === "adopted") {
    throw new ApiError(400, "No puedes enviar una solicitud para una mascota adoptada");
  }

  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("adoption_applications")
    .insert({
      pet_id: input.petId,
      adopter_id: actor.userId,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      city: input.city,
      home_type: input.housingType,
      owns_or_rents: null,
      has_other_pets: input.otherPets,
      adopted_before: input.adoptedBefore,
      reason: input.reason,
      accepts_followup: input.followUpAccepted,
      accepts_requirements: input.requirementsAccepted,
      accepted_terms_at: now,
      status: "new",
      created_at: now,
      updated_at: now,
    })
    .select(applicationSelectFields)
    .single<ApplicationRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible registrar la solicitud de adopcion", [error.message]);
  }

  return data;
};

export const listMyApplications = async (actor: Actor) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .select(applicationSelectFields)
    .eq("adopter_id", actor.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar tus solicitudes", [error.message]);
  }

  return (data ?? []) as ApplicationRecord[];
};

export const listApplicationsByPet = async (petId: string, actor: Actor) => {
  if (actor.role !== "admin") {
    const pet = await getPetForApplications(petId);

    if (pet.owner_id !== actor.userId) {
      throw new ApiError(403, "No tienes permisos para ver las solicitudes de esta mascota");
    }
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .select(applicationSelectFields)
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las solicitudes de la mascota", [error.message]);
  }

  return (data ?? []) as ApplicationRecord[];
};

export const getApplicationDetail = async (applicationId: string, actor: Actor) => {
  return ensureCanViewApplication(applicationId, actor);
};

export const updateApplicationStatus = async (
  applicationId: string,
  input: UpdateApplicationStatusInput,
  actor: Actor,
) => {
  await ensureCanManageApplication(applicationId, actor);

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .update({
      status: normalizeApplicationStatus(input.status),
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select(applicationSelectFields)
    .maybeSingle<ApplicationRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar el estado de la solicitud", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la solicitud de adopcion");
  }

  return data;
};

export const deleteApplication = async (applicationId: string, actor: Actor) => {
  const application = await ensureApplicationExists(applicationId);

  if (actor.role !== "admin" && application.adopter_id !== actor.userId) {
    throw new ApiError(403, "No tienes permisos para cancelar esta solicitud");
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select(applicationSelectFields)
    .maybeSingle<ApplicationRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible cancelar la solicitud", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la solicitud de adopcion");
  }

  return data;
};

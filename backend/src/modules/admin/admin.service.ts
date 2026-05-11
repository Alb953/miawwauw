import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { PetRecord } from "../pets/pets.service";

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "adopter" | "rescuer" | "admin";
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminDashboardData = {
  stats: {
    users: number;
    pets: number;
    applications: number;
    complaints: number;
    reports: number;
    contributions: number;
    featuredPets: number;
    pendingComplaints: number;
    pendingFeaturedRequests: number;
    pendingReports: number;
    pendingContributions: number;
  };
};

export type AdminApplicationRecord = {
  id: string;
  pet_id: string;
  pet_name: string;
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
  status: "new" | "under_review" | "approved" | "rejected" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;
};

const adminUserSelectFields =
  "id, name, email, phone, role, is_verified, is_active, created_at, updated_at";
const adminPetSelectFields =
  "id, owner_id, name, species, age, gender, size, location, health_status, sterilized, personality, description, requirements, status, is_urgent, is_featured, featured_until, is_active, created_at, updated_at";

const countRows = async (table: string, filters?: Array<[string, unknown]>) => {
  const supabase = getSupabaseAdminClient();
  let query = supabase.from(table).select("*", { count: "exact", head: true });

  for (const [field, value] of filters ?? []) {
    query = query.eq(field, value);
  }

  const { count, error } = await query;

  if (error) {
    throw new ApiError(500, `No fue posible contar registros de ${table}`, [error.message]);
  }

  return count ?? 0;
};

export const getDashboardData = async (): Promise<AdminDashboardData> => {
  const [
    users,
    pets,
    applications,
    complaints,
    reports,
    contributions,
    featuredPets,
    pendingComplaints,
    pendingFeaturedRequests,
    pendingReports,
    pendingContributions,
  ] = await Promise.all([
    countRows("users"),
    countRows("pets"),
    countRows("adoption_applications"),
    countRows("complaints"),
    countRows("reports"),
    countRows("contributions"),
    countRows("pets", [["is_featured", true], ["is_active", true]]),
    countRows("complaints", [["status", "pending"]]),
    countRows("contributions", [
      ["status", "pending"],
      ["contribution_type", "featured_listing"],
    ]),
    countRows("reports", [["status", "pending"]]),
    countRows("contributions", [["status", "pending"]]),
  ]);

  return {
    stats: {
      users,
      pets,
      applications,
      complaints,
      reports,
      contributions,
      featuredPets,
      pendingComplaints,
      pendingFeaturedRequests,
      pendingReports,
      pendingContributions,
    },
  };
};

export const listUsers = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select(adminUserSelectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar los usuarios", [error.message]);
  }

  return (data ?? []) as AdminUserRecord[];
};

export const verifyUser = async (userId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .update({
      is_verified: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select(adminUserSelectFields)
    .maybeSingle<AdminUserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible verificar al usuario", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro el usuario");
  }

  return data;
};

export const deactivateUser = async (userId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select(adminUserSelectFields)
    .maybeSingle<AdminUserRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible desactivar al usuario", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro el usuario");
  }

  return data;
};

export const listAllPetsForAdmin = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .select(adminPetSelectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las mascotas", [error.message]);
  }

  return (data ?? []) as PetRecord[];
};

export const deactivatePetByAdmin = async (petId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", petId)
    .select(adminPetSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible desactivar la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota");
  }

  return data;
};

export const listApplicationsForAdmin = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("adoption_applications")
    .select(
      "id, pet_id, adopter_id, full_name, email, phone, city, home_type, owns_or_rents, has_other_pets, adopted_before, reason, accepts_followup, accepts_requirements, status, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las solicitudes", [error.message]);
  }

  const applications = (data ?? []) as Omit<AdminApplicationRecord, "pet_name">[];
  const petIds = [...new Set(applications.map((application) => application.pet_id).filter(Boolean))];

  const petNameById = new Map<string, string>();

  if (petIds.length > 0) {
    const { data: pets, error: petsError } = await supabase
      .from("pets")
      .select("id, name")
      .in("id", petIds);

    if (petsError) {
      throw new ApiError(500, "No fue posible consultar las mascotas de las solicitudes", [
        petsError.message,
      ]);
    }

    for (const pet of pets ?? []) {
      if (typeof pet.id === "string" && typeof pet.name === "string") {
        petNameById.set(pet.id, pet.name);
      }
    }
  }

  return applications.map((application) => ({
    ...application,
    pet_name: petNameById.get(application.pet_id) ?? "Mascota no disponible",
  })) as AdminApplicationRecord[];
};

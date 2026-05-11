import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { UserRecord } from "../auth/auth.service";
import type { ApplicationRecord } from "../applications/applications.service";
import type { PetRecord } from "../pets/pets.service";

type RescuerDashboardUser = Pick<UserRecord, "id" | "name" | "role" | "is_active">;

type RescuerDashboardApplication = Pick<
  ApplicationRecord,
  "id" | "pet_id" | "adopter_id" | "city" | "status" | "created_at"
> & {
  pet_name: string;
  applicant_name: string;
};

export type RescuerDashboardData = {
  rescuer: {
    id: string;
    name: string;
  };
  stats: {
    pets: number;
    applications: number;
    urgent: number;
    featured: number;
  };
  quick_notes: string[];
  pets: PetRecord[];
  applications: RescuerDashboardApplication[];
};

const userSelectFields = "id, name, role, is_active";
const petSelectFields =
  "id, owner_id, name, species, age, gender, size, location, country, state, city, health_status, sterilized, personality, description, requirements, status, is_urgent, is_featured, featured_until, is_active, created_at, updated_at";
const applicationSelectFields = "id, pet_id, adopter_id, city, status, created_at";

const expireFeaturedPetsIfNeeded = async () => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("pets")
    .update({
      is_featured: false,
      featured_until: null,
      updated_at: now,
    })
    .eq("is_featured", true)
    .lt("featured_until", now);

  if (error) {
    throw new ApiError(500, "No fue posible actualizar los destacados vencidos", [
      error.message,
    ]);
  }
};

export const getRescuerDashboardData = async (userId: string): Promise<RescuerDashboardData> => {
  const supabase = getSupabaseAdminClient();
  await expireFeaturedPetsIfNeeded();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select(userSelectFields)
    .eq("id", userId)
    .maybeSingle<RescuerDashboardUser>();

  if (userError) {
    throw new ApiError(500, "No fue posible consultar el rescatista", [userError.message]);
  }

  if (!user || !user.is_active || user.role !== "rescuer") {
    throw new ApiError(404, "No se encontro el rescatista solicitado");
  }

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select(petSelectFields)
    .eq("owner_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (petsError) {
    throw new ApiError(500, "No fue posible consultar tus mascotas", [petsError.message]);
  }

  const petsList = (pets ?? []) as PetRecord[];
  const petIds = petsList.map((pet) => pet.id);

  if (petIds.length === 0) {
    return {
      rescuer: {
        id: user.id,
        name: user.name,
      },
      stats: {
        pets: 0,
        applications: 0,
        urgent: 0,
        featured: 0,
      },
      quick_notes: [
        "Registra tu primera mascota para empezar a recibir solicitudes.",
        "Manten actualizado el estado de adopcion de cada perfil.",
        "Las solicitudes nuevas merecen seguimiento dentro de las primeras 24 horas.",
      ],
      pets: [],
      applications: [],
    };
  }

  const { data: applications, error: applicationsError } = await supabase
    .from("adoption_applications")
    .select(applicationSelectFields)
    .in("pet_id", petIds)
    .order("created_at", { ascending: false });

  if (applicationsError) {
    throw new ApiError(500, "No fue posible consultar las solicitudes recibidas", [
      applicationsError.message,
    ]);
  }

  const applicationsList = (applications ?? []) as Pick<
    ApplicationRecord,
    "id" | "pet_id" | "adopter_id" | "city" | "status" | "created_at"
  >[];
  const adopterIds = Array.from(
    new Set(applicationsList.map((application) => application.adopter_id).filter(Boolean)),
  );

  let applicantNameMap = new Map<string, string>();

  if (adopterIds.length > 0) {
    const { data: applicants, error: applicantsError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", adopterIds);

    if (applicantsError) {
      throw new ApiError(500, "No fue posible consultar a las personas interesadas", [
        applicantsError.message,
      ]);
    }

    applicantNameMap = new Map(
      (applicants ?? []).map((applicant) => [applicant.id as string, applicant.name as string]),
    );
  }

  const petNameMap = new Map(petsList.map((pet) => [pet.id, pet.name]));

  return {
    rescuer: {
      id: user.id,
      name: user.name,
    },
    stats: {
      pets: petsList.length,
      applications: applicationsList.length,
      urgent: petsList.filter((pet) => pet.is_urgent).length,
      featured: petsList.filter((pet) => pet.is_featured).length,
    },
    quick_notes: [
      "Manten actualizada la disponibilidad de cada mascota.",
      "Las solicitudes nuevas deben revisarse dentro de las primeras 24 horas.",
      "Puedes marcar un caso urgente o solicitar visibilidad destacada.",
    ],
    pets: petsList,
    applications: applicationsList.map((application) => ({
      id: application.id,
      pet_id: application.pet_id,
      pet_name: petNameMap.get(application.pet_id) ?? "Mascota sin nombre",
      adopter_id: application.adopter_id,
      applicant_name:
        (application.adopter_id
          ? applicantNameMap.get(application.adopter_id)
          : null) ?? "Persona interesada sin nombre",
      city: application.city,
      status: application.status,
      created_at: application.created_at,
    })),
  };
};

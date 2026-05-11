import { uploadBufferToCloudinary } from "../../config/cloudinary";
import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { UserRole } from "../auth/auth.service";
import type {
  CreatePetInput,
  PetFeaturedInput,
  PetListQuery,
  PetStatusInput,
  PetUrgentInput,
  UpdatePetInput,
} from "./pets.schemas";

export type PetRecord = {
  id: string;
  owner_id: string;
  name: string;
  species: "dog" | "cat";
  age: string;
  gender: "male" | "female";
  size: "small" | "medium" | "large" | null;
  location: string;
  country: string | null;
  state: string | null;
  city: string | null;
  health_status: string;
  sterilized: boolean;
  personality: string;
  description: string;
  requirements: string;
  status: "available" | "in_process" | "adopted";
  is_urgent: boolean;
  is_featured: boolean;
  featured_until: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type Actor = {
  userId: string;
  role: UserRole;
};

export type PetImageRecord = {
  id: string;
  pet_id: string;
  image_url: string;
  cloudinary_public_id: string | null;
  is_main: boolean;
  created_at: string;
};

export type PetDetailRecord = PetRecord & {
  pet_images: PetImageRecord[];
};

const petSelectFields =
  "id, owner_id, name, species, age, gender, size, location, country, state, city, health_status, sterilized, personality, description, requirements, status, is_urgent, is_featured, featured_until, is_active, created_at, updated_at";

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
    throw new ApiError(500, "No fue posible actualizar las mascotas destacadas vencidas", [
      error.message,
    ]);
  }
};

const getPetByIdInternal = async (petId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .select(petSelectFields)
    .eq("id", petId)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la mascota", [error.message]);
  }

  return data;
};

const ensurePetExists = async (petId: string) => {
  const pet = await getPetByIdInternal(petId);

  if (!pet) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return pet;
};

const ensureCanManagePet = async (petId: string, actor: Actor) => {
  const pet = await ensurePetExists(petId);

  if (actor.role !== "admin" && pet.owner_id !== actor.userId) {
    throw new ApiError(403, "No tienes permisos para administrar esta mascota");
  }

  return pet;
};

export const listPets = async (filters: PetListQuery) => {
  await expireFeaturedPetsIfNeeded();

  const supabase = getSupabaseAdminClient();
  let query = supabase
    .from("pets")
    .select(
      `${petSelectFields}, pet_images(id, pet_id, image_url, cloudinary_public_id, is_main, created_at)`,
    )
    .eq("is_active", true)
    .neq("status", "adopted");

  if (filters.species) {
    query = query.eq("species", filters.species);
  }

  if (filters.age) {
    query = query.eq("age", filters.age);
  }

  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }

  if (filters.size) {
    query = query.eq("size", filters.size);
  }

  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }

  if (filters.country) {
    query = query.ilike("country", `%${filters.country}%`);
  }

  if (filters.state) {
    query = query.ilike("state", `%${filters.state}%`);
  }

  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.urgent !== undefined) {
    query = query.eq("is_urgent", filters.urgent);
  }

  if (filters.featured !== undefined) {
    query = query.eq("is_featured", filters.featured);
  }

  if (filters.search) {
    const term = `%${filters.search}%`;
    query = query.or(
      `name.ilike.${term},description.ilike.${term},location.ilike.${term},country.ilike.${term},state.ilike.${term},city.ilike.${term}`,
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las mascotas", [error.message]);
  }

  return ((data ?? []) as PetDetailRecord[]).map((pet) => ({
    ...pet,
    pet_images: (pet.pet_images ?? []).sort((a, b) => {
      if (a.is_main !== b.is_main) {
        return a.is_main ? -1 : 1;
      }

      return a.created_at.localeCompare(b.created_at);
    }),
  }));
};

export const getPublicPetDetail = async (petId: string) => {
  await expireFeaturedPetsIfNeeded();

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .select(
      `${petSelectFields}, pet_images(id, pet_id, image_url, cloudinary_public_id, is_main, created_at)`,
    )
    .eq("id", petId)
    .maybeSingle<PetDetailRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la mascota", [error.message]);
  }

  if (!data || !data.is_active || data.status === "adopted") {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return {
    ...data,
    pet_images: (data.pet_images ?? []).sort((a, b) => {
      if (a.is_main !== b.is_main) {
        return a.is_main ? -1 : 1;
      }

      return a.created_at.localeCompare(b.created_at);
    }),
  };
};

export const createPet = async (input: CreatePetInput, actor: Actor) => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("pets")
    .insert({
      owner_id: actor.userId,
      ...input,
      is_featured: actor.role === "admin" ? input.is_featured : false,
      featured_until: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    })
    .select(petSelectFields)
    .single<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible crear la mascota", [error.message]);
  }

  return data;
};

export const updatePet = async (petId: string, input: UpdatePetInput, actor: Actor) => {
  const existingPet = await ensureCanManagePet(petId, actor);
  const updates = {
    ...input,
    is_featured:
      actor.role === "admin"
        ? input.is_featured ?? existingPet.is_featured
        : existingPet.is_featured,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update(updates)
    .eq("id", petId)
    .select(petSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

export const deactivatePet = async (petId: string, actor: Actor) => {
  await ensureCanManagePet(petId, actor);

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", petId)
    .select(petSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible desactivar la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

export const updatePetStatus = async (petId: string, input: PetStatusInput, actor: Actor) => {
  await ensureCanManagePet(petId, actor);

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update({
      status: input.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", petId)
    .select(petSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar el estado de la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

export const updatePetUrgent = async (petId: string, input: PetUrgentInput, actor: Actor) => {
  await ensureCanManagePet(petId, actor);

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update({
      is_urgent: input.is_urgent,
      updated_at: new Date().toISOString(),
    })
    .eq("id", petId)
    .select(petSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar la prioridad de la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

export const updatePetFeatured = async (petId: string, input: PetFeaturedInput) => {
  await ensurePetExists(petId);

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .update({
      is_featured: input.is_featured,
      featured_until: input.is_featured ? input.featured_until ?? null : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", petId)
    .select(petSelectFields)
    .maybeSingle<PetRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar el destacado de la mascota", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la mascota solicitada");
  }

  return data;
};

export const uploadPetImages = async (petId: string, files: Express.Multer.File[], actor: Actor) => {
  if (files.length === 0) {
    throw new ApiError(400, "Debes adjuntar al menos una imagen");
  }

  await ensureCanManagePet(petId, actor);

  const supabase = getSupabaseAdminClient();
  const uploadedImages = await Promise.all(
    files.map(async (file, index) => {
      const uploadedFile = await uploadBufferToCloudinary(file, "adopta-miauw-wau/pets");

      return {
        pet_id: petId,
        image_url: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
        is_main: index === 0,
      };
    }),
  );

  const { data, error } = await supabase
    .from("pet_images")
    .insert(uploadedImages)
    .select("id, pet_id, image_url, cloudinary_public_id, is_main, created_at");

  if (error) {
    throw new ApiError(500, "No fue posible guardar las imagenes de la mascota", [error.message]);
  }

  return (data ?? []) as PetImageRecord[];
};

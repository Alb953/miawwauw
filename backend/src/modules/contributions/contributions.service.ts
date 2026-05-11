import { uploadBufferToCloudinary } from "../../config/cloudinary";
import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { UserRole } from "../auth/auth.service";
import type {
  ConfirmContributionInput,
  CreateContributionInput,
  RejectContributionInput,
} from "./contributions.schemas";

type Actor = {
  userId: string;
  role: UserRole;
};

type ContributionActor = {
  userId?: string;
  role?: UserRole;
};

type PetContributionRecord = {
  id: string;
  owner_id: string;
  is_active: boolean;
  is_featured?: boolean;
};

export type ContributionRecord = {
  id: string;
  user_id: string | null;
  pet_id: string | null;
  contribution_type: "donation" | "featured_listing" | "veterinary_partner" | "sponsorship";
  amount: number;
  status: "pending" | "confirmed" | "rejected";
  bank_name: string | null;
  account_holder_name: string | null;
  reference_note: string | null;
  proof_image_url: string | null;
  proof_cloudinary_public_id: string | null;
  admin_notes: string | null;
  featured_days: number | null;
  created_at: string;
  confirmed_at: string | null;
};

const contributionSelectFields =
  "id, user_id, pet_id, contribution_type, amount, status, bank_name, account_holder_name, reference_note, proof_image_url, proof_cloudinary_public_id, admin_notes, featured_days, created_at, confirmed_at";

const getContributionByIdInternal = async (contributionId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .select(contributionSelectFields)
    .eq("id", contributionId)
    .maybeSingle<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la contribucion", [error.message]);
  }

  return data;
};

const ensureContributionExists = async (contributionId: string) => {
  const contribution = await getContributionByIdInternal(contributionId);

  if (!contribution) {
    throw new ApiError(404, "No se encontro la contribucion");
  }

  return contribution;
};

const ensurePetCanReceiveFeaturedListing = async (petId: string, actor?: ContributionActor) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("pets")
    .select("id, owner_id, is_active")
    .eq("id", petId)
    .maybeSingle<PetContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la mascota relacionada", [error.message]);
  }

  if (!data || !data.is_active) {
    throw new ApiError(404, "No se encontro la mascota relacionada");
  }

  if (actor?.role !== "admin" && actor?.userId && data.owner_id !== actor.userId) {
    throw new ApiError(403, "Solo el propietario de la mascota puede destacarla");
  }

  return data;
};

const MAX_FEATURED_PETS_GLOBAL = 4;

const findPendingFeaturedContributionByPet = async (petId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .select(contributionSelectFields)
    .eq("pet_id", petId)
    .eq("contribution_type", "featured_listing")
    .eq("status", "pending")
    .maybeSingle<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar las solicitudes destacadas pendientes", [
      error.message,
    ]);
  }

  return data;
};

const ensureGlobalFeaturedLimitNotExceeded = async (targetPetId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data: activePets, error: petsError } = await supabase
    .from("pets")
    .select("id, is_featured")
    .eq("is_active", true);

  if (petsError) {
    throw new ApiError(500, "No fue posible validar el limite de mascotas destacadas", [
      petsError.message,
    ]);
  }

  const featuredPetIds = new Set(
    (activePets ?? [])
      .filter((pet) => Boolean(pet.is_featured))
      .map((pet) => pet.id)
      .filter((petId): petId is string => typeof petId === "string"),
  );

  const activePetIds = (activePets ?? [])
    .map((pet) => pet.id)
    .filter((petId): petId is string => typeof petId === "string");

  const pendingFeaturedPetIds = new Set<string>();

  if (activePetIds.length > 0) {
    const { data: pendingContributions, error: contributionsError } = await supabase
      .from("contributions")
      .select("pet_id")
      .in("pet_id", activePetIds)
      .eq("contribution_type", "featured_listing")
      .eq("status", "pending");

    if (contributionsError) {
      throw new ApiError(500, "No fue posible validar las solicitudes destacadas pendientes", [
        contributionsError.message,
      ]);
    }

    for (const contribution of pendingContributions ?? []) {
      if (typeof contribution.pet_id === "string") {
        pendingFeaturedPetIds.add(contribution.pet_id);
      }
    }
  }

  const occupiedFeaturedSlots = new Set([...featuredPetIds, ...pendingFeaturedPetIds]);

  if (
    occupiedFeaturedSlots.size >= MAX_FEATURED_PETS_GLOBAL &&
    !occupiedFeaturedSlots.has(targetPetId)
  ) {
    throw new ApiError(
      400,
      "La plataforma solo puede tener hasta 4 mascotas destacadas o en espera de aprobacion al mismo tiempo",
    );
  }
};

const ensureCanManageContributionProof = async (contributionId: string, actor: Actor) => {
  const contribution = await ensureContributionExists(contributionId);

  if (actor.role !== "admin" && contribution.user_id !== actor.userId) {
    throw new ApiError(403, "No tienes permisos para cargar el comprobante de esta contribucion");
  }

  return contribution;
};

export const createContribution = async (input: CreateContributionInput, actor?: ContributionActor) => {
  if (input.contribution_type === "featured_listing") {
    if (!input.pet_id) {
      throw new ApiError(400, "Debes indicar una mascota para destacar");
    }

    if (!actor?.userId) {
      throw new ApiError(401, "Debes iniciar sesion como rescatista para solicitar destacado");
    }

    await ensurePetCanReceiveFeaturedListing(input.pet_id, actor);
    await ensureGlobalFeaturedLimitNotExceeded(input.pet_id);

    const existingPendingContribution = await findPendingFeaturedContributionByPet(input.pet_id);

    if (existingPendingContribution) {
      throw new ApiError(
        409,
        "Ya existe una solicitud pendiente de visibilidad destacada para esta mascota",
      );
    }
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .insert({
      user_id: actor?.userId ?? null,
      pet_id: input.pet_id ?? null,
      contribution_type: input.contribution_type,
      amount: input.amount,
      status: "pending",
      bank_name: input.bank_name ?? null,
      account_holder_name: input.account_holder_name ?? null,
      reference_note: input.reference_note ?? null,
      featured_days: input.featured_days ?? null,
    })
    .select(contributionSelectFields)
    .single<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible registrar la contribucion", [error.message]);
  }

  return data;
};

export const uploadContributionProof = async (
  contributionId: string,
  file: Express.Multer.File,
  actor: Actor,
) => {
  await ensureCanManageContributionProof(contributionId, actor);

  const uploadedFile = await uploadBufferToCloudinary(file, "adopta-miauw-wau/contributions");
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .update({
      proof_image_url: uploadedFile.secure_url,
      proof_cloudinary_public_id: uploadedFile.public_id,
    })
    .eq("id", contributionId)
    .select(contributionSelectFields)
    .maybeSingle<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible guardar el comprobante de contribucion", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la contribucion");
  }

  return data;
};

export const listMyContributions = async (actor: Actor) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .select(contributionSelectFields)
    .eq("user_id", actor.userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar tus contribuciones", [error.message]);
  }

  return (data ?? []) as ContributionRecord[];
};

export const listAllContributions = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .select(contributionSelectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las contribuciones", [error.message]);
  }

  return (data ?? []) as ContributionRecord[];
};

export const confirmContribution = async (contributionId: string, input: ConfirmContributionInput) => {
  const contribution = await ensureContributionExists(contributionId);

  const supabase = getSupabaseAdminClient();
  const confirmedAt = new Date().toISOString();
  const featuredDays = input.featured_days ?? contribution.featured_days ?? null;

  const { data, error } = await supabase
    .from("contributions")
    .update({
      status: "confirmed",
      admin_notes: input.admin_notes ?? null,
      featured_days: featuredDays,
      confirmed_at: confirmedAt,
    })
    .eq("id", contributionId)
    .select(contributionSelectFields)
    .maybeSingle<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible confirmar la contribucion", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la contribucion");
  }

  if (data.contribution_type === "featured_listing" && data.pet_id) {
    const daysToFeature = featuredDays ?? 30;
    const featuredUntil = new Date();
    featuredUntil.setDate(featuredUntil.getDate() + daysToFeature);

    const { error: petError } = await supabase
      .from("pets")
      .update({
        is_featured: true,
        featured_until: featuredUntil.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.pet_id);

    if (petError) {
      throw new ApiError(500, "La contribucion se confirmo, pero no fue posible destacar la mascota", [
        petError.message,
      ]);
    }
  }

  return data;
};

export const rejectContribution = async (contributionId: string, input: RejectContributionInput) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("contributions")
    .update({
      status: "rejected",
      admin_notes: input.admin_notes,
      confirmed_at: null,
    })
    .eq("id", contributionId)
    .select(contributionSelectFields)
    .maybeSingle<ContributionRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible rechazar la contribucion", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la contribucion");
  }

  return data;
};

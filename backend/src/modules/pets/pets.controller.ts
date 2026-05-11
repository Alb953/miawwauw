import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import {
  createPet,
  deactivatePet,
  getPublicPetDetail,
  listPets,
  uploadPetImages,
  updatePet,
  updatePetFeatured,
  updatePetStatus,
  updatePetUrgent,
} from "./pets.service";
import type {
  CreatePetInput,
  PetFeaturedInput,
  PetListQuery,
  PetStatusInput,
  PetUrgentInput,
  UpdatePetInput,
} from "./pets.schemas";

export const getPets = asyncHandler(async (req: Request, res: Response) => {
  const pets = await listPets(req.query as unknown as PetListQuery);

  res.status(200).json(apiResponse(pets, "Mascotas obtenidas correctamente"));
});

export const getPetById = asyncHandler(async (req: Request, res: Response) => {
  const pet = await getPublicPetDetail(req.params.id as string);

  res.status(200).json(apiResponse(pet, "Mascota obtenida correctamente"));
});

export const createPetHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await createPet(req.body as CreatePetInput, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(201).json(apiResponse(pet, "Mascota creada correctamente"));
});

export const updatePetHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await updatePet(req.params.id as string, req.body as UpdatePetInput, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(pet, "Mascota actualizada correctamente"));
});

export const deactivatePetHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await deactivatePet(req.params.id as string, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(pet, "Mascota desactivada correctamente"));
});

export const updatePetStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await updatePetStatus(req.params.id as string, req.body as PetStatusInput, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(pet, "Estado actualizado correctamente"));
});

export const updatePetUrgentHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await updatePetUrgent(req.params.id as string, req.body as PetUrgentInput, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(pet, "Prioridad actualizada correctamente"));
});

export const updatePetFeaturedHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await updatePetFeatured(req.params.id as string, req.body as PetFeaturedInput);

  res.status(200).json(apiResponse(pet, "Destacado actualizado correctamente"));
});

export const uploadPetImagesHandler = asyncHandler(async (req: Request, res: Response) => {
  const images = await uploadPetImages(req.params.id as string, (req.files as Express.Multer.File[] | undefined) ?? [], {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(201).json(apiResponse(images, "Imagenes cargadas correctamente"));
});

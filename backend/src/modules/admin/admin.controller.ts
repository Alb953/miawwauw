import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import {
  deactivatePetByAdmin,
  deactivateUser,
  getDashboardData,
  listApplicationsForAdmin,
  listAllPetsForAdmin,
  listUsers,
  verifyUser,
} from "./admin.service";

export const getDashboardHandler = asyncHandler(async (_req: Request, res: Response) => {
  const dashboard = await getDashboardData();

  res.status(200).json(apiResponse(dashboard, "Panel administrativo obtenido correctamente"));
});

export const getUsersHandler = asyncHandler(async (_req: Request, res: Response) => {
  const users = await listUsers();

  res.status(200).json(apiResponse(users, "Usuarios obtenidos correctamente"));
});

export const verifyUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await verifyUser(req.params.id as string);

  res.status(200).json(apiResponse(user, "Usuario verificado correctamente"));
});

export const deactivateUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await deactivateUser(req.params.id as string);

  res.status(200).json(apiResponse(user, "Usuario desactivado correctamente"));
});

export const getAdminPetsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const pets = await listAllPetsForAdmin();

  res.status(200).json(apiResponse(pets, "Mascotas obtenidas correctamente"));
});

export const getAdminApplicationsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const applications = await listApplicationsForAdmin();

  res.status(200).json(apiResponse(applications, "Solicitudes obtenidas correctamente"));
});

export const deactivateAdminPetHandler = asyncHandler(async (req: Request, res: Response) => {
  const pet = await deactivatePetByAdmin(req.params.id as string);

  res.status(200).json(apiResponse(pet, "Mascota desactivada correctamente"));
});

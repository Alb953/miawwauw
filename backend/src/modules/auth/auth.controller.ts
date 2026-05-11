import type { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { apiResponse } from "../../utils/apiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { verifyTurnstileToken } from "../../utils/turnstile";
import {
  createLogoutResponse,
  getCurrentUser,
  loginUser,
  registerUser,
  updateProfile,
} from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const turnstileToken =
    typeof req.body.turnstile_token === "string" ? req.body.turnstile_token.trim() : "";
  const turnstileVerification = await verifyTurnstileToken(turnstileToken, req.ip);

  if (turnstileVerification.enabled && !turnstileToken) {
    throw new ApiError(400, "Completa la verificacion antispam antes de crear tu cuenta.");
  }

  if (turnstileVerification.enabled && !turnstileVerification.success) {
    throw new ApiError(400, "No pudimos validar la verificacion antispam. Intenta de nuevo.");
  }

  const result = await registerUser(req.body);

  res.status(201).json(apiResponse(result, "Registro completado correctamente"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res.status(200).json(apiResponse(result, "Inicio de sesion completado correctamente"));
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const result = await getCurrentUser(req.user!.id);

  res.status(200).json(apiResponse(result, "Usuario autenticado correctamente"));
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const result = await updateProfile(req.user!.id, req.body);

  res.status(200).json(apiResponse(result, "Perfil actualizado correctamente"));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json(apiResponse(createLogoutResponse(), "Sesion cerrada correctamente"));
});

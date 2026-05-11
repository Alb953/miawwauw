import type { Request, Response } from "express";

import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import { verifyTurnstileToken } from "../../utils/turnstile";
import {
  deleteApplication,
  getApplicationDetail,
  listApplicationsByPet,
  listMyApplications,
  submitApplication,
  updateApplicationStatus,
} from "./applications.service";
import type {
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from "./applications.schemas";

export const submitApplicationHandler = asyncHandler(async (req: Request, res: Response) => {
  const turnstileToken =
    typeof req.body.turnstile_token === "string" ? req.body.turnstile_token.trim() : "";
  const turnstileVerification = await verifyTurnstileToken(turnstileToken, req.ip);

  if (turnstileVerification.enabled && !turnstileToken) {
    throw new ApiError(400, "Completa la verificacion antispam antes de enviar la solicitud.");
  }

  if (turnstileVerification.enabled && !turnstileVerification.success) {
    throw new ApiError(400, "No pudimos validar la verificacion antispam. Intenta de nuevo.");
  }

  const application = await submitApplication(req.body as CreateApplicationInput, {
    userId: req.user?.id ?? null,
    role: req.user?.role ?? null,
  });

  res.status(201).json(apiResponse(application, "Solicitud enviada correctamente"));
});

export const getMyApplicationsHandler = asyncHandler(async (req: Request, res: Response) => {
  const applications = await listMyApplications({
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(applications, "Solicitudes obtenidas correctamente"));
});

export const getPetApplicationsHandler = asyncHandler(async (req: Request, res: Response) => {
  const applications = await listApplicationsByPet(req.params.id as string, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(applications, "Solicitudes de la mascota obtenidas correctamente"));
});

export const getApplicationDetailHandler = asyncHandler(async (req: Request, res: Response) => {
  const application = await getApplicationDetail(req.params.id as string, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(application, "Solicitud obtenida correctamente"));
});

export const updateApplicationStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const application = await updateApplicationStatus(
    req.params.id as string,
    req.body as UpdateApplicationStatusInput,
    {
      userId: req.user!.id,
      role: req.user!.role,
    },
  );

  res.status(200).json(apiResponse(application, "Estado de la solicitud actualizado correctamente"));
});

export const deleteApplicationHandler = asyncHandler(async (req: Request, res: Response) => {
  const application = await deleteApplication(req.params.id as string, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(application, "Solicitud cancelada correctamente"));
});

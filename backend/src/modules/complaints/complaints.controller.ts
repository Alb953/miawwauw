import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { apiResponse } from "../../utils/apiResponse";
import { verifyTurnstileToken } from "../../utils/turnstile";
import {
  createComplaint,
  getComplaintDetail,
  listComplaints,
  updateComplaintStatus,
} from "./complaints.service";
import type { CreateComplaintInput, UpdateComplaintStatusInput } from "./complaints.schemas";

export const createComplaintHandler = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as CreateComplaintInput;
  const formLoadedAt = input.form_loaded_at;
  const submissionDelayMs = Date.now() - formLoadedAt;

  if (input.website?.trim()) {
    throw new ApiError(400, "No fue posible procesar la solicitud");
  }

  if (submissionDelayMs < 3000) {
    throw new ApiError(400, "La queja se envio demasiado rapido. Intenta de nuevo.");
  }

  if (submissionDelayMs > 1000 * 60 * 60 * 6) {
    throw new ApiError(400, "La sesion del formulario expiro. Recarga la pagina e intenta de nuevo.");
  }

  const turnstileVerification = await verifyTurnstileToken(
    input.turnstile_token?.trim() ?? "",
    req.ip,
  );

  if (turnstileVerification.enabled && !input.turnstile_token?.trim()) {
    throw new ApiError(400, "Completa la verificacion antispam antes de enviar la queja.");
  }

  if (turnstileVerification.enabled && !turnstileVerification.success) {
    throw new ApiError(400, "No pudimos validar la verificacion antispam. Intenta de nuevo.");
  }

  const complaint = await createComplaint(input, req.user?.id);

  res.status(201).json(apiResponse(complaint, "Queja enviada correctamente"));
});

export const getComplaintsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const complaints = await listComplaints();

  res.status(200).json(apiResponse(complaints, "Quejas obtenidas correctamente"));
});

export const getComplaintDetailHandler = asyncHandler(async (req: Request, res: Response) => {
  const complaint = await getComplaintDetail(req.params.id as string);

  res.status(200).json(apiResponse(complaint, "Queja obtenida correctamente"));
});

export const updateComplaintStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const complaint = await updateComplaintStatus(
    req.params.id as string,
    req.body as UpdateComplaintStatusInput,
  );

  res.status(200).json(apiResponse(complaint, "Queja actualizada correctamente"));
});

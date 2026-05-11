import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { apiResponse } from "../../utils/apiResponse";
import {
  confirmContribution,
  createContribution,
  listAllContributions,
  listMyContributions,
  rejectContribution,
  uploadContributionProof,
} from "./contributions.service";
import type {
  ConfirmContributionInput,
  CreateContributionInput,
  RejectContributionInput,
} from "./contributions.schemas";

export const createContributionHandler = asyncHandler(async (req: Request, res: Response) => {
  const contribution = await createContribution(req.body as CreateContributionInput, {
    userId: req.user?.id,
    role: req.user?.role,
  });

  res.status(201).json(apiResponse(contribution, "Contribucion registrada correctamente"));
});

export const uploadContributionProofHandler = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(400, "Debes adjuntar un comprobante de pago");
  }

  const contribution = await uploadContributionProof(req.params.id as string, file, {
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(contribution, "Comprobante cargado correctamente"));
});

export const getMyContributionsHandler = asyncHandler(async (req: Request, res: Response) => {
  const contributions = await listMyContributions({
    userId: req.user!.id,
    role: req.user!.role,
  });

  res.status(200).json(apiResponse(contributions, "Contribuciones obtenidas correctamente"));
});

export const getAllContributionsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const contributions = await listAllContributions();

  res.status(200).json(apiResponse(contributions, "Contribuciones obtenidas correctamente"));
});

export const confirmContributionHandler = asyncHandler(async (req: Request, res: Response) => {
  const contribution = await confirmContribution(req.params.id as string, req.body as ConfirmContributionInput);

  res.status(200).json(apiResponse(contribution, "Contribucion confirmada correctamente"));
});

export const rejectContributionHandler = asyncHandler(async (req: Request, res: Response) => {
  const contribution = await rejectContribution(req.params.id as string, req.body as RejectContributionInput);

  res.status(200).json(apiResponse(contribution, "Contribucion rechazada correctamente"));
});

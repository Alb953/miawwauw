import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import {
  activateBankInfo,
  createBankInfo,
  getActiveBankInfo,
  updateBankInfo,
} from "./bankInfo.service";
import type { CreateBankInfoInput, UpdateBankInfoInput } from "./bankInfo.schemas";

export const getActiveBankInfoHandler = asyncHandler(async (_req: Request, res: Response) => {
  const bankInfo = await getActiveBankInfo();

  res.status(200).json(apiResponse(bankInfo, "Informacion bancaria obtenida correctamente"));
});

export const createBankInfoHandler = asyncHandler(async (req: Request, res: Response) => {
  const bankInfo = await createBankInfo(req.body as CreateBankInfoInput);

  res.status(201).json(apiResponse(bankInfo, "Informacion bancaria creada correctamente"));
});

export const updateBankInfoHandler = asyncHandler(async (req: Request, res: Response) => {
  const bankInfo = await updateBankInfo(req.params.id as string, req.body as UpdateBankInfoInput);

  res.status(200).json(apiResponse(bankInfo, "Informacion bancaria actualizada correctamente"));
});

export const activateBankInfoHandler = asyncHandler(async (req: Request, res: Response) => {
  const bankInfo = await activateBankInfo(req.params.id as string);

  res.status(200).json(apiResponse(bankInfo, "Informacion bancaria activada correctamente"));
});

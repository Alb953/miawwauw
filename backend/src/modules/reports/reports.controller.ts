import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import {
  createReport,
  getReportDetail,
  listReports,
  updateReportStatus,
} from "./reports.service";
import type { CreateReportInput, UpdateReportStatusInput } from "./reports.schemas";

export const createReportHandler = asyncHandler(async (req: Request, res: Response) => {
  const report = await createReport(req.body as CreateReportInput, req.user!.id);

  res.status(201).json(apiResponse(report, "Reporte enviado correctamente"));
});

export const getReportsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await listReports();

  res.status(200).json(apiResponse(reports, "Reportes obtenidos correctamente"));
});

export const getReportDetailHandler = asyncHandler(async (req: Request, res: Response) => {
  const report = await getReportDetail(req.params.id as string);

  res.status(200).json(apiResponse(report, "Reporte obtenido correctamente"));
});

export const updateReportStatusHandler = asyncHandler(async (req: Request, res: Response) => {
  const report = await updateReportStatus(req.params.id as string, req.body as UpdateReportStatusInput);

  res.status(200).json(apiResponse(report, "Reporte actualizado correctamente"));
});

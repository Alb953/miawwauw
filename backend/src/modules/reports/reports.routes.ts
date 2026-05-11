import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createReportHandler,
  getReportDetailHandler,
  getReportsHandler,
  updateReportStatusHandler,
} from "./reports.controller";
import {
  createReportSchema,
  reportIdParamsSchema,
  updateReportStatusSchema,
} from "./reports.schemas";

const reportsRouter = Router();
const adminReportsRouter = Router();

reportsRouter.post(
  "/",
  authMiddleware,
  validateRequest({ body: createReportSchema }),
  createReportHandler,
);

adminReportsRouter.get("/", authMiddleware, roleMiddleware("admin"), getReportsHandler);

adminReportsRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: reportIdParamsSchema }),
  getReportDetailHandler,
);

adminReportsRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: reportIdParamsSchema, body: updateReportStatusSchema }),
  updateReportStatusHandler,
);

export { adminReportsRouter, reportsRouter };

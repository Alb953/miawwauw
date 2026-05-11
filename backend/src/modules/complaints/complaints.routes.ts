import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { optionalAuthMiddleware } from "../../middleware/optionalAuthMiddleware";
import { complaintsRateLimiter } from "../../middleware/rateLimit";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createComplaintHandler,
  getComplaintDetailHandler,
  getComplaintsHandler,
  updateComplaintStatusHandler,
} from "./complaints.controller";
import {
  complaintIdParamsSchema,
  createComplaintSchema,
  updateComplaintStatusSchema,
} from "./complaints.schemas";

const complaintsRouter = Router();
const adminComplaintsRouter = Router();

complaintsRouter.post(
  "/",
  complaintsRateLimiter,
  optionalAuthMiddleware,
  validateRequest({ body: createComplaintSchema }),
  createComplaintHandler,
);

adminComplaintsRouter.get("/", authMiddleware, roleMiddleware("admin"), getComplaintsHandler);

adminComplaintsRouter.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: complaintIdParamsSchema }),
  getComplaintDetailHandler,
);

adminComplaintsRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: complaintIdParamsSchema, body: updateComplaintStatusSchema }),
  updateComplaintStatusHandler,
);

export { adminComplaintsRouter, complaintsRouter };

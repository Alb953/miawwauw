import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { optionalAuthMiddleware } from "../../middleware/optionalAuthMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  deleteApplicationHandler,
  getApplicationDetailHandler,
  getMyApplicationsHandler,
  getPetApplicationsHandler,
  submitApplicationHandler,
  updateApplicationStatusHandler,
} from "./applications.controller";
import {
  applicationIdParamsSchema,
  createApplicationSchema,
  petApplicationsParamsSchema,
  updateApplicationStatusSchema,
} from "./applications.schemas";

const applicationsRouter = Router();

applicationsRouter.post(
  "/",
  optionalAuthMiddleware,
  validateRequest({ body: createApplicationSchema }),
  submitApplicationHandler,
);

applicationsRouter.get("/my", authMiddleware, roleMiddleware("adopter"), getMyApplicationsHandler);

applicationsRouter.get(
  "/:id",
  authMiddleware,
  validateRequest({ params: applicationIdParamsSchema }),
  getApplicationDetailHandler,
);

applicationsRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: applicationIdParamsSchema, body: updateApplicationStatusSchema }),
  updateApplicationStatusHandler,
);

applicationsRouter.delete(
  "/:id",
  authMiddleware,
  validateRequest({ params: applicationIdParamsSchema }),
  deleteApplicationHandler,
);

const petApplicationsRouter = Router({ mergeParams: true });

petApplicationsRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petApplicationsParamsSchema }),
  getPetApplicationsHandler,
);

export { applicationsRouter, petApplicationsRouter };

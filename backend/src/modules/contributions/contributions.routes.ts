import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { optionalAuthMiddleware } from "../../middleware/optionalAuthMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { uploadMiddleware } from "../../middleware/uploadMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  confirmContributionHandler,
  createContributionHandler,
  getAllContributionsHandler,
  getMyContributionsHandler,
  rejectContributionHandler,
  uploadContributionProofHandler,
} from "./contributions.controller";
import {
  confirmContributionSchema,
  contributionIdParamsSchema,
  createContributionSchema,
  rejectContributionSchema,
} from "./contributions.schemas";

const contributionsRouter = Router();
const adminContributionsRouter = Router();

contributionsRouter.post(
  "/",
  optionalAuthMiddleware,
  validateRequest({ body: createContributionSchema }),
  createContributionHandler,
);

contributionsRouter.post(
  "/:id/proof",
  authMiddleware,
  validateRequest({ params: contributionIdParamsSchema }),
  uploadMiddleware.single("proof"),
  uploadContributionProofHandler,
);

contributionsRouter.get("/my", authMiddleware, getMyContributionsHandler);

adminContributionsRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllContributionsHandler,
);

adminContributionsRouter.patch(
  "/:id/confirm",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: contributionIdParamsSchema, body: confirmContributionSchema }),
  confirmContributionHandler,
);

adminContributionsRouter.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: contributionIdParamsSchema, body: rejectContributionSchema }),
  rejectContributionHandler,
);

export { adminContributionsRouter, contributionsRouter };

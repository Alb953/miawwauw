import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { petApplicationsRouter } from "../applications/applications.routes";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { uploadMiddleware } from "../../middleware/uploadMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createPetHandler,
  deactivatePetHandler,
  getPetById,
  getPets,
  uploadPetImagesHandler,
  updatePetFeaturedHandler,
  updatePetHandler,
  updatePetStatusHandler,
  updatePetUrgentHandler,
} from "./pets.controller";
import {
  createPetSchema,
  petFeaturedSchema,
  petIdParamsSchema,
  petsListQuerySchema,
  petStatusSchema,
  petUrgentSchema,
  updatePetSchema,
} from "./pets.schemas";

const petsRouter = Router();

petsRouter.get("/", validateRequest({ query: petsListQuerySchema }), getPets);
petsRouter.get("/:id", validateRequest({ params: petIdParamsSchema }), getPetById);
petsRouter.use("/:id/applications", petApplicationsRouter);

petsRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ body: createPetSchema }),
  createPetHandler,
);

petsRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petIdParamsSchema, body: updatePetSchema }),
  updatePetHandler,
);

petsRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petIdParamsSchema }),
  deactivatePetHandler,
);

petsRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petIdParamsSchema, body: petStatusSchema }),
  updatePetStatusHandler,
);

petsRouter.patch(
  "/:id/urgent",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petIdParamsSchema, body: petUrgentSchema }),
  updatePetUrgentHandler,
);

petsRouter.patch(
  "/:id/featured",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: petIdParamsSchema, body: petFeaturedSchema }),
  updatePetFeaturedHandler,
);

petsRouter.post(
  "/:id/images",
  authMiddleware,
  roleMiddleware("rescuer", "admin"),
  validateRequest({ params: petIdParamsSchema }),
  uploadMiddleware.array("images", 6),
  uploadPetImagesHandler,
);

export { petsRouter };

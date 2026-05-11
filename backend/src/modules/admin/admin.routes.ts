import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  deactivateAdminPetHandler,
  deactivateUserHandler,
  getAdminApplicationsHandler,
  getAdminPetsHandler,
  getDashboardHandler,
  getUsersHandler,
  verifyUserHandler,
} from "./admin.controller";
import {
  adminPetIdParamsSchema,
  adminUserIdParamsSchema,
  deactivatePetSchema,
  deactivateUserSchema,
  verifyUserSchema,
} from "./admin.schemas";

const adminRouter = Router();

adminRouter.use(authMiddleware, roleMiddleware("admin"));

adminRouter.get("/dashboard", getDashboardHandler);
adminRouter.get("/users", getUsersHandler);
adminRouter.patch(
  "/users/:id/verify",
  validateRequest({ params: adminUserIdParamsSchema, body: verifyUserSchema }),
  verifyUserHandler,
);
adminRouter.patch(
  "/users/:id/deactivate",
  validateRequest({ params: adminUserIdParamsSchema, body: deactivateUserSchema }),
  deactivateUserHandler,
);
adminRouter.get("/pets", getAdminPetsHandler);
adminRouter.get("/applications", getAdminApplicationsHandler);
adminRouter.patch(
  "/pets/:id/deactivate",
  validateRequest({ params: adminPetIdParamsSchema, body: deactivatePetSchema }),
  deactivateAdminPetHandler,
);

export { adminRouter };

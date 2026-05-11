import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { getRescuerDashboardHandler } from "./rescuer.controller";

const rescuerRouter = Router();

rescuerRouter.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("rescuer"),
  getRescuerDashboardHandler,
);

export { rescuerRouter };

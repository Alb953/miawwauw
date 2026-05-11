import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRequest } from "../../middleware/validateRequest";
import {
  activateBankInfoHandler,
  createBankInfoHandler,
  getActiveBankInfoHandler,
  updateBankInfoHandler,
} from "./bankInfo.controller";
import {
  activateBankInfoSchema,
  bankInfoIdParamsSchema,
  createBankInfoSchema,
  updateBankInfoSchema,
} from "./bankInfo.schemas";

const bankInfoRouter = Router();
const adminBankInfoRouter = Router();

bankInfoRouter.get("/", getActiveBankInfoHandler);

adminBankInfoRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ body: createBankInfoSchema }),
  createBankInfoHandler,
);

adminBankInfoRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: bankInfoIdParamsSchema, body: updateBankInfoSchema }),
  updateBankInfoHandler,
);

adminBankInfoRouter.patch(
  "/:id/active",
  authMiddleware,
  roleMiddleware("admin"),
  validateRequest({ params: bankInfoIdParamsSchema, body: activateBankInfoSchema }),
  activateBankInfoHandler,
);

export { adminBankInfoRouter, bankInfoRouter };

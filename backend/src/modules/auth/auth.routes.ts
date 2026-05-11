import { Router } from "express";

import { authMiddleware } from "../../middleware/authMiddleware";
import { authRateLimiter } from "../../middleware/rateLimit";
import { validateRequest } from "../../middleware/validateRequest";
import { login, logout, me, register, updateMyProfile } from "./auth.controller";
import { loginSchema, registerSchema, updateProfileSchema } from "./auth.schemas";

const authRouter = Router();

authRouter.post("/register", authRateLimiter, validateRequest({ body: registerSchema }), register);
authRouter.post("/login", authRateLimiter, validateRequest({ body: loginSchema }), login);
authRouter.get("/me", authMiddleware, me);
authRouter.put("/profile", authMiddleware, validateRequest({ body: updateProfileSchema }), updateMyProfile);
authRouter.post("/logout", authMiddleware, logout);

export { authRouter };

import type { NextFunction, Request, Response } from "express";

import { getUserById } from "../modules/auth/auth.service";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export const optionalAuthMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next();
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Formato de autorizacion invalido"));
    }

    const token = authorizationHeader.replace("Bearer ", "").trim();

    if (!token) {
      return next(new ApiError(401, "El token de acceso es obligatorio"));
    }

    const payload = verifyToken(token);
    const user = await getUserById(payload.userId);

    if (!user || !user.is_active) {
      return next(new ApiError(401, "La sesion ya no es valida"));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone,
      isVerified: user.is_verified,
      isActive: user.is_active,
    };

    return next();
  } catch {
    return next(new ApiError(401, "Token invalido o expirado"));
  }
};

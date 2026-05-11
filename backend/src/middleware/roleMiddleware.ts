import type { NextFunction, Request, Response } from "express";

import type { UserRole } from "../modules/auth/auth.service";
import { ApiError } from "../utils/ApiError";

export const roleMiddleware = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, "Debes iniciar sesion para continuar"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "No tienes permisos para realizar esta accion"));
    }

    return next();
  };
};

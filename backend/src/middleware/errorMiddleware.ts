import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/ApiError";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, "Ruta no encontrada"));
};

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const errors = error instanceof ApiError ? error.errors ?? [] : [];
  const message =
    error instanceof ApiError
      ? error.message
      : "Ocurrio un error interno en el servidor";

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

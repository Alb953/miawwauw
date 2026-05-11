import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodSchema } from "zod";

import { ApiError } from "../utils/ApiError";

type RequestSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export const validateRequest = (schemas: RequestSchemas): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.push(...result.error.issues.map((issue) => `body.${issue.path.join(".")}: ${issue.message}`));
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.push(...result.error.issues.map((issue) => `params.${issue.path.join(".")}: ${issue.message}`));
      } else {
        Object.assign(req.params, result.data);
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.push(...result.error.issues.map((issue) => `query.${issue.path.join(".")}: ${issue.message}`));
      } else {
        Object.assign(req.query, result.data);
      }
    }

    if (errors.length > 0) {
      return next(new ApiError(400, "La solicitud contiene datos invalidos", errors));
    }

    return next();
  };
};

import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env";
import { applicationsRouter } from "./modules/applications/applications.routes";
import { adminRouter } from "./modules/admin/admin.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { adminBankInfoRouter, bankInfoRouter } from "./modules/bankInfo/bankInfo.routes";
import {
  adminContributionsRouter,
  contributionsRouter,
} from "./modules/contributions/contributions.routes";
import { adminComplaintsRouter, complaintsRouter } from "./modules/complaints/complaints.routes";
import { errorMiddleware, notFoundHandler } from "./middleware/errorMiddleware";
import { adminReportsRouter, reportsRouter } from "./modules/reports/reports.routes";
import { rescuerRouter } from "./modules/rescuer/rescuer.routes";
import { standardApiRateLimiter } from "./middleware/rateLimit";
import { petsRouter } from "./modules/pets/pets.routes";
import { apiResponse } from "./utils/apiResponse";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json());
  app.use("/api", standardApiRateLimiter);

  app.get("/api/health", (_req, res) => {
    res.status(200).json(
      apiResponse(
        {
          status: "ok",
          environment: env.NODE_ENV,
        },
        "Servidor disponible",
      ),
    );
  });

  app.use("/api/auth", authRouter);
  app.use("/api/applications", applicationsRouter);
  app.use("/api/bank-info", bankInfoRouter);
  app.use("/api/complaints", complaintsRouter);
  app.use("/api/contributions", contributionsRouter);
  app.use("/api/reports", reportsRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/rescuer", rescuerRouter);
  app.use("/api/admin/bank-info", adminBankInfoRouter);
  app.use("/api/admin/complaints", adminComplaintsRouter);
  app.use("/api/admin/contributions", adminContributionsRouter);
  app.use("/api/admin/reports", adminReportsRouter);
  app.use("/api/pets", petsRouter);

  app.use(notFoundHandler);
  app.use(errorMiddleware);

  return app;
};

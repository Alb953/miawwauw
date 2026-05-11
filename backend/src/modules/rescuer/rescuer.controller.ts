import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { apiResponse } from "../../utils/apiResponse";
import { getRescuerDashboardData } from "./rescuer.service";

export const getRescuerDashboardHandler = asyncHandler(async (req: Request, res: Response) => {
  const dashboard = await getRescuerDashboardData(req.user!.id);

  res.status(200).json(apiResponse(dashboard, "Panel de rescatista obtenido correctamente"));
});

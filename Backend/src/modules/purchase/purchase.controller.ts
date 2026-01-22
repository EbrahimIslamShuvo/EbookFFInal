import asyncHandler from "../../middlewares/asyncHandler";
import ApiError from "../../utils/ApiError";
import { PurchaseService } from "./purchase.service";
import type { Response } from "express";

export const getMyLibrary = asyncHandler(
  async (req: any, res: Response) => {
    const userId = req.user.userId;

    const library =
      await PurchaseService.getUserLibrary(userId);

    res.json({
      success: true,
      data: library,
    });
  }
);


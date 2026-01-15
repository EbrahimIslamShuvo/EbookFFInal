import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { AuthService } from "./auth.service";


export const login = asyncHandler(async (req: any, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);

  res.json({
    success: true,
    data: result,
  });
});

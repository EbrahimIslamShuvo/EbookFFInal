import type { NextFunction, Response } from "express";
import ApiError from "../utils/ApiError";


export const roleGuard =
  (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }
    next();
  };

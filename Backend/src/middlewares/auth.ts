
import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import ApiError from "../utils/ApiError";

const auth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized access");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      role: string;
    };

    // 🔥 attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default auth;

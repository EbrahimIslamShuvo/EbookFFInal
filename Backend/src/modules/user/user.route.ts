import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
} from "./user.controller";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

// 🔐 Admin only → get all users
router.get(
  "/",
  auth,
  roleGuard("admin"),
  getAllUsers
);

// 🔐 Logged in user → get profile
router.get(
  "/:id",
  auth,
  getUserById
);

// 🔐 Admin only → update role (approve author)
router.patch(
  "/:id/role",
  auth,
  roleGuard("admin"),
  updateUserRole
);

export default router;

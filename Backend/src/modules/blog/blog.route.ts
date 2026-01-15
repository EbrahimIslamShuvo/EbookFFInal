import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { approveBlog, createBlog, deleteBlog } from "./blog.controller";

const router = Router();

// 🔐 User + Author → create blog
router.post(
  "/",
  auth,
  roleGuard("user", "author"),
  createBlog
);

// 🔐 Admin → approve blog
router.patch(
  "/:id/approve",
  auth,
  roleGuard("admin"),
  approveBlog
);

// 🔐 Owner OR Admin → delete blog
router.delete(
  "/:id",
  auth,
  deleteBlog
);

export default router;

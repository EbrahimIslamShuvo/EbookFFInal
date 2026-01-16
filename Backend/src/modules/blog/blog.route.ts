import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import {
  createBlog,
  approveBlog,
  deleteBlog,
  toggleBlogStatus,
  getBlogs,
  getAllBlogsAdmin,
  getMyBlogs,
  getSingleBlog,
} from "./blog.controller";

const router = Router();

// 🌍 Public → active blogs
router.get("/", getBlogs);

// 🔐 User + Author → my blogs
router.get(
  "/my",
  auth,
  roleGuard("user", "author"),
  getMyBlogs
);

// 🔐 Admin → all blogs
router.get(
  "/admin/all",
  auth,
  roleGuard("admin"),
  getAllBlogsAdmin
);

// 🔐 User + Author → create blog
router.post(
  "/",
  auth,
  roleGuard("user", "author"),
  createBlog
);

// 🔐 Admin → approve
router.patch(
  "/:id/approve",
  auth,
  roleGuard("admin"),
  approveBlog
);

// 🔐 Admin → toggle
router.patch(
  "/:id/toggle-status",
  auth,
  roleGuard("admin"),
  toggleBlogStatus
);

// 🔐 Owner / Admin → delete
router.delete(
  "/:id",
  auth,
  deleteBlog
);

// 🌍 PUBLIC → single blog (⚠️ ALWAYS LAST)
router.get("/:id", getSingleBlog);

export default router;

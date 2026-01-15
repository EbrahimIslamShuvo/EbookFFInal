import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { applyAsAuthor, approveAuthor, getAllRequests, rejectAuthor } from "./authorRequest.controller";

const router = Router();

// 🔐 User → apply as author
router.post(
  "/apply",
  auth,
  roleGuard("user"),
  applyAsAuthor
);

// 🔐 Admin → view all requests
router.get(
  "/",
  auth,
  roleGuard("admin"),
  getAllRequests
);

// 🔐 Admin → approve request
router.patch(
  "/:id/approve",
  auth,
  roleGuard("admin"),
  approveAuthor
);

// 🔐 Admin → reject request
router.patch(
  "/:id/reject",
  auth,
  roleGuard("admin"),
  rejectAuthor
);

export default router;

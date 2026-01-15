import { Router } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import {
  purchaseBook,
  readBook,
} from "./book.controller";

const router = Router();

// 🔐 User purchases book (after payment)
router.post(
  "/:bookId/purchase",
  auth,
  roleGuard("user", "author"),
  purchaseBook
);

// 🔐 Read book (buyer / author / admin)
router.get(
  "/:bookId/read",
  auth,
  readBook
);

export default router;

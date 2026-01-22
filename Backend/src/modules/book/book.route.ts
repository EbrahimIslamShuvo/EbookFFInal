import { Router, type RequestHandler } from "express";
import auth from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { upload } from "../../middlewares/upload";
import {
  createBook,
  getBooks,
  getAllBooksAdmin,
  getMyBooks,
  getSingleBook,
  toggleBookStatus,
  deleteBook,
  getRelatedBooks,
  getBooksByAuthorPublic,
  getMyPurchasedBooks,
} from "./book.controller";

const router = Router();

/* ============ 🌍 PUBLIC ============ */

// all active books
router.get("/", getBooks);

// books by author (PUBLIC) — ⚠️ MUST be before :id
router.get("/author/:authorId", getBooksByAuthorPublic);

// related books
router.get("/related/list", getRelatedBooks);

// single book
router.get("/:id", getSingleBook);

/* ============ ✍️ AUTHOR ============ */

router.get(
  "/author/my",
  auth,
  roleGuard("author"),
  getMyBooks
);

router.post(
  "/",
  auth,
  roleGuard("author"),
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]) as unknown as RequestHandler,
  createBook
);

/* ============ 🔐 ADMIN ============ */

router.get(
  "/admin/all",
  auth,
  roleGuard("admin"),
  getAllBooksAdmin
);

router.patch(
  "/:id/toggle-status",
  auth,
  roleGuard("admin"),
  toggleBookStatus
);

router.delete("/:id", auth, deleteBook);

router.get(
  "/purchased/my",
  auth,
  getMyPurchasedBooks
);


export default router;
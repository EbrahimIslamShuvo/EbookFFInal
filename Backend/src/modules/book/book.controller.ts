import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { BookService } from "./book.service";


// 🔐 purchase (called after payment success)
export const purchaseBook = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const { bookId } = req.params;

  const book = await BookService.purchaseBook(bookId, userId);

  res.json({
    success: true,
    message: "Book purchased successfully",
    data: book,
  });
});

// 🔐 read book
export const readBook = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const { bookId } = req.params;

  const book = await BookService.readBook(bookId, userId, role);

  res.json({
    success: true,
    data: book,
  });
});

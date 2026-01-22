import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import ApiError from "../../utils/ApiError";
import { BookService } from "./book.service";
import { Types } from "mongoose";
import { Book } from "./book.model";
import { PurchaseService } from "../purchase/purchase.service";


export const createBook = asyncHandler(
  async (req: any, res: Response) => {
    const { title, abstract, category, price } = req.body;

    const coverFile = req.files?.cover?.[0];
    const pdfFile = req.files?.pdf?.[0];

    if (!coverFile || !pdfFile) {
      throw new ApiError(400, "Cover and PDF are required");
    }

    const book = await BookService.createBook({
      title,
      abstract,
      category,
      price: Number(price),
      cover: `/uploads/${coverFile.filename}`,
      pdfUrl: `/uploads/${pdfFile.filename}`,

      // 🔥 THIS IS CRITICAL
      authorId: new Types.ObjectId(req.user.userId),

      status: "pending",
      buyers: [],
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  }
);

// 🌍 public
export const getBooks = asyncHandler(async (_req: any, res: Response) => {
  const books = await BookService.getActiveBooks();
  res.json({ success: true, data: books });
});

// 🔐 admin
export const getAllBooksAdmin = asyncHandler(async (_req: any, res: Response) => {
  const books = await BookService.getAllBooks();
  res.json({ success: true, data: books });
});

// ✍️ author → my books
export const getMyBooks = asyncHandler(async (req: any, res: Response) => {
  const books = await BookService.getBooksByAuthor(
    req.user.userId
  );
  res.json({ success: true, data: books });
});

// 📘 single book
export const getSingleBook = asyncHandler(async (req: any, res: Response) => {
  const book = await BookService.getSingleBook(req.params.id);
  res.json({ success: true, data: book });
});

// 🔁 toggle
export const toggleBookStatus = asyncHandler(async (req: any, res: Response) => {
  const book = await BookService.toggleBookStatus(req.params.id);
  res.json({ success: true, data: book });
});

// ❌ delete
export const deleteBook = asyncHandler(async (req: any, res: Response) => {
  await BookService.deleteBook(req.params.id);
  res.json({ success: true });
});

// 🔗 related
export const getRelatedBooks = asyncHandler(async (req: any, res: Response) => {
  const { category, authorId, excludeId } = req.query;

  const books = await BookService.getRelatedBooks(
    category as string,
    authorId as string,
    excludeId as string
  );

  res.json({ success: true, data: books });
});

export const getBooksByAuthor = asyncHandler(
  async (req: any, res: Response) => {
    const books = await BookService.getBooksByAuthor(
      req.params.authorId
    );

    res.json({
      success: true,
      data: books,
    });
  }
);
// 🌍 PUBLIC → books by author
export const getBooksByAuthorPublic = asyncHandler(
  async (req: any, res: Response) => {
    const { authorId } = req.params;

    const books =
      await BookService.getBooksByAuthorPublic(authorId);

    res.json({
      success: true,
      data: books,
    });
  }
);

export const getMyPurchasedBooks = asyncHandler(
  async (req: any, res: Response) => {
    const userId = req.user.userId;

    const purchases =
      await PurchaseService.getPurchasedBooksByUser(
        userId
      );

    res.json({
      success: true,
      data: purchases,
    });
  }
);
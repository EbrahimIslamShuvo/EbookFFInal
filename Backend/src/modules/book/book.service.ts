import ApiError from "../../utils/ApiError";
import { Book } from "./book.model";

// 🔐 Purchase book (after payment success)
const purchaseBook = async (bookId: string, userId: string) => {
  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  if (book.status !== "active") {
    throw new ApiError(403, "Book is not available");
  }

  if (book.buyers.includes(userId)) {
    throw new ApiError(400, "Book already purchased");
  }

  book.buyers.push(userId);
  await book.save();

  return book;
};

// 🔐 Read book (buyer / author / admin)
const readBook = async (
  bookId: string,
  userId: string,
  role: string
) => {
  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  // admin always allowed
  if (role === "admin") return book;

  // author (owner) allowed
  if (book.authorId === userId) return book;

  // buyer allowed
  if (book.buyers.includes(userId)) return book;

  throw new ApiError(403, "You are not allowed to read this book");
};

export const BookService = {
  purchaseBook,
  readBook,
};

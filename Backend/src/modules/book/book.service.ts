import { Types } from "mongoose";
import ApiError from "../../utils/ApiError";
import type { IBook } from "./book.interface";
import { Book } from "./book.model";
import { User } from "../user/user.model";

// ➕ create
const createBook = async (payload: IBook) => {
  return Book.create(payload);
};



// 📘 single book + author
const getSingleBook = async (id: string) => {
  const book = await Book.findById(id)
    .populate("authorId", "name email");

  if (!book) throw new ApiError(404, "Book not found");
  return book;
};

// 🔁 admin toggle
const toggleBookStatus = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) throw new ApiError(404, "Book not found");

  book.status = book.status === "active" ? "pending" : "active";
  await book.save();
  return book;
};

// ❌ delete
const deleteBook = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new ApiError(404, "Book not found");
  return book;
};



// 🔗 related books (same author OR category)
const getRelatedBooks = async (
  category: string,
  authorId: string,
  excludeId: string
) => {
  return Book.find({
    _id: { $ne: excludeId },
    status: "active",
    $or: [{ category }, { authorId }],
  })
    .limit(3)
    .sort({ createdAt: -1 });
};
const getActiveBooks = async () => {
  return Book.find({ status: "active" })
    .populate("authorId", "name")   
    .sort({ createdAt: -1 });
};
const getAllBooks = async () => {
  return Book.find()
    .populate("authorId", "name")  
    .sort({ createdAt: -1 });
};


const getBooksByAuthor = async (authorId: string) => {
  return Book.find({
    authorId: new Types.ObjectId(authorId),
    status: "active",
  })
    .populate("authorId", "name email")
    .sort({ createdAt: -1 });
};


const getBooksByAuthorPublic = async (authorId: string) => {
  if (!Types.ObjectId.isValid(authorId)) {
    return [];
  }

  return Book.find({
    authorId: new Types.ObjectId(authorId),
    status: "active",
  })
    .populate("authorId", "name email")
    .sort({ createdAt: -1 });
};


export const BookService = {
  createBook,
  getActiveBooks,
  getAllBooks,
  getBooksByAuthor,
  getBooksByAuthorPublic,
  getSingleBook,
  toggleBookStatus,
  deleteBook,
  getRelatedBooks
};

import { Purchase } from "./purchase.model";
import { Types } from "mongoose";

const getUserLibrary = async (userId: string) => {
  return Purchase.find({
    userId: new Types.ObjectId(userId),
    status: "success",
  })
    .populate({
      path: "bookId",
      populate: {
        path: "authorId",
        select: "name email",
      },
    })
    .sort({ createdAt: -1 });
};

const hasPurchasedBook = async (
  userId: string,
  bookId: string
) => {
  return await Purchase.exists({
    userId: new Types.ObjectId(userId),
    bookId: new Types.ObjectId(bookId),
    status: "success",
  });
};

const getPurchasedBooksByUser = async (userId: string) => {
  return Purchase.find({
    userId: new Types.ObjectId(userId),
    status: "success",
  })
    .populate({
      path: "bookId",
      populate: { path: "authorId", select: "name" },
    })
    .sort({ createdAt: -1 });
};

export const PurchaseService = {
  getUserLibrary,
  hasPurchasedBook,
  getPurchasedBooksByUser,
};

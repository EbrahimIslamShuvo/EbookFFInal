import { Schema, model } from "mongoose";
import type { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: String,
    abstract: String,
    category: String,
    price: Number,
    cover: String,
    authorId: String,
    status: { type: String, default: "pending" },
    buyers: [String],
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);

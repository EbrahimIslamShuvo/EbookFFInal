import { Schema, model } from "mongoose";
import type { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: String,
    description: String,
    image: String,
    authorId: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>("Blog", blogSchema);

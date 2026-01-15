import { Schema, model } from "mongoose";
import type { IAuthorRequest } from "./authorRequest.interface";

const authorRequestSchema = new Schema<IAuthorRequest>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const AuthorRequest = model<IAuthorRequest>(
  "AuthorRequest",
  authorRequestSchema
);

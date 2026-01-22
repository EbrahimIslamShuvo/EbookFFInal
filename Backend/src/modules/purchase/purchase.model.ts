import { Schema, model, Types } from "mongoose";
import { IPurchase } from "./purchase.interface";

const purchaseSchema = new Schema<IPurchase>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "cancelled"],
      default: "success",
    },
  },
  { timestamps: true }
);

export const Purchase = model<IPurchase>(
  "Purchase",
  purchaseSchema
);


import { Schema, model, Types } from "mongoose";

const purchaseSchema = new Schema(
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

export const Purchase = model("Purchase", purchaseSchema);

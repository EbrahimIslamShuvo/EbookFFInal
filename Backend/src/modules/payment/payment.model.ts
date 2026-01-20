import { Schema, model } from "mongoose";
import type { ITransactionRecord } from "./payment.interface";

const transactionSchema = new Schema<ITransactionRecord>(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransactionRecord>("Transaction", transactionSchema);

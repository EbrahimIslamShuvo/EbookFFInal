import { Types } from "mongoose";

export interface IPurchase {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  amount: number;
  transactionId: string;
  status: "success" | "failed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

import { Types } from "mongoose";

export interface IBlog {
  title: string;
  description: string;
  image?: string;
  authorId: Types.ObjectId;   // 🔥 FIX
  status: "pending" | "active";
}

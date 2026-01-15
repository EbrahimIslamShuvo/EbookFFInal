export interface IAuthorRequest {
  userId: string;
  status: "pending" | "approved" | "rejected";
}

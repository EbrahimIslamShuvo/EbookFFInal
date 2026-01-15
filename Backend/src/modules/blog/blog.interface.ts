export interface IBlog {
  title: string;
  description: string;
  image?: string;
  authorId: string;
  status: "pending" | "active";
}

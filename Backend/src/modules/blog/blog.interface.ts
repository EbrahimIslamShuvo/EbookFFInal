export interface IBlog {
  title: string;
  description: string;
  image?: string;
  authorId: string; // user or author id
  status: "pending" | "active";
}

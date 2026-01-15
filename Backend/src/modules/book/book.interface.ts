export interface IBook {
  title: string;
  abstract: string;
  category: string;
  price: number;
  cover: string;
  authorId: string;
  status: "pending" | "active";
  buyers: string[];
}

import ApiError from "../../utils/ApiError";
import type { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const createBlog = async (payload: IBlog) => {
  return Blog.create(payload);
};

const approveBlog = async (id: string) => {
  const blog = await Blog.findByIdAndUpdate(
    id,
    { status: "active" },
    { new: true }
  );
  if (!blog) throw new ApiError(404, "Blog not found");
  return blog;
};

const deleteBlog = async (id: string) => {
  await Blog.findByIdAndDelete(id);
};

export const BlogService = { createBlog, approveBlog, deleteBlog };

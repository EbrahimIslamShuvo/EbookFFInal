import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { BlogService } from "./blog.service";


export const createBlog = asyncHandler(async (req: any, res: Response) => {
  const blog = await BlogService.createBlog(req.body);
  res.status(201).json({ success: true, data: blog });
});

export const approveBlog = asyncHandler(async (req: any, res: Response) => {
  const blog = await BlogService.approveBlog(req.params.id);
  res.json({ success: true, data: blog });
});

export const deleteBlog = asyncHandler(async (req: any, res: Response) => {
  await BlogService.deleteBlog(req.params.id);
  res.json({ success: true });
});

import type { Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import { AuthorRequestService } from "./authorRequest.service";


// user applies
export const applyAsAuthor = asyncHandler(async (req: any, res: Response) => {
  const userId = req.user.userId; // from auth middleware
  const request = await AuthorRequestService.createAuthorRequest(userId);

  res.status(201).json({
    success: true,
    data: request,
  });
});

// admin approves
export const approveAuthor = asyncHandler(async (req:any, res: Response) => {
  const request = await AuthorRequestService.approveAuthorRequest(
    req.params.id
  );

  res.json({
    success: true,
    data: request,
  });
});

// admin rejects
export const rejectAuthor = asyncHandler(async (req: any, res: Response) => {
  const request = await AuthorRequestService.rejectAuthorRequest(
    req.params.id
  );

  res.json({
    success: true,
    data: request,
  });
});

// admin get all
export const getAllRequests = asyncHandler(async (req: any, res: Response) => {
  const requests =
    await AuthorRequestService.getAllAuthorRequests();

  res.json({
    success: true,
    data: requests,
  });
});

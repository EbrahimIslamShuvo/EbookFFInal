import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { AuthorRequest } from "./authorRequest.model";


// user applies as author
const createAuthorRequest = async (userId: string) => {
  const exists = await AuthorRequest.findOne({ userId });
  if (exists) {
    throw new ApiError(400, "Author request already exists");
  }

  return AuthorRequest.create({ userId });
};

// admin approves request
const approveAuthorRequest = async (requestId: string) => {
  const request = await AuthorRequest.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Author request not found");
  }

  request.status = "approved";
  await request.save();

  // 🔥 VERY IMPORTANT: update user role
  await User.findByIdAndUpdate(request.userId, {
    role: "author",
  });

  return request;
};

// admin rejects request
const rejectAuthorRequest = async (requestId: string) => {
  const request = await AuthorRequest.findById(requestId);
  if (!request) {
    throw new ApiError(404, "Author request not found");
  }

  request.status = "rejected";
  await request.save();

  return request;
};

// admin get all requests
const getAllAuthorRequests = async () => {
  return AuthorRequest.find();
};

export const AuthorRequestService = {
  createAuthorRequest,
  approveAuthorRequest,
  rejectAuthorRequest,
  getAllAuthorRequests,
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import ApiError from "../../utils/ApiError";

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const AuthService = { loginUser };

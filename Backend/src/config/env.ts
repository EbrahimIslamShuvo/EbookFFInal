import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  SSL_STORE_ID: process.env.SSL_STORE_ID!,
  SSL_STORE_PASS: process.env.SSL_STORE_PASS!,
  IS_LIVE: process.env.IS_LIVE || "sandbox",
  CLIENT_SUCCESS_URL: process.env.CLIENT_SUCCESS_URL || "http://localhost:5173/payment-success",
  CLIENT_FAIL_URL: process.env.CLIENT_FAIL_URL || "http://localhost:5173/payment-failed",
  CLIENT_CANCEL_URL: process.env.CLIENT_CANCEL_URL || "http://localhost:5173/payment-cancel",
};

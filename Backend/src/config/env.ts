import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  SSL_STORE_ID: process.env.SSL_STORE_ID!,
  SSL_STORE_PASS: process.env.SSL_STORE_PASS!,
};

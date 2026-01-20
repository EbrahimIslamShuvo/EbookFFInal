import asyncHandler from "../../middlewares/asyncHandler";
import { PaymentService } from "./payment.service";
import { BookService } from "../book/book.service";
import { env } from "../../config/env";
import ApiError from "../../utils/ApiError";
import { z } from "zod";
import type { Response } from "express";

// Validation Schema
const PaymentInitSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  bookId: z.string().min(1, "Book ID is required"),
});

// 🔐 STEP 1: Init payment
export const initPayment = asyncHandler(async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const userEmail = req.user.email;

    // Validate request body
    const validation = PaymentInitSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ApiError(400, validation.error.message || "Invalid request data");
    }

    const { amount, bookId } = validation.data;

    // Verify book exists and is active
    const book = await BookService.getSingleBook(bookId);
    if (book.status !== "active") {
      throw new ApiError(403, "Book is not available for purchase");
    }

    // Check if already purchased
    if (book.buyers.includes(userId)) {
      throw new ApiError(400, "You have already purchased this book");
    }

    // Verify amount matches book price
    if (amount !== book.price) {
      throw new ApiError(400, "Payment amount does not match book price");
    }

    const tranId = `TXN_${userId}_${bookId}_${Date.now()}`;

    // Build complete payment data with all required SSLCommerz fields
    const paymentData = {
      total_amount: amount,
      currency: "BDT",
      tran_id: tranId,
      success_url: env.CLIENT_SUCCESS_URL || `http://localhost:3000/api/payment/success?bookId=${bookId}&userId=${userId}`,
      fail_url: env.CLIENT_FAIL_URL || `http://localhost:3000/api/payment/fail`,
      cancel_url: env.CLIENT_CANCEL_URL || `http://localhost:3000/api/payment/cancel`,
      cus_email: userEmail || "customer@ebook.local",  // ✅ Provide default if undefined
      cus_name: req.user.name || "Customer",
      cus_addr1: "N/A",  // ✅ Required field
      cus_city: "Dhaka",  // ✅ Required field
      cus_country: "Bangladesh",  // ✅ Required field
      shipping_method: "NO",  // ✅ Required field
      product_name: book.title,  // ✅ Product name
      product_category: book.category || "Book",  // ✅ Product category
      product_profile: "ebook",  // ✅ Product type
    };

    console.log("Payment Data:", paymentData);

    const result = await PaymentService.initSSLPayment(paymentData);

    console.log("SSLCommerz Response:", result);

    if (!result || !result.GatewayPageURL) {
      throw new ApiError(500, "Failed to initialize payment gateway: No gateway URL returned");
    }

    res.json({
      success: true,
      url: result.GatewayPageURL,
      transactionId: tranId,
    });
  } catch (error: any) {
    console.error("Payment Init Error:", error);
    throw error;
  }
});

// ✅ STEP 2: SUCCESS callback
export const paymentSuccess = asyncHandler(async (req: any, res: Response) => {
  const { bookId, userId } = req.query as {
    bookId: string;
    userId: string;
  };

  if (!bookId || !userId) {
    throw new ApiError(400, "Missing required parameters");
  }

  try {
    // 🔥 Purchase happens ONLY here
    await BookService.purchaseBook(bookId, userId);

    // ✅ Frontend success page
    res.redirect(env.CLIENT_SUCCESS_URL);
  } catch (error: any) {
    res.redirect(env.CLIENT_FAIL_URL);
  }
});

// ❌ STEP 3: FAIL
export const paymentFail = asyncHandler(async (req: any, res: Response) => {
  res.redirect(env.CLIENT_FAIL_URL);
});

// ❌ STEP 4: CANCEL
export const paymentCancel = asyncHandler(async (req: any, res: Response) => {
  res.redirect(env.CLIENT_CANCEL_URL);
});

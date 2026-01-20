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

    // Build backend URL for callbacks
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

    // Build complete payment data with all required SSLCommerz fields
    // Based on official SSLCommerz documentation: https://github.com/sslcommerz/SSLCommerz-NodeJS
    const paymentData = {
      total_amount: amount,
      currency: "BDT",
      tran_id: tranId, // use unique tran_id for each api call
      // SSLCommerz will call these BACKEND endpoints first, then backend redirects to frontend
      success_url: `${backendUrl}/api/payment/success?bookId=${bookId}&userId=${userId}`,
      fail_url: `${backendUrl}/api/payment/fail?bookId=${bookId}&userId=${userId}`,
      cancel_url: `${backendUrl}/api/payment/cancel?bookId=${bookId}&userId=${userId}`,
      ipn_url: `${backendUrl}/api/payment/ipn`,
      
      // Customer Information
      cus_name: req.user.name || "Customer",
      cus_email: userEmail || "customer@ebook.local",
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: req.user.phone || "01711111111",
      cus_fax: req.user.phone || "01711111111",
      
      // Shipping Information (required even for digital products)
      shipping_method: "NO", // "NO" for digital products
      ship_name: req.user.name || "Customer",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
      
      // Product Information
      product_name: book.title,
      product_category: book.category || "Book",
      product_profile: "ebook", // "general", "physical-product", "non-physical-product", "telecom-vertical"
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
  console.log("📥 Payment Success Callback Received");
  console.log("Query params:", req.query);
  console.log("Body:", req.body);
  console.log("CLIENT_SUCCESS_URL config:", env.CLIENT_SUCCESS_URL);
  
  const { bookId, userId } = req.query as {
    bookId: string;
    userId: string;
  };

  if (!bookId || !userId) {
    console.error("❌ Missing bookId or userId in callback");
    console.error("Received query:", req.query);
    // Redirect to fail page if parameters are missing
    console.log(`🔄 Redirecting to fail URL: ${env.CLIENT_FAIL_URL}`);
    return res.redirect(302, env.CLIENT_FAIL_URL);
  }

  try {
    console.log(`✅ Processing purchase: bookId=${bookId}, userId=${userId}`);
    // 🔥 Purchase happens ONLY here
    await BookService.purchaseBook(bookId, userId);
    console.log("✅ Purchase completed successfully");

    // ✅ Redirect directly to orders/my books page with FULL ABSOLUTE URL
    // Extract base URL from CLIENT_SUCCESS_URL or use default
    let frontendBaseUrl = 'http://localhost:5173'; // Default
    
    if (process.env.CLIENT_URL) {
      frontendBaseUrl = process.env.CLIENT_URL;
    } else if (env.CLIENT_SUCCESS_URL) {
      // Remove /payment-success and everything after it
      frontendBaseUrl = env.CLIENT_SUCCESS_URL.replace(/\/payment-success.*$/, '');
    }
    
    // Ensure base URL has protocol
    if (!frontendBaseUrl.startsWith('http://') && !frontendBaseUrl.startsWith('https://')) {
      frontendBaseUrl = `http://${frontendBaseUrl}`;
    }
    
    // Remove trailing slash if present
    frontendBaseUrl = frontendBaseUrl.replace(/\/$/, '');
    
    // Build full absolute URL
    const redirectUrl = `http://localhost:5173/dashboard/user`;
    
    console.log(`🔄 Redirecting directly to orders page`);
    console.log("Frontend base URL:", frontendBaseUrl);
    console.log("Full absolute redirect URL:", redirectUrl);
    console.log("Response status:", res.statusCode);
    console.log("Headers sent:", res.headersSent);
    
    // Explicitly set status code and redirect with absolute URL
    return res.redirect(302, redirectUrl);
  } catch (error: any) {
    console.error("❌ Error processing purchase:", error);
    console.error("Error details:", error.message, error.stack);
    console.log(`🔄 Redirecting to fail URL: ${env.CLIENT_FAIL_URL}`);
    return res.redirect(302, env.CLIENT_FAIL_URL);
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

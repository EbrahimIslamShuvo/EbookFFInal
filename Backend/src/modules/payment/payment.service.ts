const SSLCommerzPayment = require("sslcommerz-lts");
import { env } from "../../config/env";

/**
 * Initialize SSLCommerz Payment
 * Based on official SSLCommerz Node.js library: https://github.com/sslcommerz/SSLCommerz-NodeJS
 * 
 * @param data - Payment data object with all required SSLCommerz fields
 * @returns Promise with GatewayPageURL and transaction details
 */
const initSSLPayment = async (data: any): Promise<any> => {
  try {
    // Validate environment variables
    if (!env.SSL_STORE_ID || !env.SSL_STORE_PASS) {
      throw new Error("SSLCommerz credentials are missing. Please check SSL_STORE_ID and SSL_STORE_PASS in your .env file");
    }

    // Convert IS_LIVE to boolean as per official docs: true for live, false for sandbox
    // Accept: "production", "true", "1" as true, everything else as false (sandbox)
    const is_live = env.IS_LIVE === "production" || env.IS_LIVE === "true" || env.IS_LIVE === "1";
    const environment = is_live ? "PRODUCTION (Live)" : "SANDBOX (Test)";
    
    console.log("🔐 Initializing SSLCommerz Payment");
    console.log("═══════════════════════════════════════════════════");
    console.log("Environment:", environment);
    console.log("Store ID:", env.SSL_STORE_ID);
    console.log("Store Pass:", env.SSL_STORE_PASS ? "***" : "MISSING");
    console.log("IS_LIVE value:", env.IS_LIVE);
    console.log("is_live boolean:", is_live);
    console.log("API Endpoint:", is_live ? "https://securepay.sslcommerz.com" : "https://sandbox.sslcommerz.com");
    console.log("═══════════════════════════════════════════════════");
    
    // Initialize SSLCommerz Payment instance as per official documentation
    const sslcz = new SSLCommerzPayment(
      env.SSL_STORE_ID,
      env.SSL_STORE_PASS,
      is_live // true for live, false for sandbox (per official docs)
    );

    // Validate required payment data fields
    const requiredFields = [
      'total_amount', 
      'currency', 
      'tran_id', 
      'success_url', 
      'fail_url', 
      'cancel_url',
      'cus_name',
      'cus_email',
      'cus_add1',
      'cus_city',
      'cus_country',
      'shipping_method',
      'product_name',
      'product_category',
      'product_profile'
    ];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required payment fields: ${missingFields.join(', ')}`);
    }

    console.log("📤 Sending payment data to SSLCommerz:", JSON.stringify(data, null, 2));
  
    // Call init() as per official documentation pattern
    const result = await sslcz.init(data);

    console.log("📥 SSLCommerz Response:", JSON.stringify(result, null, 2));
    
    if (!result) {
      throw new Error("SSLCommerz returned null/undefined response. Please check your credentials and network connection.");
    }

    // Handle different error scenarios
    if (result.status === "FAILED" || result.status === "INVALID") {
      console.error("❌ SSLCommerz Error Response:", JSON.stringify(result, null, 2));
      
      // Extract error message from various possible fields
      const errorMessage = 
        result.failedreason || 
        result.failedReason ||
        result.error || 
        result.message || 
        result.errorMessage ||
        "Unknown error. Please check your SSLCommerz credentials and payment data.";
      
      // Build detailed error message
      let detailedMessage = `SSLCommerz Error: ${result.status}`;
      if (errorMessage && errorMessage !== "Unknown error") {
        detailedMessage += ` - ${errorMessage}`;
      } else {
        detailedMessage += " - Unknown error";
      }

      // Add hints for common problems
      const mode = is_live ? "production" : "sandbox";
      if (errorMessage.toLowerCase().includes("credential") || errorMessage.toLowerCase().includes("de-active")) {
        detailedMessage += `\n💡 Possible Issues:`;
        detailedMessage += `\n   1. Store ID and Password are for ${mode} environment, but IS_LIVE=${env.IS_LIVE}`;
        detailedMessage += `\n   2. Make sure your credentials match the environment (sandbox vs production)`;
        detailedMessage += `\n   3. Verify your store is activated in SSLCommerz ${mode} panel`;
        detailedMessage += `\n   4. Check if IS_LIVE in .env matches your credential type`;
        detailedMessage += `\n   5. Ensure IS_LIVE is set to "production" or "true" for live, "sandbox" or "false" for test`;
      } else if (!errorMessage || errorMessage.includes("Invalid") || errorMessage.includes("invalid")) {
        detailedMessage += `\n💡 Hint: Verify your SSL_STORE_ID and SSL_STORE_PASS are correct for ${mode} mode`;
      }

      throw new Error(detailedMessage);
    }

    if (!result.GatewayPageURL) {
      console.error("⚠️ No GatewayPageURL in response:", JSON.stringify(result, null, 2));
      throw new Error(`No GatewayPageURL returned. Response: ${JSON.stringify(result)}`);
    }

    console.log("✅ Payment initialized successfully. Gateway URL:", result.GatewayPageURL);
    
    return result;
  } catch (error: any) {
    console.error("🔥 Payment Service Error:", error.message);
    console.error("🔥 Full Error:", error);
    
    // Re-throw with enhanced error message if it's our custom error
    if (error.message && error.message.includes("SSLCommerz")) {
      throw error;
    }
    
    // Wrap unexpected errors
    throw new Error(`Payment initialization failed: ${error.message || "Unknown error occurred"}`);
  }
};

export const PaymentService = {
  initSSLPayment,
};

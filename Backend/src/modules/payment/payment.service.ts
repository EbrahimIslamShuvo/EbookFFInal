const SSLCommerzPayment = require("sslcommerz-lts");
import { env } from "../../config/env";

const initSSLPayment = async (data: any) => {
  try {
    console.log("🔐 Initializing SSLCommerz Payment");
    console.log("Store ID:", env.SSL_STORE_ID);
    console.log("Store Pass:", env.SSL_STORE_PASS);
    console.log("Mode (sandbox=true):", env.SSL_MODE === "production" ? false : true);
    
    const sslcz = new SSLCommerzPayment(
      env.SSL_STORE_ID!,
      env.SSL_STORE_PASS!,
      env.SSL_MODE === "production" ? false : true // true = sandbox, false = live
    );

    console.log("📤 Sending payment data to SSLCommerz:", JSON.stringify(data, null, 2));
    
    const result = await sslcz.init(data);

    console.log("📥 SSLCommerz Response:", JSON.stringify(result, null, 2));
    
    if (!result) {
      throw new Error("SSLCommerz returned null/undefined response");
    }

    if (result.status === "FAILED" || result.status === "INVALID") {
      console.error("❌ SSLCommerz Error:", result);
      throw new Error(`SSLCommerz Error: ${result.status} - ${result.error || "Unknown error"}`);
    }

    if (!result.GatewayPageURL) {
      console.error("⚠️ No GatewayPageURL in response:", result);
      throw new Error(`No GatewayPageURL returned. Response: ${JSON.stringify(result)}`);
    }

    console.log("✅ Payment initialized successfully. Gateway URL:", result.GatewayPageURL);
    
    return result;
  } catch (error: any) {
    console.error("🔥 Payment Service Error:", error.message);
    throw error;
  }
};

export const PaymentService = {
  initSSLPayment,
};

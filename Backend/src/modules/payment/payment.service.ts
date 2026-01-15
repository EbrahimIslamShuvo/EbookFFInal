const SSLCommerzPayment = require("sslcommerz-lts");
import { env } from "../../config/env";

const initSSLPayment = async (data: any) => {
  const sslcz = new SSLCommerzPayment(
    env.SSL_STORE_ID!,
    env.SSL_STORE_PASS!,
    true
  );

  return await sslcz.init(data);
};

export const PaymentService = {
  initSSLPayment,
};

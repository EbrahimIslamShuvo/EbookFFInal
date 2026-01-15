import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} from "./payment.controller";

const router = Router();

// 🔐 user starts payment
router.post("/init", auth, initPayment);

// 🔓 SSLCommerz callbacks (no auth)
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);

export default router;

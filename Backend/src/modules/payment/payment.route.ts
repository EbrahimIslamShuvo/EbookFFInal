import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} from "./payment.controller";

const router = Router();

router.post("/init", auth, initPayment);

router.get("/success", paymentSuccess);
router.post("/success", paymentSuccess);

router.get("/fail", paymentFail);
router.post("/fail", paymentFail);

router.get("/cancel", paymentCancel);
router.post("/cancel", paymentCancel);

export default router;

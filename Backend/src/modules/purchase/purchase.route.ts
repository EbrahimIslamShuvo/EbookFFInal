import { Router } from "express";
import auth from "../../middlewares/auth";
import { getMyLibrary } from "./purchase.controller";

const router = Router();

// 🔐 USER → MY LIBRARY
router.get("/my", auth, getMyLibrary);

export const purchaseRoutes = router;

import express from "express";
import { createAd, getMyAds } from "../controllers/adController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAd);
router.get("/my", authMiddleware, getMyAds);

export default router;/*  */

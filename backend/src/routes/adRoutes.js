import express from "express";
import { createAd, getMyAds, getAllAds } from "../controllers/adController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAd);
router.get("/my", authMiddleware, getMyAds);
// GET /ads/public - anyone can view ads
router.get("/public", getAllAds);


export default router;/*  */

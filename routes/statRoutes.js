import { getOwnerDashboardStats } from "../controllers/statController.js";
import express from "express"
const router = express.Router()

router.get("/:id", getOwnerDashboardStats)

export default router;
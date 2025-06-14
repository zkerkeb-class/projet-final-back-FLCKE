import express from 'express'
import { addPayement, getAllPayement, getAllPayementByOwner, getAllPayementByUser, updatePayement } from '../controllers/payementController.js';
import verifyToken from '../middlewares/AuthMiddleware.js';
const router = express.Router();

router.post("/", verifyToken, addPayement);
router.get("/", verifyToken, getAllPayement);
router.get("/:id", verifyToken, getAllPayementByUser);
router.get("/owner/:id", verifyToken, getAllPayementByOwner);
router.get("/last/:id/:limit", verifyToken, getAllPayementByUser)
router.put("/:id", verifyToken, updatePayement);

export default router;
import express from 'express'
import { addPayement, getAllPayement,getAllPayementByUser,updatePayement } from '../controllers/payementController.js';
const router = express.Router();

router.post("/", addPayement);
router.get("/", getAllPayement);
router.get("/:id",getAllPayementByUser);
router.put("/:id",updatePayement);

export default router;
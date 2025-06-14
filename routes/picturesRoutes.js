
import express from "express";
import picturesController from "../controllers/picturesController.js";
import verifyToken from "../middlewares/AuthMiddleware.js";
const router = express.Router();


router.post("/", verifyToken, picturesController.uploadUserPicture)
router.get("/:id", verifyToken, picturesController.getPicture)

export default router;
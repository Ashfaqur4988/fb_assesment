import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { scheduleMail } from "../controllers/scheduleMail.controllers.js";

const router = express.Router();

router.post("/", protectRoute, scheduleMail);

export default router;

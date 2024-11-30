import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/checkauth", protectRoute, checkAuth);

export default router;

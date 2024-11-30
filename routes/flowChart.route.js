import express from "express";
import {
  addFlowchart,
  editFlowchart,
  getAllFlowcharts,
} from "../controllers/flowChart.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .get("/", getAllFlowcharts)
  .post("/add-flowchart", protectRoute, addFlowchart)
  .put("/update-flowchart/:id", editFlowchart);

export default router;

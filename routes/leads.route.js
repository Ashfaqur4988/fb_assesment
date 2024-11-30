import express from "express";
import { addLeads, getLeads } from "../controllers/leads.controllers.js";

const router = express.Router();

router.get("/", getLeads).post("/add-leads", addLeads);

export default router;

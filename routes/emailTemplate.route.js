import express from "express";
import {
  addEmailTemplate,
  getEmailTemplate,
} from "../controllers/emailTemplate.controllers.js";

const router = express.Router();

router.get("/", getEmailTemplate).post("/add-email-template", addEmailTemplate);

export default router;

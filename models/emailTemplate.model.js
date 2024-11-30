import mongoose from "mongoose";

const emailTemplate = new mongoose.Schema(
  {
    keyword: { type: String, required: true, unique: true }, // e.g., "AI Assisted"
    subject: { type: String, required: true }, // e.g., "Welcome to AI!"
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplate);

export default EmailTemplate;

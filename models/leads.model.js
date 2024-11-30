import mongoose from "mongoose";

const leads = new mongoose.Schema(
  {
    keyword: { type: String, required: true }, // e.g., "Lead1"
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", leads);

export default Leads;

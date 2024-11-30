import Leads from "../models/leads.model.js";

export const addLeads = async (req, res) => {
  try {
    const { keyword, email } = req.body;
    const leads = await Leads.findOne({ keyword });
    if (leads) return res.status(400).json({ error: "Leads already exists" });

    const newLeads = new Leads({ keyword, email });
    await newLeads.save();
    res.status(201).json(newLeads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Leads.find({}).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

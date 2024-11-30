import EmailTemplate from "../models/emailTemplate.model.js";

export const addEmailTemplate = async (req, res) => {
  try {
    const { subject, body, keyword } = req.body;
    if (!subject || !body || !keyword)
      return res.status(400).json({ error: "Missing required fields" });

    const emailTemplate = await EmailTemplate.findOne({ keyword });
    if (emailTemplate)
      return res.status(400).json({ error: "Email template already exists" });

    const newEmailTemplate = new EmailTemplate({ subject, body, keyword });
    await newEmailTemplate.save();
    res.status(201).json(newEmailTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmailTemplate = async (req, res) => {
  try {
    const emailTemplate = await EmailTemplate.find({}).sort({ createdAt: -1 });
    res.status(200).json(emailTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

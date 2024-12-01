import agenda from "../jobs/agenda.config.js";
import EmailTemplate from "../models/emailTemplate.model.js";
import Leads from "../models/leads.model.js";
import User from "../models/user.model.js";

export const scheduleMail = async (req, res) => {
  try {
    const { nodes } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    let senderEmail = user.email;

    let recipientEmail, emailSubject, emailBody, delay, waitType;

    for (const node of nodes) {
      switch (node.type) {
        case "leadSourceNode":
          const lead = await Leads.findOne({ keyword: node.data.title });
          if (!lead) return res.status(400).json({ error: "Leads not found" });
          recipientEmail = lead.email;
          break;

        case "coldEmailNode":
          const template = await EmailTemplate.findOne({
            keyword: node.data.email,
          });
          if (!template)
            return res.status(400).json({ error: "Template not found" });
          emailSubject = template.subject;
          emailBody = template.body;
          break;

        case "delayNode":
          delay = parseInt(node.data.delay, 10);
          waitType = node.data.waitType;
          break;

        default:
          return res
            .status(400)
            .json({ message: `Unknown node type: ${node.type}` });
      }
    }

    //converting delay to milliseconds
    const delayInMs = calculateDelayInMs(delay, waitType);

    //schedule the email

    await agenda.schedule(new Date(Date.now() + delayInMs), "send email", {
      senderEmail,
      recipientEmail,
      subject: emailSubject,
      body: emailBody,
    });

    res.status(200).json({
      recipientEmail,
      emailSubject,
      emailBody,
      delay,
      waitType,
      senderEmail,
      message: "Email scheduled successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateDelayInMs = (delay, waitType) => {
  switch (waitType) {
    case "minutes":
      return delay * 60 * 1000;
    case "hours":
      return delay * 60 * 60 * 1000;
    case "days":
      return delay * 24 * 60 * 60 * 1000;
    default:
      throw new Error("Invalid wait type ", waitType);
  }
};

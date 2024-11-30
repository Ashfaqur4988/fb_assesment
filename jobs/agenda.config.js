import Agenda from "agenda";
import dotenv from "dotenv";
import { transporter } from "../utils/nodemailer.config.js";

dotenv.config();

const agenda = new Agenda({
  db: {
    address: process.env.DB_URL,
    collection: "agendaJobs",
  },
});

agenda.define("send email", async (job) => {
  const { senderEmail, recipientEmail, subject, body } = job.attrs.data;
  //   console.log("from agenda ", senderEmail, recipientEmail, subject, body);

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      subject,
      text: body,
    });
  } catch (error) {
    console.log("error sending email", error);
  }
});

//starting agenda
(async () => {
  await agenda.start();
  console.log("agenda started");
})();

export default agenda;

import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import leadsRouter from "./routes/leads.route.js";
import emailTemplateRouter from "./routes/emailTemplate.route.js";
import flowChartRouter from "./routes/flowChart.route.js";
import scheduleMailRouter from "./routes/scheduleMail.route.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/email-template", emailTemplateRouter);
app.use("/api/flowchart", flowChartRouter);
app.use("/api/schedule-mail", scheduleMailRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("App listening on port 8080!");
  connectDb();
});

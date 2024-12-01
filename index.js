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
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
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

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(8080, () => {
  console.log("App listening on port 8080!");
  connectDb();
});

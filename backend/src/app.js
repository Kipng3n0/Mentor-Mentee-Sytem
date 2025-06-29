import "./modelsSQL/associations.js";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mentorshipRoutes from "./routes/mentorshipRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import achievementRoutes from "./routes/achievementsRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import "./utils/reminderScheduler.js";
import adRoutes from "./routes/adRoutes.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "https://mentorlink-three.vercel.app", 
  "http://localhost:5173", // Local frontend for development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error(`CORS policy does not allow access from origin ${origin}`)
        );
      }
    },
    credentials: true, // Include credentials if needed
  })
);

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Custom route to serve files with correct headers
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  // Set the correct content type
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = "application/octet-stream"; // Default to binary stream

  switch (extname) {
    case ".pdf":
      contentType = "application/pdf";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    // Add more cases as needed
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${req.params.filename}"`
  );
  res.sendFile(filePath);
});

// Routes
app.get("/", (req, res) => {
  res.send("MentorMentee Platform API");
});

app.use("/api/auth", authRoutes);
app.use("/api/mentorships", mentorshipRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/ads", adRoutes);

export { app };

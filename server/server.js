// Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Config
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

// Middleware
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

// __dirname
const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

// Connect Database
connectDB();

// Express
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(morgan("dev"));

// Static Uploads
app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads",
    ),
  ),
);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "YouTube Clone API Running!",
  });
});

// API Routes
app.use(
  "/api/v1/auth",
  authRoutes,
);

app.use(
  "/api/v1/channels",
  channelRoutes,
);

app.use(
  "/api/v1/videos",
  videoRoutes,
);

app.use(
  "/api/v1/comments",
  commentRoutes,
);

app.use(
  "/api/v1/notifications",
  notificationRoutes,
);

app.use(
  "/api/v1/history",
  historyRoutes,
);

// 404
app.use(notFoundMiddleware);

// Error Handler
app.use(errorMiddleware);

// Port
const PORT =
  process.env.PORT || 5000;

// Server
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
  );
});
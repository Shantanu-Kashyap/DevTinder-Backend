const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const initializeSocket = require("./utils/socket");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const PUBLIC_IP = "13.53.90.173";

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  `http://${PUBLIC_IP}:5173`,
  `http://${PUBLIC_IP}:3000`,
]);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.has(origin)) return cb(null, true);
      return cb(new Error("CORS blocked for: " + origin), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);


app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


const server = http.createServer(app);
initializeSocket(server, allowedOrigins);


connectDB()
  .then(() => console.log("✅ Database connection established..."))
  .catch((err) => console.error("❌ Database not connected: ", err.message));

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${PUBLIC_IP}:${PORT}`);
});

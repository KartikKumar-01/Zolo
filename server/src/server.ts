import http from "http";
import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { initSocket } from "./socket";

dotenv.config();  // Load .env variables
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

initSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
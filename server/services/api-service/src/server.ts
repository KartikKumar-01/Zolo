import dotenv from "dotenv";
// Load .env variables before anything else
dotenv.config();

import http from "http";
import app from "./app";
import connectDB from "./config/db";
import { initSocket } from "./socket";
import { startProducer } from "@zolo/kafka";

connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

initSocket(server);
startProducer();

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
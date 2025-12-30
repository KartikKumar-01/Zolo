import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes";
import conversatoinRoutes from "./modules/conversation/conversation.routes";
import messagesRoutes from "./modules/messages/message.routes"
import userRoutes from "./modules/user/user.routes"
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversatoinRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
  res.send("Backend running");
});

export default app;
